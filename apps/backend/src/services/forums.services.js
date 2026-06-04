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