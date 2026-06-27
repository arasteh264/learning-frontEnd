import http from "./interseptor/http";
import { Course } from "./course";
import { ApiResponse } from "../types/globalType";



export type CartItem = {
  id: string;
  courses: Pick<Course, "id" | "name" | "cover" | "href" | "price" | "discount">;
};

export type Cart = {
  id: string;
  userId: string;
  items: CartItem[];
  count: number;
  total: number;
};



export const getCart = async (): Promise<Cart> => {
  const res = await http.get<ApiResponse<Cart>>("/cart");
  return res.data.data;
};

export const addToCart = async (courseId: string): Promise<Cart> => {
  const res = await http.post<ApiResponse<Cart>>("/cart/items", { courseId });
  return res.data.data;
};

export const removeFromCart = async (courseId: string): Promise<Cart> => {
  const res = await http.delete<ApiResponse<Cart>>(`/cart/items/${courseId}`);
  return res.data.data;
};