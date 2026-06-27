import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addToCart, Cart, getCart, removeFromCart } from "../services/cart";

export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    staleTime: 1000 * 60,
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  return useMutation<Cart, Error, string>({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("به سبد خرید اضافه شد");
    },
    onError: () => {
      toast.error("خطا در افزودن به سبد خرید");
    },
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  return useMutation<Cart, Error, string>({
    mutationFn: removeFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("از سبد خرید حذف شد");
    },
    onError: () => {
      toast.error("خطا در حذف از سبد خرید");
    },
  });
};