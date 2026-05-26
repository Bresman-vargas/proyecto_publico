import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 4000;
export const TOKEN_SECRET = process.env.TOKEN_SECRET;

export const DB_CONFIG = {
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "proyecto_publico",
  ssl: {
    rejectUnauthorized: false,
  },
};

export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
