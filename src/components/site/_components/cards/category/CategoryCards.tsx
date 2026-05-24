"use client";
import Image from "next/image";
import Link from "next/link";



type CategoryCardProps = {
  title: string;
  href: string;
  image: string;
  count?: number;
};


export default function CategoryCard({
  title,
  href,
  image,
  count,
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="bg-white shadow-2xl flex flex-col items-center justify-center gap-3 sm:gap-2 px-2  rounded-xl shadow-base border border-gray-100
      hover:border-brand hover:bg-brand/5 transition-all duration-200 h-full
      
      "
    >
      <div className="relative size-24 sm:size-28  pt-2">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain rounded-2xl"
        />
      </div>

      <h3 className="text-1xl sm:text-sm font-medium text-gray-600">
        {title}
      </h3>

      <span className="flex items-center gap-1 px-1 py-1 mb-5 bg-[#1eb35b] text-[11px] sm:text-xs text-white rounded-md">
        {count?.toLocaleString("fa-IR")} دوره
        <span className="hidden sm:inline">
          آموزشی
        </span>
      </span>
    </Link>
  );
}