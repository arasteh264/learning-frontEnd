import { useQuery } from "@tanstack/react-query";
import http from "./interseptor/http";

export const createOrder = async () => {
  const response = await http.post("/order");
  return response.data;
};

export const getOrders = async () => {
  const { data } = await http.get("/order");
  return data;
};
export const useOrdersQuery = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
};