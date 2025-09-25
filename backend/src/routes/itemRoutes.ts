import { Router } from "express";
import {
  createItem,
  deleteItem,
  getItemsByUser,
  updateItem,
  getItemById
} from "../controllers/itemController";
const router = Router();

router.post("/", createItem);
router.get("/:userId", getItemsByUser);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);
router.get("/id/:id", getItemById);       // pega item único pelo ID
router.get("/user/:userId", getItemsByUser); // pega itens de um usuário


export default router;