import { ApiResponse } from "../types/globalType";
import apiClient from "./interseptor/http.client";



export type PaymentStatus = "pending" | "success" | "failed" | "refunded";

export type Transaction = {
  id: string;
  orderId: string;
  amount: number;
  status: PaymentStatus;
  ref_id: string;
  created_at: string;
};

export type PaymentRequest = Pick<Transaction, "orderId">;

export type PaymentResponse = {
  paymentUrl: string;
  authority: string;
  free?: boolean;
};



export const requestPayment = async (orderId: string): Promise<PaymentResponse> => {
  const response = await apiClient.post<ApiResponse<PaymentResponse>>(
    "/payment/request",
    { orderId }
  );
  return response.data.data;
};

export const getAllTransactions = async (): Promise<Transaction[]> => {
  const response = await apiClient.get<ApiResponse<Transaction[]>>(
    "/payment/transactions"
  );
  return response.data.data;
};