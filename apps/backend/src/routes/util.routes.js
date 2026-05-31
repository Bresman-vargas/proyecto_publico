import { Router } from "express";

import { getRegions, getComunas } from "../controllers/util.controllers.js";

const util_router = Router();

util_router.get("/regiones", getRegions);
util_router.get("/regiones/:id_region/comunas", getComunas);

export default util_router;