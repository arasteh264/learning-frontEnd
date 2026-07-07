"use client";

import Link from "next/link";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-brand px-6 py-16 text-center">
      <div className="w-full max-w-[280px] sm:max-w-[380px] md:max-w-[800px]">
        <DotLottieReact
          src="/animation/404 error page with cat.lottie"
          loop
          autoplay
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <div className="flex flex-col gap-2 px-4">
        <p className="text-base sm:text-lg text-gray-200">
          صفحه‌ای که دنبالش بودی پیدا نشد
        </p>
        <p className="text-sm text-white">
          شاید آدرس اشتباه بوده یا این صفحه جابه‌جا شده
        </p>
      </div>

      <Link
        href="/"
        className="mt-2 rounded-full bg-white px-6 sm:px-8 py-2.5 sm:py-3 text-brand text-sm sm:text-base  transition-colors "
      >
        بازگشت به خانه
      </Link>
    </div>
  );
}