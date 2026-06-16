import express from "express";
import helmet from "helmet";
import auth_router from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { FRONTEND_URL } from "./config.js";
import discussion_router from "./routes/discussions.routes.js";
import util_router from "./routes/util.routes.js";
import comment_router from "./routes/comments.routes.js";
import survey_router from "./routes/surveys.routes.js";
import forums_router from "./routes/forums.routes.js";

const app = express();

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  }),
);

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

app.use("/api/auth", auth_router);
app.use("/api", discussion_router);
app.use("/api", util_router);
app.use("/api", comment_router);
app.use("/api", survey_router);
app.use("/api", forums_router);

export default app;
