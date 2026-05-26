import { pool } from "../db.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const loginUser = async (email, password) => {
  const { rows } = await pool.query("SELECT * FROM usuarios WHERE email = $1", [
    email,
  ]);

  const user = rows[0];

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);

  if (!isMatch) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const token = await createAccessToken({
    id: user.id,
    email: email,
  });

  return {
    token: token,
    user: {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
    },
  };
};

export const registerUser = async (dataUser) => {
  const {
    nombre,
    nombre2,
    apellido_paterno,
    apellido_materno,
    rut_cuerpo,
    rut_dv,
    email,
    id_region,
    id_comuna,
    password,
    acepta_terminos,
  } = dataUser;

  const { rows } = await pool.query(
    "SELECT * FROM usuarios WHERE rut_cuerpo = $1 OR email = $2",
    [rut_cuerpo, email],
  );

  if (rows.length > 0) {
    throw new Error("ALREADY_REGISTERED_USER");
  }

  const userId = uuidv4();
  const password_hash = await bcrypt.hash(password, 10);

  const aceptaTerminosNumeric =
    acepta_terminos === true || acepta_terminos === "true" ? 1 : 0;

  await pool.query(
    `
        INSERT INTO usuarios (
          id, nombre, nombre2, apellido_paterno, apellido_materno, 
          rut_cuerpo, rut_dv, email, id_region, id_comuna, 
          password_hash, acepta_terminos
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      `,
    [
      userId,
      nombre,
      nombre2 || null,
      apellido_paterno,
      apellido_materno || null,
      rut_cuerpo,
      rut_dv,
      email,
      id_region,
      id_comuna,
      password_hash,
      aceptaTerminosNumeric,
    ],
  );

  const token = await createAccessToken({
    id: userId,
    email: email,
  });

  return {
    token: token,
    user: {
      id: userId,
      nombre,
      email,
    },
  };
};

export const verifyTokenService = async (token) => {
  if (!token) return null;

  return new Promise((resolve, reject) => {
    jwt.verify(token, TOKEN_SECRET, async (error, decoded) => {
      if (error) return resolve(null);

      try {
        const { rows } = await pool.query(
          "SELECT id, nombre, email FROM usuarios WHERE id = $1",
          [decoded.id],
        );

        if (rows.length === 0) return resolve(null);

        resolve(rows[0]);
      } catch (err) {
        reject(err);
      }
    });
  });
};

export const getAllRegions = async () => {
  const { rows } = await pool.query(
    `SELECT * FROM regiones;`,
  );
  return rows;
};
