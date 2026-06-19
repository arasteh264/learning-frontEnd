"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { XCircle } from "lucide-react";

export default function PaymentFailedPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");

  return (
    <section className="container-custom mt-20 flex flex-col items-center text-center gap-4" dir="rtl">
      <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center">
        <XCircle size={48} className="text-red-500" />
      </div>

      <h1 className="text-xl font-bold">پرداخت ناموفق بود</h1>
      <p className="text-sm text-gray-500 max-w-md">
        متأسفانه پرداخت شما انجام نشد یا توسط شما لغو شد. می‌توانید دوباره تلاش کنید.
      </p>

      {orderId && (
        <p className="text-xs text-gray-400">شماره سفارش: {orderId}</p>
      )}

      <div className="flex gap-3 mt-4">
        <button
          onClick={() => router.push("/cart")}
          className="px-6 py-2.5 rounded-xl bg-green-600 hover:bg-green-700
            text-white text-sm font-medium transition-colors"
        >
          بازگشت به سبد خرید
        </button>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-2.5 rounded-xl border border-gray-200
            text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          صفحه اصلی
        </button>
      </div>
    </section>
  );
}