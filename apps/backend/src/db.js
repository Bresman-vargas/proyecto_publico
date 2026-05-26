import pg from "pg";
const { Pool } = pg;
import { DB_CONFIG } from "./config.js";
export const pool = new Pool(DB_CONFIG);

pool.on("error", (err) => {
  console.error("Error inesperado en el pool de Postgres", err);
});
