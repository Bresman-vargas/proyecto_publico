import { pool } from "../db.js";

export const getAllForums = async () => {
  const { rows } = await pool.query("SELECT * FROM forums ORDER BY created_at DESC");
  return rows;
};

export const createForum = async (data) => {
  const { categoria, titulo, descripcion, imagen } = data;
  const { rows } = await pool.query(
    `INSERT INTO forums (categoria, titulo, descripcion, imagen) 
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [categoria, titulo, descripcion, imagen]
  );
  return rows[0];
};

export const updateForum = async (id, data) => {
  const { categoria, titulo, descripcion, imagen } = data;
  const { rows } = await pool.query(
    `UPDATE forums 
     SET categoria = $1, titulo = $2, descripcion = $3, imagen = $4
     WHERE id = $5 RETURNING *`,
    [categoria, titulo, descripcion, imagen, id]
  );
  return rows[0];
};

export const deleteForum = async (id) => {
  await pool.query(
    "DELETE FROM discussions WHERE forum_id = $1",
    [id]
  );
  const { rows } = await pool.query(
    "DELETE FROM forums WHERE id = $1 RETURNING *",
    [id]
  );
  return rows[0];
};