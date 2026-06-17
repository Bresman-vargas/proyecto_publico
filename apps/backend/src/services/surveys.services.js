import { pool } from "../db.js";
import { v4 as uuidv4 } from "uuid";

export const createSurveyService = async (data) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const {
      title,
      description,
      options,
      dateStart,
      dateEnd,
      user_id,
      discussion_id,
    } = data;

    const surveyId = uuidv4();

    await client.query(
      `
  INSERT INTO surveys (
    id,
    title,
    description,
    user_id,
    discussion_id,
    date_start,
    date_end,
    is_active
  )
  VALUES ($1, $2, $3, $4, $5, $6, $7, true);
  `,
      [
        surveyId,
        title,
        description,
        user_id,
        discussion_id ?? null,
        dateStart,
        dateEnd,
      ],
    );

    for (const option of options) {
      await client.query(
        `
        INSERT INTO survey_options (
          id,
          survey_id,
          texto,
          votes
        )
        VALUES ($1, $2, $3, 0);
        `,
        [uuidv4(), surveyId, option.texto],
      );
    }

    await client.query("COMMIT");

    return await getSurveyByIdService(surveyId);
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const getAllSurveysService = async (userId = null) => {
  const { rows } = await pool.query(
    `
    SELECT
      s.id,
      s.title,
      s.description,
      s.user_id,
      s.discussion_id,
      u.nombre AS creator_name,
      s.is_active,
      s.date_start,
      s.date_end,
      s.created_at,
      s.updated_at,

      EXISTS (
        SELECT 1
        FROM survey_votes sv
        WHERE sv.survey_id = s.id
          AND $1::text IS NOT NULL
          AND sv.user_id::text = $1::text
      ) AS has_voted,

      (
        SELECT sv.option_id
        FROM survey_votes sv
        WHERE sv.survey_id = s.id
          AND $1::text IS NOT NULL
          AND sv.user_id::text = $1::text
        LIMIT 1
      ) AS voted_option_id,

      COALESCE(
        json_agg(
          json_build_object(
            'id', so.id,
            'texto', so.texto,
            'votes', so.votes
          )
        ) FILTER (WHERE so.id IS NOT NULL),
        '[]'
      ) AS options
    FROM surveys s
    LEFT JOIN survey_options so
      ON so.survey_id = s.id
    LEFT JOIN usuarios u
      ON u.id::text = s.user_id::text
    GROUP BY s.id, u.nombre
    ORDER BY s.created_at DESC;
    `,
    [userId],
  );

  return rows;
};
export const getSurveysByUserService = async (userId) => {
  const { rows } = await pool.query(
    `
    SELECT
      s.id,
      s.title,
      s.description,
      s.user_id,
      s.is_active,
      s.date_start,
      s.date_end,
      s.created_at,
      s.updated_at,
      COALESCE(
        json_agg(
          json_build_object(
            'id', so.id,
            'texto', so.texto,
            'votes', so.votes
          )
        ) FILTER (WHERE so.id IS NOT NULL),
        '[]'
      ) AS options
    FROM surveys s
    LEFT JOIN survey_options so
      ON so.survey_id = s.id
    WHERE s.user_id = $1
    GROUP BY s.id
    ORDER BY s.created_at DESC;
    `,
    [userId],
  );

  return rows;
};

export const getSurveyByIdService = async (id) => {
  const { rows } = await pool.query(
    `
    SELECT
      s.id,
      s.title,
      s.description,
      s.user_id,
      s.discussion_id,
      u.nombre AS creator_name,
      s.is_active,
      s.date_start,
      s.date_end,
      s.created_at,
      s.updated_at,
      COALESCE(
        json_agg(
          json_build_object(
            'id', so.id,
            'texto', so.texto,
            'votes', so.votes
          )
        ) FILTER (WHERE so.id IS NOT NULL),
        '[]'
      ) AS options
    FROM surveys s
    LEFT JOIN survey_options so
      ON so.survey_id = s.id
    LEFT JOIN usuarios u
      ON u.id::text = s.user_id::text
    WHERE s.id = $1
    GROUP BY s.id, u.nombre;
    `,
    [id],
  );

  if (rows.length === 0) {
    throw new Error("SURVEY_NOT_FOUND");
  }

  return rows[0];
};

export const getSurveysByDiscussionService = async (discussionId, userId = null) => {
  const { rows } = await pool.query(
    `
    SELECT
      s.id,
      s.title,
      s.description,
      s.user_id,
      s.discussion_id,
      u.nombre AS creator_name,
      s.is_active,
      s.date_start,
      s.date_end,
      s.created_at,
      s.updated_at,

      EXISTS (
        SELECT 1
        FROM survey_votes sv
        WHERE sv.survey_id = s.id
          AND $2::text IS NOT NULL
          AND sv.user_id::text = $2::text
      ) AS has_voted,

      (
        SELECT sv.option_id
        FROM survey_votes sv
        WHERE sv.survey_id = s.id
          AND $2::text IS NOT NULL
          AND sv.user_id::text = $2::text
        LIMIT 1
      ) AS voted_option_id,

      COALESCE(
        json_agg(
          json_build_object(
            'id', so.id,
            'texto', so.texto,
            'votes', so.votes
          )
        ) FILTER (WHERE so.id IS NOT NULL),
        '[]'
      ) AS options
    FROM surveys s
    LEFT JOIN survey_options so
      ON so.survey_id = s.id
    LEFT JOIN usuarios u
      ON u.id::text = s.user_id::text
    WHERE s.discussion_id::text = $1::text
    GROUP BY s.id, u.nombre
    ORDER BY s.created_at DESC;
    `,
    [discussionId, userId],
  );

  return rows;
};

export const updateSurveyService = async (id, data) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const { title, description, options, dateStart, dateEnd } = data;

    const surveyResult = await client.query(
      `
      UPDATE surveys
      SET
        title = $1,
        description = $2,
        date_start = $3,
        date_end = $4,
        updated_at = NOW()
      WHERE id = $5
      RETURNING *;
      `,
      [title, description, dateStart, dateEnd, id],
    );

    if (surveyResult.rows.length === 0) {
      throw new Error("SURVEY_NOT_FOUND");
    }

    await client.query(
      `
      DELETE FROM survey_options
      WHERE survey_id = $1;
      `,
      [id],
    );

    for (const option of options) {
      await client.query(
        `
        INSERT INTO survey_options (
          id,
          survey_id,
          texto,
          votes
        )
        VALUES ($1, $2, $3, 0);
        `,
        [uuidv4(), id, option.texto],
      );
    }

    await client.query("COMMIT");

    return await getSurveyByIdService(id);
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const voteSurveyOptionService = async ({
  surveyId,
  optionId,
  userId,
}) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const optionResult = await client.query(
      `
      SELECT id
      FROM survey_options
      WHERE id = $1
        AND survey_id = $2;
      `,
      [optionId, surveyId],
    );

    if (optionResult.rows.length === 0) {
      throw new Error("SURVEY_OPTION_NOT_FOUND");
    }

    const voteResult = await client.query(
      `
      INSERT INTO survey_votes (
        id,
        survey_id,
        option_id,
        user_id
      )
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (survey_id, user_id) DO NOTHING
      RETURNING *;
      `,
      [uuidv4(), surveyId, optionId, userId],
    );

    if (voteResult.rows.length === 0) {
      throw new Error("SURVEY_ALREADY_VOTED");
    }

    await client.query(
      `
      UPDATE survey_options
      SET votes = votes + 1
      WHERE id = $1
        AND survey_id = $2;
      `,
      [optionId, surveyId],
    );

    await client.query("COMMIT");

    return await getSurveyByIdService(surveyId);
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
