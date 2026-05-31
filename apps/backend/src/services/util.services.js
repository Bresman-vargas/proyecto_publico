import { pool } from "../db.js";

export const getAllRegions = async () => {
  const { rows } = await pool.query(
    `SELECT * FROM regiones;`,
  );
  return rows;
};

export const getComunasByRegion = async (id_region) => {
  const { rows } = await pool.query(
    `SELECT * FROM comunas WHERE id_region = $1;`,
    [id_region]
  );
  return rows;
};