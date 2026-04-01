import express from "express";
import auth_router from "./routes/auth.routes.js";
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", auth_router);

export default app;
