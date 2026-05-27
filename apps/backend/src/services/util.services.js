import { pool } from "../db.js";

export const getAllRegions = async () => {
  const { rows } = await pool.query(
    `SELECT * FROM regiones;`,
  );
  return rows;
};