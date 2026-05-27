import { pool } from "../db.js";
import { v4 as uuidv4 } from "uuid";

export const createCommentService = async (data) => {
  const { content, discussion_id, user_id, parent_comment_id = null } = data;
  const commentId = uuidv4();

  const { rows } = await pool.query(
    `INSERT INTO comments (id, content, discussion_id, user_id, parent_comment_id, upvotes, downvotes)
     VALUES ($1, $2, $3, $4, $5, 0, 0)
     RETURNING *;`,
    [commentId, content, discussion_id, user_id, parent_comment_id]
  );

  return rows[0];
};

// Obtener todos los comentarios de una discusión con el nombre del usuario mapeado
export const getCommentsByDiscussionService = async (discussionId) => {
  const { rows } = await pool.query(
    `SELECT 
        c.*,
        CONCAT_WS(' ', u.nombre, u.apellido_paterno) AS nombre_usuario
     FROM comments c
     INNER JOIN usuarios u ON c.user_id = u.id
     WHERE c.discussion_id = $1
     ORDER BY c.created_at ASC;`,
    [discussionId]
  );
  return rows;
};

export const deleteCommentService = async (id) => {
  const { rows } = await pool.query(
    "DELETE FROM comments WHERE id = $1 RETURNING id;",
    [id]
  );

  if (rows.length === 0) throw new Error("COMMENT_NOT_FOUND");
  return rows[0];
};


export const voteCommentService = async (commentId, userId, newVoteType) => {
  // Iniciamos una transacción para asegurar consistencia de datos
  const client = await pool.connect(); //
  
  try {
    await client.query("BEGIN");

    // 1. Verificar si este usuario ya votó previamente en este comentario
    const { rows: existingVotes } = await client.query(
      "SELECT vote_type FROM comment_votes WHERE user_id = $1 AND comment_id = $2;",
      [userId, commentId]
    );

    if (existingVotes.length === 0) {
      // ----------------------------------------------------
      // CASO A: Es el primer voto del usuario
      // ----------------------------------------------------
      // Insertamos el registro del voto
      await client.query(
        "INSERT INTO comment_votes (user_id, comment_id, vote_type) VALUES ($1, $2, $3);",
        [userId, commentId, newVoteType]
      );

      // Incrementamos el contador correspondiente
      const columnToIncrement = newVoteType === "up" ? "upvotes" : "downvotes";
      const { rows } = await client.query(
        `UPDATE comments SET ${columnToIncrement} = ${columnToIncrement} + 1, updated_at = NOW() WHERE id = $1 RETURNING *;`,
        [commentId]
      );

      await client.query("COMMIT");
      return { comment: rows[0], user_vote: newVoteType };

    } else {
      const currentVoteType = existingVotes[0].vote_type;

      if (currentVoteType === newVoteType) {
        // ----------------------------------------------------
        // CASO B: El usuario presiona el mismo botón (Quita el voto)
        // ----------------------------------------------------
        // Eliminamos el registro del voto
        await client.query(
          "DELETE FROM comment_votes WHERE user_id = $1 AND comment_id = $2;",
          [userId, commentId]
        );

        // Restamos uno al contador correspondiente
        const columnToDecrement = currentVoteType === "up" ? "upvotes" : "downvotes";
        const { rows } = await client.query(
          `UPDATE comments SET ${columnToDecrement} = ${columnToDecrement} - 1, updated_at = NOW() WHERE id = $1 RETURNING *;`,
          [commentId]
        );

        await client.query("COMMIT");
        return { comment: rows[0], user_vote: null }; // Retorna null indicando que ya no tiene voto

      } else {
        // ----------------------------------------------------
        // CASO C: El usuario cambia de opinión (ej: de 'up' a 'down')
        // ----------------------------------------------------
        // Actualizamos el tipo de voto en la tabla intermedia
        await client.query(
          "UPDATE comment_votes SET vote_type = $3 WHERE user_id = $1 AND comment_id = $2;",
          [userId, commentId, newVoteType]
        );

        // Restamos al viejo contador y sumamos al nuevo contador de forma atómica
        const incColumn = newVoteType === "up" ? "upvotes" : "downvotes";
        const decColumn = currentVoteType === "up" ? "upvotes" : "downvotes";

        const { rows } = await client.query(
          `UPDATE comments 
           SET ${incColumn} = ${incColumn} + 1, 
               ${decColumn} = ${decColumn} - 1, 
               updated_at = NOW() 
           WHERE id = $1 RETURNING *;`,
          [commentId]
        );

        await client.query("COMMIT");
        return { comment: rows[0], user_vote: newVoteType };
      }
    }

  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};