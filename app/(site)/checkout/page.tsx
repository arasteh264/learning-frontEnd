"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CreditCard } from "lucide-react";
import { useCreateOrder, useRequestPayment } from "@/src/hooks/useOrder";
import EmptyState from "@/src/components/base/EmptyState";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/src/hooks/useCart";
import { CartItem } from "@/src/services/cart";

export default function CheckoutPage() {
  const router = useRouter();
  const { data: cart, isLoading: cartLoading } = useCart();
  const { mutateAsync: createOrderMutate } = useCreateOrder();
  const { mutateAsync: requestPaymentMutate } = useRequestPayment();
  const [processing, setProcessing] = useState(false);
console.log(cart);

  const handlePayment = async () => {
    setProcessing(true);
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
    }
  };

  if (cartLoading) {
    return (
      <div className="container-custom mt-10 flex justify-center py-20">
        <Loader2 className="animate-spin text-gray-400" size={32} />
      </div>
    );
  }

  if (!cart?.items?.length) {
    return (
      <div className="container-custom mt-10">
        <EmptyState message="سبد خرید شما خالی است" icon={ShoppingCart} />
      </div>
    );
  }

  return (
    <section className="container-custom mt-10 max-w-xl mx-auto flex flex-col gap-6" dir="rtl">
      <h1 className="text-lg font-bold">تکمیل خرید</h1>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col gap-4">
        <h2 className="text-sm font-bold border-b pb-3">خلاصه سفارش</h2>

        <div className="flex flex-col gap-3">
          {cart.items.map((item: CartItem) => {
            const course = item.courses;
            const price = course.price ?? 0;
            const discount = course.discount ?? 0;
            const finalPrice = discount > 0
              ? Math.round(+price - (+price * discount) / 100)
              : price;

            return (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-700 truncate">{course.name}</span>
                <span className="text-gray-600 shrink-0 mr-2">
                  {finalPrice === 0
                    ? "رایگان"
                    : `${finalPrice.toLocaleString("fa-IR")} تومان`}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between text-base font-bold border-t pt-3">
          <span>مبلغ قابل پرداخت</span>
          <span className="text-green-600">
            {cart.total === 0
              ? "رایگان"
              : `${cart.total.toLocaleString("fa-IR")} تومان`}
          </span>
        </div>
      </div>

      <button
        onClick={handlePayment}
        disabled={processing}
        className="w-full flex items-center justify-center gap-2
          py-3 rounded-xl bg-green-600 hover:bg-green-700
          text-white text-sm font-medium transition-colors
          disabled:opacity-60"
      >
        {processing ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <CreditCard size={18} />
        )}
        {cart.total === 0 ? "فعال‌سازی رایگان" : "پرداخت و تکمیل خرید"}
      </button>
    </section>
  );
}