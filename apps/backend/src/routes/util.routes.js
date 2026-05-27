import { Router } from "express";

import { getRegions } from "../controllers/util.controllers.js";

const util_router = Router();

util_router.get("/regiones", getRegions);

export default util_router;