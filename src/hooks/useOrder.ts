import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder } from "@/src/services/order";
import { requestPayment } from "@/src/services/payment";
import { toast } from "react-toastify";
import { ApiError } from "../types/globalType";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (err: ApiError) => {
      toast.error(err.response?.data?.message || "خطا در ثبت سفارش");
    },
  });
};

export const useRequestPayment = () => {
  return useMutation({
    mutationFn: (orderId: string) => requestPayment(orderId),
    onError: (err: ApiError) => {
      toast.error(err.response?.data?.message || "خطا در اتصال به درگاه پرداخت");
    },
  });
};