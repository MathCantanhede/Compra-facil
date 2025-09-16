import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001", // ou sua URL de deploy
});

export const getItemsByUser = (userId: string) =>
  api.get(`/items/${userId}`);

export const createItem = (item: { name: string; price: number; userId: string }) =>
  api.post("/items", item);

export const deleteItem = (id: string) =>
  api.delete(`/items/${id}`);

export const updateItem = (id: string, data: { price: number }) =>
  api.put(`/items/${id}`, data);

export const getItemById = (id: string) =>
  api.get(`/items/${id}`);

export default api;
