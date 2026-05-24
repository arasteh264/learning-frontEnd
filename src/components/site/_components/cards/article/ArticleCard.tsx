import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type ArticleCardProps = {
  title: string;
  href: string;
  image: string;
  description: string;
  author: {
    name: string;
    avatar: string;
  };
  readTime: number;
};

export default function ArticleCard({
  title,
  href,
  image,
  description,
  author,
  readTime,
}: ArticleCardProps) {
  return (
    <div className="flex flex-col gap-y-3 h-full rounded-xl bg-white shadow-base group/blog text-right shadow-2xl">
      <Link href={href} className="block">
        <Image
          src={image}
          alt={title}
          width={500}
          height={300}
          className="w-full aspect-video object-cover rounded-xl group-hover/blog:brightness-110 transition"
        />
      </Link>

      <div className="flex flex-col justify-between h-full px-3 sm:px-5 pb-10 relative gap-4">
        <div className="flex flex-col gap-2">
          <Link
            href={href}
            className="text-sm font-semibold line-clamp-2 hover:text-brand transition"
          >
            {title}
          </Link>

          <p className="text-xs text-gray-500 line-clamp-2">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between">


          <span className="text-xs text-gray-400">
            {readTime} دقیقه 
          </span>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">{author.name}</span>
            <Image
              src={author.avatar}
              alt={author.name}
              width={24}
              height={24}
              className="rounded-full size-6"
            />

          </div>
        </div>

        <Link
          href={href}
          className=" flex items-center text-xs absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#1eb35b] text-white  px-6 py-2 rounded-xl hover:bg-brand-100 transition"
        >
            <ArrowLeft className="size-4" />
          مطالعه
        </Link>
      </div>
    </div>
  );
}