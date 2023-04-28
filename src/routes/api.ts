import { Router } from "express";
import { apiGet, apiPost } from "../controllers/apiController";

const router = Router();

router.get("/", apiGet);
router.post("/", apiPost);

export default router;
