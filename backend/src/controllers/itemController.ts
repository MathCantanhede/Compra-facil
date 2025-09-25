import { Request, Response } from "express";
import prisma from "../prisma/client";

export const getItemsByUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const items = await prisma.item.findMany({ where: { userId } });
    res.json(items);
  } catch {
    res.status(500).json({ error: "Erro ao buscar itens" });
  }
};

export const createItem = async (req: Request, res: Response) => {
  const { name, price, userId } = req.body;

  if (!name || !price || !userId) {
    return res.status(400).json({ error: "Dados incompletos" });
  }

  try {
    const item = await prisma.item.create({
      data: {
        name,
        price: parseFloat(price),
        userId, // ✅ já é string (UUID)
      },
    });

    res.status(201).json(item);
  } catch (error) {
    console.error("Erro ao criar item:", error);
    res.status(500).json({ error: "Erro ao criar item" });
  }
};


export const updateItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { price } = req.body;
  try {
    const item = await prisma.item.update({
      where: { id },
      data: { price: parseFloat(price) },
    });
    res.json(item);
  } catch {
    res.status(500).json({ error: "Erro ao atualizar item" });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.item.delete({ where: { id } });
    res.status(204).send();
  } catch {
    res.status(500).json({ error: "Erro ao deletar item" });
  }
};
export const getItemById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const item = await prisma.item.findUnique({ where: { id } });
    if (!item) return res.status(404).json({ error: "Item não encontrado" });
    res.json(item);
  } catch (err) {
    console.error("Erro ao buscar item:", err);
    res.status(500).json({ error: "Erro ao buscar item" });
  }
};
