// services/cart.ts
import http from "./interseptor/http";

export const getCart = async () => {
  const res = await http.get("/cart");
  return res.data;
};

export const addToCart = async (courseId: string) => {
  const res = await http.post("/cart/items", { courseId });
  return res.data;
};

export const removeFromCart = async (courseId: string) => {
  const res = await http.delete(`/cart/items/${courseId}`);
  return res.data;
};