import { useQuery } from "@tanstack/react-query";
import http from "./interseptor/http";
import { Course } from "./course";
import { ApiResponse } from "../types/globalType";



export type OrderStatus = "pending" | "paid" | "cancelled" | "refunded";

export type OrderItem = {
  id: string;
  course: Course;
  price: number;
};

export type Order = {
  id: string;
  userId: string;
  items: OrderItem[];
  totalPrice: number;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
};

export type OrderSummary = Pick<Order, "id" | "totalPrice" | "status" | "created_at">;


export const createOrder = async (): Promise<Order> => {
  const response = await http.post<ApiResponse<Order>>("/order");
  return response.data.data;
};

export const getOrders = async (): Promise<Order[]> => {
  const { data } = await http.get<ApiResponse<Order[]>>("/order");
  return data.data;
};



export const useOrdersQuery = () => {
  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
};