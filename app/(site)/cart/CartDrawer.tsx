"use client";
import { Drawer } from "vaul";
import { X, Trash2, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart, useRemoveFromCart } from "@/src/hooks/useCart";
import EmptyState from "@/src/components/base/EmptyState";

export default function CartDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { data: cart, isLoading } = useCart();
  const { mutate: remove, isPending } = useRemoveFromCart();

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange} direction="right">
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-40" />

        <Drawer.Content
          className="
            fixed top-0 right-0 bottom-0 z-50
            w-full sm:w-[420px]
            bg-white
            flex flex-col
            outline-none
          "
        >
          <div dir="rtl" className="flex flex-col h-full">
            {/* هدر */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 shrink-0">
              <Drawer.Title className="text-sm font-bold">
                سبد خرید
                {cart?.count > 0 && (
                  <span className="text-gray-400 font-normal mr-1">
                    ({cart.count.toLocaleString("fa-IR")})
                  </span>
                )}
              </Drawer.Title>
              <Drawer.Close asChild>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <X size={20} />
                </button>
              </Drawer.Close>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4">
              {isLoading ? (
                <div className="flex flex-col gap-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-20 rounded-xl bg-gray-100 animate-pulse"
                    />
                  ))}
                </div>
              ) : !cart?.items?.length ? (
                <EmptyState message="سبد خرید شما خالی است" icon={ShoppingCart} />
              ) : (
                <div className="flex flex-col gap-3">
                  {cart.items.map((item: any) => {
                    const course = item.courses;
                    const price = course.price ?? 0;
                    const discount = course.discount ?? 0;
                    const finalPrice =
                      discount > 0
                        ? Math.round(price - (price * discount) / 100)
                        : price;

                    return (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-3 rounded-xl border border-gray-100"
                      >
                        {course.cover && (
                          <img
                            src={course.cover}
                            alt={course.name}
                            className="w-16 h-12 rounded-lg object-cover shrink-0"
                          />
                        )}

                        <div className="flex-1 min-w-0">
                          <Link
                            href={course.href || "#"}
                            onClick={() => onOpenChange(false)}
                          >
                            <p className="text-xs font-medium text-gray-800 truncate">
                              {course.name}
                            </p>
                          </Link>
                          <p className="text-xs text-green-600 mt-1">
                            {finalPrice === 0
                              ? "رایگان"
                              : `${finalPrice.toLocaleString("fa-IR")} تومان`}
                          </p>
                        </div>

                        <button
                          onClick={() => remove(course.id)}
                          disabled={isPending}
                          className="text-gray-300 hover:text-red-500 transition-colors shrink-0"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {cart?.items?.length > 0 && (
              <div className="border-t border-gray-100 px-4 py-4 shrink-0 flex flex-col gap-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">مبلغ قابل پرداخت</span>
                  <span className="font-bold text-green-600">
                    {cart.total === 0
                      ? "رایگان"
                      : `${cart.total.toLocaleString("fa-IR")} تومان`}
                  </span>
                </div>

                <Link
                  href="/checkout"
                  onClick={() => onOpenChange(false)}
                  className="
                    w-full text-center py-3 rounded-xl
                    bg-green-600 hover:bg-green-700
                    text-white text-sm font-medium transition-colors
                  "
                >
                  ادامه و پرداخت
                </Link>
              </div>
            )}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}