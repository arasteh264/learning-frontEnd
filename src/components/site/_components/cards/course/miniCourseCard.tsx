import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type CourseCardProps = {
  title: string;
  href: string;
  image: string;
  description?: string;
  author: {
    name: string;
    avatar: string;
  };
  rating: number;
  students: number;
  price: number;
  oldPrice: number;
  discount: number;
};

export default function MiniCourseCard({
  title,
  href,
  image,
  description,
  author,
  rating,
  students,
  price,
  oldPrice,
  discount,
}: CourseCardProps) {
  return (
    <div className="group flex  gap-3 rounded-xl bg-white border border-gray-100 shadow-xs overflow-hidden p-3">
      <div className="flex flex-col justify-between flex-1 min-w-0">
        <Link href={href}>
          <h3 className="text-xs text-right font-semibold text-gray-700 line-clamp-2">
            {title}
          </h3>
        </Link>

        {description && (
          <p className="text-[10px] text-right text-gray-500 line-clamp-1">
            {description}
          </p>
        )}

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1 text-yellow-500 text-[10px]">
            <svg className="size-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span>{rating.toLocaleString("fa-IR")}</span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-[10px] text-gray-500">{author.name}</span>

            <div className="relative size-5 rounded-full overflow-hidden shrink-0">
              <Image
                src={author.avatar}
                alt={author.name}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* PRICE + STUDENTS */}
        <div className="flex items-center justify-between mt-2">
          {/* price */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="line-through text-[9px] text-gray-400">
                {oldPrice.toLocaleString("fa-IR")}
              </span>

              <span className="bg-green-500 text-white text-[9px] px-1 rounded">
                {discount.toLocaleString("fa-IR")}%
              </span>
            </div>

            <div className="text-[10px]">
              {price.toLocaleString("fa-IR")} تومان
            </div>
          </div>

          {/* students */}
          <div className="flex items-center gap-1 text-gray-400 text-[10px]">
            <User className="size-3" />
            <span>{students.toLocaleString("fa-IR")}</span>
          </div>
        </div>
      </div>
      <Link href={href} className="shrink-0">
        <div className="relative w-28 h-20 rounded-lg overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition"
          />
        </div>
      </Link>
    </div>
  );
}
