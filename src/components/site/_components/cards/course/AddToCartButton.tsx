"use client";
import { ShoppingCart, Check, Loader2 } from "lucide-react";
import { useAddToCart, useCart } from "@/src/hooks/useCart";

export default function AddToCartButton({ courseId }: { courseId: string }) {
  const { data: cart } = useCart();
  const { mutate, isPending } = useAddToCart();

  const isInCart = cart?.items?.some(
    (item: any) => item.course_id === courseId
  );

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    mutate(courseId);
  };

  if (isInCart) {
    return (
      <button
        disabled
        className="flex items-center gap-1.5 w-full justify-center
          py-2 px-3 rounded-lg bg-green-50 text-green-600
          border border-green-200 text-[11px] font-medium"
      >
        <Check size={14} />
        در سبد خرید
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="flex items-center gap-1.5 w-full justify-center
        py-2 px-3 rounded-lg bg-green-600 hover:bg-green-700
        text-white text-[11px] font-medium transition-colors disabled:opacity-60"
    >
      {isPending ? (
        <Loader2 size={14} className="animate-spin" />
      ) : (
        <ShoppingCart size={14} />
      )}
      افزودن به سبد
    </button>
  );
}