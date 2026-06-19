"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    // بعد از پرداخت موفق، enrollments تغییر کرده، پس کوئری‌های مرتبط رو invalidate کن
    queryClient.invalidateQueries({ queryKey: ["enrollments"] });
    queryClient.invalidateQueries({ queryKey: ["cart"] });
  }, []);

  return (
    <section className="container-custom mt-20 flex flex-col items-center text-center gap-4" dir="rtl">
      <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
        <CheckCircle2 size={48} className="text-green-600" />
      </div>

      <h1 className="text-xl font-bold">پرداخت با موفقیت انجام شد</h1>
      <p className="text-sm text-gray-500 max-w-md">
        خرید شما با موفقیت ثبت شد. اکنون می‌توانید به دوره‌های خریداری‌شده دسترسی داشته باشید.
      </p>

      {orderId && (
        <p className="text-xs text-gray-400">شماره سفارش: {orderId}</p>
      )}

      <div className="flex gap-3 mt-4">
        <button
          onClick={() => router.push("/dashboard/courses")}
          className="px-6 py-2.5 rounded-xl bg-green-600 hover:bg-green-700
            text-white text-sm font-medium transition-colors"
        >
          مشاهده دوره‌های من
        </button>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-2.5 rounded-xl border border-gray-200
            text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          بازگشت به صفحه اصلی
        </button>
      </div>
    </section>
  );
}