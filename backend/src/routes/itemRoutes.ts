import { Router } from "express";
import {
  createItem,
  deleteItem,
  getItemsByUser,
  updateItem,
} from "../controllers/itemController";
const router = Router();

router.post("/", createItem);
router.get("/:userId", getItemsByUser);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

export default router;