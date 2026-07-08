"use client";

import Link from "next/link";
import { Star, Users } from "lucide-react";
import clsx from "clsx";

export interface CourseCardData {
  id: string;
  name: string;
  description: string;
  cover: string;
  href: string;
  price: number | string;
  discount?: number;
  rating?: number;
  enrolled_count?: number;
  views?: number;
  category_id?: string;
  created_at?: string;
  categories?: { id: string; title: string };
  category?: string;
  teachers?: { bio: string };
  creator?: string;
}

function formatPrice(value: number) {
  return Math.round(value).toLocaleString("fa-IR");
}

export default function CourseCard({ course }: { course: CourseCardData }) {
  const price = Number(course.price) || 0;
  const discount = course.discount ?? 0;
  const finalPrice =
    discount > 0 ? Math.round(price - (price * discount) / 100) : price;

  const categoryTitle = course.categories?.title ?? course.category;
  const teacherName = course.teachers?.bio ?? course.creator;

  return (
    <Link
      href={`/courses/${course.href}`}
      className="group flex flex-col rounded-2xl border border-zinc-200 bg-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      {/* کاور */}
      <div className="relative aspect-video overflow-hidden bg-zinc-100">
        {/* توجه: به‌جای next/image از img ساده استفاده شده تا نیازی به تنظیم remotePatterns در next.config نباشه */}
        <img
          src={course.cover}
          alt={course.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {discount > 0 && (
          <span className="absolute top-3 right-3 rounded-full bg-orange-500 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
            {discount.toLocaleString("fa-IR")}٪ تخفیف
          </span>
        )}

        {categoryTitle && (
          <span className="absolute bottom-3 right-3 rounded-full bg-black/60 backdrop-blur-sm px-2.5 py-1 text-[10px] text-white">
            {categoryTitle}
          </span>
        )}
      </div>

      {/* محتوا */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 text-sm font-bold text-zinc-900 leading-6">
          {course.name}
        </h3>

        <p className="line-clamp-2 text-xs leading-5 text-zinc-500">
          {course.description}
        </p>

        {teacherName && (
          <span className="text-[11px] text-zinc-400">
            مدرس: {teacherName}
          </span>
        )}

        <div className="mt-auto flex items-center justify-between border-t border-zinc-100 pt-3">
          <div className="flex items-center gap-3 text-[11px] text-zinc-400">
            <span className="flex items-center gap-1">
              <Star size={12} className="fill-amber-400 text-amber-400" />
              {(course.rating ?? 0).toLocaleString("fa-IR")}
            </span>
            <span className="flex items-center gap-1">
              <Users size={12} />
              {(course.enrolled_count ?? 0).toLocaleString("fa-IR")}
            </span>
          </div>

          <div className="flex flex-col items-end">
            {discount > 0 && finalPrice > 0 && (
              <span className="text-[10px] text-zinc-400 line-through">
                {formatPrice(price)}
              </span>
            )}
            <span
              className={clsx(
                "text-sm font-bold",
                finalPrice <= 0 ? "text-emerald-600" : "text-zinc-900"
              )}
            >
              {finalPrice <= 0 ? "رایگان" : `${formatPrice(finalPrice)} تومان`}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}