import { Router } from "express";
import {
  createItem,
  deleteItem,
  getItemsByUser,
  updateItem,
} from "../controllers/itemController";
const router = Router();

router.get("/items/:userId", getItemsByUser);
router.post("/items", createItem);
router.put("/items/:id", updateItem);
router.delete("/items/:id", deleteItem);

export default router;