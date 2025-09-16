import { Router } from "express";
import { createItem } from "../controllers/itemController";
const router = Router();

router.post("/",createItem);

export default router;

