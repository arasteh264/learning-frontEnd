"use client";

import Image from "next/image";
import { Button } from "antd";
import { ShoppingCart, Star, Users, Eye } from "lucide-react";
import type { Course } from "@/src/services/course";

type Props = {
  course: Course;
};

function formatToman(n: number) {
  return n.toLocaleString("fa-IR");
}

export default function HeroSection({ course }: Props) {
  const hasDiscount = course.discount > 0;
  const finalPrice = hasDiscount
    ? +course.price - (+course.price * course.discount) / 100
    : course.price;

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      <div className="flex flex-col gap-6 order-2 lg:order-1">
        <div className="space-y-4">
          <h1 className="text-xl md:text-4xl font-extrabold leading-relaxed text-[#1C2B27]">
            {course.name}
          </h1>

          <p className="text-gray-500 leading-7 text-xs md:text-base whitespace-pre-line">
            {course.description}
          </p>
        </div>

        <div className="flex items-center justify-end gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <Eye className="size-4" />
            {course.views.toLocaleString("fa-IR")} بازدید
          </div>
          <div className="flex items-center gap-1">
            <Users className="size-4" />
            {course.enrolled_count.toLocaleString("fa-IR")} دانشجو
          </div>
          {course.rating > 0 && (
            <div className="flex items-center gap-1">
              <Star className="size-4 text-amber-400 fill-amber-400" />
              {course.rating.toLocaleString("fa-IR")}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-4 bg-white border border-gray-100 p-4 rounded-xl">
          <div className="flex flex-col gap-1 items-start">
            {hasDiscount && (
              <span className="text-xs text-gray-400 line-through">
                {formatToman(+course.price)}
              </span>
            )}

            <div className="flex items-center gap-1">
              <span className="text-sm font-bold text-[#1C2B27]">
                {formatToman(+finalPrice)}
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
          src={course.cover}
          alt={course.name}
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}