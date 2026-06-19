"use client";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/src/hooks/useCart";
import CartDrawer from "./CartDrawer";

export default function CartIcon() {
  const [open, setOpen] = useState(false);
  const { data: cart } = useCart();
  const count = cart?.count ?? 0;

  return (
    <>
      <button onClick={() => setOpen(true)} className="relative">
        <ShoppingCart size={22} className="text-gray-600" />
        {count > 0 && (
          <span
            className="absolute -top-1.5 -right-1.5
            w-4 h-4 rounded-full bg-green-600
            text-white text-[10px] flex items-center justify-center"
          >
            {count}
          </span>
        )}
      </button>

      <CartDrawer open={open} onOpenChange={setOpen} />
    </>
  );
}