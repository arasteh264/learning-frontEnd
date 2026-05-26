"use client";

import Image from "next/image";
import { Button } from "antd";

export default function HeroSection({ hero }: any) {
  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      <div className="flex flex-col gap-6 order-2 lg:order-1">
        <div className="space-y-4">
          <h1 className="text-xl md:text-4xl font-extrabold leading-relaxed">
            {hero.title}
          </h1>

          <p className="text-gray-600 leading-6 text-xs md:text-base">
            {hero.description}
          </p>
        </div>

        <div className="w-full bg-[#fafafa] rounded-xl   p-5 space-y-5 text-center ">
          <div className="flex flex-col items-center justify-center  gap-4">
            <span className="text-red-600 font-extrabold text-xs">
              {hero.discountTitle}
            </span>

            <div className="flex items-center gap-5 text-xs flex-row-reverse">
              <div className=" flex text-center gap-1">
                <div className="font-bold">{hero.countdown.hours}</div>
                <span className="text-gray-500">ساعت</span>
              </div>

              <div className="flex text-center gap-1">
                <div className="font-bold">{hero.countdown.minutes}</div>
                <span className="text-gray-500">دقیقه</span>
              </div>

              <div className="flex text-center gap-1">
                <div className="font-bold">{hero.countdown.seconds}</div>
                <span className="text-gray-500">ثانیه</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-xl">
          <div className="flex flex-col gap-1 items-start">
            <span className="text-xs text-gray-400 line-through text-right">
              {hero.oldPrice.toLocaleString("fa-IR")}
            </span>

            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-500">تومان</span>

              <span className="text-sm font-bold text-gray-900">
                {hero.price.toLocaleString("fa-IR")}
              </span>
            </div>
          </div>

          <Button
            type="primary"
            className="!bg-[#008686] !text-white !border-none !text-xs !px-5"
            size="large"
          >
            افزودن به سبد خرید
          </Button>
        </div>
      </div>

      <div className="relative aspect-video rounded-2xl overflow-hidden order-1 lg:order-2">
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