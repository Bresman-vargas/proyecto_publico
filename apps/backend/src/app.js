import express from "express";
import auth_router from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { FRONTEND_URL } from "./config.js";
import discussion_router from "./routes/discussions.routes.js";

const app = express();

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", auth_router);
app.use("/api", discussion_router);

export default app;
