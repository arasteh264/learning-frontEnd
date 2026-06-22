"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "antd";
import { ShoppingCart } from "lucide-react";
import type { CourseHero } from "@/src/services/course";

type Props = {
  hero: CourseHero;
};

function useCountdown(initial: { hours: number; minutes: number; seconds: number }) {
  const [time, setTime] = useState(initial);

  useEffect(() => {
    setTime(initial);
    const interval = setInterval(() => {
      setTime((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds -= 1;
        } else if (minutes > 0) {
          minutes -= 1;
          seconds = 59;
        } else if (hours > 0) {
          hours -= 1;
          minutes = 59;
          seconds = 59;
        } else {
          clearInterval(interval);
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [initial.hours, initial.minutes, initial.seconds]);

  return time;
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export default function HeroSection({ hero }: Props) {
  const countdown = useCountdown(hero.countdown);

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      <div className="flex flex-col gap-6 order-2 lg:order-1">
        <div className="space-y-4">
          <h1 className="text-xl md:text-4xl font-extrabold leading-relaxed text-[#1C2B27]">
            {hero.title}
          </h1>

          <p className="text-gray-500 leading-7 text-xs md:text-base">
            {hero.description}
          </p>
        </div>

        {hero.discountTitle && (
          <div className="w-full bg-[#fafafa] rounded-xl p-5 space-y-4 text-center">
            <span className="text-red-500 font-bold text-xs">
              {hero.discountTitle}
            </span>

            <div className="flex items-center justify-center gap-3 text-xs flex-row-reverse">
              {[
                { value: countdown.hours, label: "ساعت" },
                { value: countdown.minutes, label: "دقیقه" },
                { value: countdown.seconds, label: "ثانیه" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center gap-1 bg-white rounded-lg px-3 py-2 min-w-[52px]"
                >
                  <span className="font-bold text-[#1C2B27] tabular-nums">
                    {pad(item.value)}
                  </span>
                  <span className="text-gray-400 text-[10px]">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between gap-4 bg-white border border-gray-100 p-4 rounded-xl">
          <div className="flex flex-col gap-1 items-start">
            {hero.oldPrice > hero.price && (
              <span className="text-xs text-gray-400 line-through">
                {hero.oldPrice.toLocaleString("fa-IR")}
              </span>
            )}

            <div className="flex items-center gap-1">
              <span className="text-sm font-bold text-[#1C2B27]">
                {hero.price.toLocaleString("fa-IR")}
              </span>
              <span className="text-xs text-gray-400">تومان</span>
            </div>
          </div>

          <Button
            type="primary"
            icon={<ShoppingCart className="size-4" />}
            className="!bg-[#1EB35B] !text-white !border-none !text-xs !px-5 hover:!bg-[#17914a]"
            size="large"
          >
            افزودن به سبد خرید
          </Button>
        </div>
      </div>

      <div className="relative aspect-video rounded-2xl overflow-hidden order-1 lg:order-2 bg-gray-100">
        <Image
          src={hero.image}
          alt={hero.title}
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}