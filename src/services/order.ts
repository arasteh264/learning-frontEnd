import { useQuery } from "@tanstack/react-query";
import { Course } from "./course";
import { ApiResponse } from "../types/globalType";
import apiClient from "./interseptor/http.client";



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
type CartItem = {
  id: string;
  courses: {
    name: string;
    price: number | string;
    discount: number;
  };
};

export type CreateOrderResponse = {
  order: Order;
};
export type OrderSummary = Pick<Order, "id" | "totalPrice" | "status" | "created_at">;


export const createOrder = async (): Promise<CreateOrderResponse> => {
  const res = await apiClient.post<ApiResponse<CreateOrderResponse>>("/order/create");
  return res.data.data;
};

export const getOrders = async (): Promise<Order[]> => {
  const { data } = await apiClient.get<ApiResponse<Order[]>>("/order");
  return data.data;
};



export const useOrdersQuery = () => {
  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
};