import { pool } from "../db.js";
import { v4 as uuidv4 } from "uuid";

export const createDiscussionService = async (data) => {
  const { title, subtitle, content, forum_id, is_active, keywords, user_id } =
    data;

  const discussionsId = uuidv4();

  const { rows } = await pool.query(
    `INSERT INTO discussions (id, title, subtitle, content, forum_id, is_active, keywords, user_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *;`,
    [
      discussionsId,
      title,
      subtitle,
      content,
      forum_id,
      is_active,
      keywords,
      user_id,
    ],
  );

  return rows[0];
};

export const getAllDiscussionByUserService = async (userId) => {
  const { rows } = await pool.query(
    `SELECT * FROM discussions WHERE user_id = $1 ORDER BY created_at DESC;`,
    [userId],
  );
  return rows;
};

export const getDiscussionByIdService = async (id) => {
  const { rows } = await pool.query(
    `SELECT * FROM discussions WHERE id = $1;`,
    [id],
  );

  if (rows.length === 0) throw new Error("DISCUSSION_NOT_FOUND");
  return rows[0];
};

export const updateDiscussionService = async (id, data) => {
  const { title, subtitle, content, forum_id, is_active, keywords } = data;

  const { rows } = await pool.query(
    `
    UPDATE discussions 
    SET title = $1, 
        subtitle = $2, 
        content = $3, 
        forum_id = $4, 
        is_active = $5, 
        keywords = $6
    WHERE id = $7
    RETURNING *;
    `,
    [title, subtitle, content, forum_id, is_active, keywords, id],
  );

  if (rows.length === 0) throw new Error("DISCUSSION_NOT_FOUND");
  return rows[0];
};

export const updateDiscussionStateService = async (id) => {
  const { rows } = await pool.query(
    `
    UPDATE discussions 
    SET 
      is_active = CASE WHEN is_active = 1 THEN 0 ELSE 1 END,
      updated_at = NOW()
    WHERE id = $1
    RETURNING *;
  `,
    [id],
  );

  if (rows.length === 0) throw new Error("DISCUSSION_NOT_FOUND");
  return rows[0];
};

export const deleteDiscussionService = async (id) => {
  const query = "DELETE FROM discussions WHERE id = $1 RETURNING id;";
  const { rows } = await pool.query(query, [id]);

  if (rows.length === 0) throw new Error("DISCUSSION_NOT_FOUND");
  return rows[0];
};
