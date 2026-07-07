import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";


export type CourseCardProps = {
  id: string;
  title: string;
  href: string;
  image: string;
  description?: string;
  author?: {
    name: string;
    avatar: string;
  };
  rating?: number;
  students?: number;
  price: number;
  oldPrice?: number;
  discount?: number;
};

export default function CourseCard({
  id,
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
     <Link href={`/course/${id}`}>
    <div className="group flex flex-col gap-3 sm:gap-4 rounded-xl shadow-base bg-white overflow-hidden border border-gray-100 text-right h-full">
 
        <div className="relative w-full aspect-video sm:w-full sm:h-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover rounded-xl sm:rounded-none sm:rounded-l-xl group-hover:brightness-110 transition"
          />
        </div>
 

      <div className="flex flex-col justify-between gap-2 px-3 sm:px-5 w-full h-full">
        <div className="flex flex-col gap-1 min-h-[80px]">
         
            <h3 className="text-xs font-semibold text-gray-700 line-clamp-2">
              {title}
            </h3>
         
          {description && (
            <p className="text-[11px] font-light text-gray-500 line-clamp-2">
              {description}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between border-b border-b-gray-100 py-2">
            <div className="flex items-center gap-1 text-yellow-500 text-[11px]">
              <svg
                className="size-4 text-yellow-500"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>

              <span>{(rating ?? 0).toLocaleString("fa-IR")}</span>
            </div>
            {author && (
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-thin">{author.name}</span>
                <div className="size-6 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={author.avatar}
                    alt={author.name}
                    width={24}
                    height={24}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex items-end justify-between">
            <div className="flex items-center gap-3">
              <div className="flex flex-col">
                {discount ? discount > 0 && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="line-through text-muted text-[10px] text-gray-400">
                      {(oldPrice ?? 0).toLocaleString("fa-IR")}
                    </span>

                    <span className="bg-brand text-white text-[10px] py-1 px-1 rounded-md">
                      {discount.toLocaleString("fa-IR")}%
                    </span>
                  </div>
                ) : null}

                <div className="text-[10px] text-left">
                  {price === 0 ? (
                    <span className="text-green-600 font-medium">رایگان</span>
                  ) : (
                    <>
                      <span>تومان</span>
                      <span> {price.toLocaleString("fa-IR")}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-secondary">
              <span className="text-[11px] text-gray-400">
                {(students ?? 0).toLocaleString("fa-IR")}
              </span>
              <User className="size-4 text-gray-400" />
            </div>
          </div>

          <div className="pb-3">
            <AddToCartButton courseId={id} />
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
}