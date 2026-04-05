import { pool } from "../db.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../cofing.js";

export const loginUser = async (email, password) => {
  const [users] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [
    email,
  ]);

  if (users.length === 0) {
    throw new Error("USER_NOT_FOUND");
  }

  const user = users[0];

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

  const [existingUser] = await pool.query(
    "SELECT * FROM usuarios WHERE rut_cuerpo = ? or email = ?",
    [rut_cuerpo, email],
  );

  if (existingUser.length > 0) {
    throw new Error("ALREADY_REGISTERED_USER");
  }

  const userId = uuidv4();
  const password_hash = await bcrypt.hash(password, 10);

  await pool.query(
    `
        INSERT INTO usuarios (
          id, nombre, nombre2, apellido_paterno, apellido_materno, 
          rut_cuerpo, rut_dv, email, id_region, id_comuna, 
          password_hash, acepta_terminos
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
      acepta_terminos,
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
        const [users] = await pool.query(
          "SELECT * FROM usuarios WHERE id = ?",
          [decoded.id],
        );
        const user = users[0];

        if (!user) {
            throw new Error("NOT FOUND");
          }
        resolve({
          id: user.id,
          username: user.nombre,
          email: user.email,
        });
      } catch (err) {
        reject(err);
      }
    });
  });
};
