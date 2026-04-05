import { Router } from "express";

import {
  login,
  register,
  logout,
  verifyToken,
} from "../controllers/auth.controllers.js";
import { validateSchema } from "../middleware/validator.middleware.js";
import { loginSchema, registerSchema } from "@proyecto_publico/schemas";

const auth_router = Router();

auth_router.post("/login", validateSchema(loginSchema), login);
auth_router.post("/register", validateSchema(registerSchema), register);
auth_router.post("/logout", logout);
auth_router.get("/verify", verifyToken);

//prueba-pull-bresman
//prueba-pull-julian
export default auth_router;
