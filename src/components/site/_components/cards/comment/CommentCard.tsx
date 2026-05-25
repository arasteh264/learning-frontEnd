import { Quote, Star } from "lucide-react";
import Image from "next/image";

type CommentItem = {
  id: number;
  name: string;
  avatar: string;
  job: string;
  rate: number;
  comment: string;
};

export default function CommentCard({ item }: { item: CommentItem }) {
  return (
    <div
      className=" w-full
        bg-white text-right rounded-2xl border border-gray-100
        shadow-sm hover:shadow-xl
        transition-all duration-300
        p-5 h-full flex flex-col gap-5
      "
    >
      <div className="flex items-center justify-between">
                <Quote className="size-7 text-gray-200" />
        <div className="flex items-center gap-3">


          <div className="flex flex-col">
            <h3 className="text-sm font-bold text-gray-800">
              {item.name}
            </h3>

            <span className="text-xs text-gray-500">
              {item.job}
            </span>
          </div>
                    <div className="relative size-8">
            <Image
              src={item.avatar}
              alt={item.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
        </div>


      </div>

      <p className="text-sm leading-7 text-gray-600 line-clamp-4">
        {item.comment}
      </p>

      <div className="flex items-center gap-1 mt-auto">
        {Array.from({ length: item.rate }).map((_, i) => (
          <Star
            key={i}
            className="size-4 !fill-yellow-400 !text-yellow-400"
            color="yellow"
            fill="yellow"
          />
        ))}
      </div>
    </div>
  );
}
