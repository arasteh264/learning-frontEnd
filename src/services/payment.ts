import http from "./interseptor/http";

export const requestPayment = async (orderId: string) => {
  const response = await http.post("/payment/request", { orderId });
  return response.data;
};
export const getAllTransactions = async () => {
  const response = await http.get("/payment/transactions");
  return response.data;
};