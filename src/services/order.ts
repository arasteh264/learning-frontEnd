import http from "./interseptor/http";

export const createOrder = async () => {
  const response = await http.post("/order");
  return response.data;
};
