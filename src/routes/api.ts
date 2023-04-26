import { Router } from "express";
import { getTest, postTest } from "../controllers/apiController";

const router = Router();

router.get("/", getTest);
router.post("/", postTest);

export default router;
