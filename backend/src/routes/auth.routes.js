import { Router } from "express";

import { login, register, logout } from "../controllers/auth.controllers.js";
import { validateSchema } from "../middleware/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
import { auth } from "../middleware/auth.middleware.js";

const auth_router = Router();

auth_router.post("/login", validateSchema(loginSchema), login);
auth_router.post("/register", validateSchema(registerSchema), register);
auth_router.post("/logout", logout);

auth_router.get('/prueba', auth ,(req, res) => {
    res.status(200).json({message : "todo ok"})
})

//prueba-pull-bresman

export default auth_router;
