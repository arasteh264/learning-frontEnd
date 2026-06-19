import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addToCart, getCart, removeFromCart } from "../services/cart";

export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    staleTime: 1000 * 60,
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (courseId: string) => addToCart(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("دوره با موفقیت به سبد اضافه شد");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "خطا در افزودن به سبد");
    },
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (courseId: string) => removeFromCart(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("دوره از سبد حذف شد");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "خطا در حذف از سبد");
    },
  });
};