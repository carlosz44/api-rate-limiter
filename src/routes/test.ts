import { Router } from "express";
import { getTest, postTest } from "../controllers/testController";

const router = Router();

router.get("/", getTest);
router.post("/", postTest);

export default router;
