"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Loader2,
  CreditCard,
  ShoppingCart,
  ShieldCheck,
  AlertCircle,
  Tag,
} from "lucide-react";
import { useCreateOrder, useRequestPayment } from "@/src/hooks/useOrder";
import EmptyState from "@/src/components/base/EmptyState";
import { useCart } from "@/src/hooks/useCart";
import { CartItem } from "@/src/services/cart";
import PayButton from "./modules/PayButton";
import TrustNote from "./modules/TrustNote";

export default function CheckoutPage() {
  const router = useRouter();
  const { data: cart, isLoading: cartLoading } = useCart();
  const { mutateAsync: createOrderMutate } = useCreateOrder();
  const { mutateAsync: requestPaymentMutate } = useRequestPayment();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    setProcessing(true);
    setError(null);
    try {
      const orderResult = await createOrderMutate();
      const orderId = orderResult.order.id;
      const paymentResult = await requestPaymentMutate(orderId);

      if (paymentResult.free) {
        router.push(`/payment/success?orderId=${orderId}&free=true`);
      } else {
        window.location.href = paymentResult.paymentUrl;
      }
    } catch (err) {
      setProcessing(false);
      setError(
        "پرداخت با مشکل مواجه شد. لطفاً دوباره تلاش کنید یا اتصال اینترنت خود را بررسی کنید."
      );
    }
  };

  if (cartLoading) {
    return (
      <div className="container-custom px-4 mt-10 max-w-xl mx-auto flex flex-col gap-6" dir="rtl">
        <div className="h-6 w-32 rounded-lg bg-gray-100 animate-pulse" />
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-lg bg-gray-100 animate-pulse shrink-0" />
              <div className="flex-1 flex flex-col gap-2">
                <div className="h-3 w-3/4 rounded bg-gray-100 animate-pulse" />
                <div className="h-3 w-1/3 rounded bg-gray-100 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
        <div className="h-12 w-full rounded-xl bg-gray-100 animate-pulse" />
      </div>
    );
  }

  if (!cart?.items?.length) {
    return (
      <div className="container-custom px-4 mt-10">
        <EmptyState message="سبد خرید شما خالی است" icon={ShoppingCart} />
      </div>
    );
  }

  const itemCount = cart.items.length;

  return (
    <section
      className="container-custom px-4 mt-6 sm:mt-10 max-w-xl mx-auto flex flex-col gap-5 pb-28 sm:pb-6"
      dir="rtl"
    >
      <div>
        <h1 className="text-xl font-bold text-gray-900">تکمیل خرید</h1>
        <p className="text-sm text-gray-500 mt-1">
          {itemCount.toLocaleString("fa-IR")} دوره در سبد خرید شما
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <h2 className="text-sm font-bold px-5 py-4 border-b border-gray-100">
          خلاصه سفارش
        </h2>

        <div className="flex flex-col divide-y divide-gray-50">
          {cart.items.map((item: CartItem) => {
            const course = item.courses;
            const price = Number(course.price) ?? 0;
            const discount = course.discount ?? 0;
            const finalPrice =
              discount > 0
                ? Math.round(price - (price * discount) / 100)
                : price;

            return (
              <div key={item.id} className="flex items-center gap-3 px-5 py-3">
                {course.cover ? (
                  <Image
                    src={course.cover}
                    alt={course.name}
                    width={52}
                    height={52}
                    className="w-13 h-13 rounded-lg object-cover shrink-0"
                  />
                ) : (
                  <div className="w-13 h-13 rounded-lg bg-gray-100 shrink-0" />
                )}

                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800 truncate">
                    {course.name}
                  </p>
                  {discount > 0 && (
                    <span className="inline-flex items-center gap-1 mt-1 text-[11px] text-green-700 bg-green-50 px-1.5 py-0.5 rounded-md">
                      <Tag size={11} />
                      {discount.toLocaleString("fa-IR")}٪ تخفیف
                    </span>
                  )}
                </div>

                <div className="text-left shrink-0">
                  {discount > 0 && (
                    <p className="text-[11px] text-gray-400 line-through">
                      {price.toLocaleString("fa-IR")}
                    </p>
                  )}
                  <p className="text-sm font-medium text-gray-700">
                    {finalPrice === 0
                      ? "رایگان"
                      : `${finalPrice.toLocaleString("fa-IR")} تومان`}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between items-center px-5 py-4 bg-gray-50/60 border-t border-gray-100">
          <span className="text-sm font-medium text-gray-600">
            مبلغ قابل پرداخت
          </span>
          <span className="text-lg font-bold text-brand">
            {cart.total === 0
              ? "رایگان"
              : `${cart.total.toLocaleString("fa-IR")} تومان`}
          </span>
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          <AlertCircle size={18} className="shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Desktop / inline CTA */}
      <div className="hidden sm:flex flex-col gap-3">
        <PayButton
          processing={processing}
          onClick={handlePayment}
          free={cart.total === 0}
        />
        <TrustNote />
      </div>

      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-2">
        <PayButton
          processing={processing}
          onClick={handlePayment}
          free={cart.total === 0}
        />
        <TrustNote compact />
      </div>
    </section>
  );
}

