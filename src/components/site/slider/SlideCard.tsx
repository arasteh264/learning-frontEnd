import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  image: string;
  level?: string;
  href: string;
};

export default function SlideCard({
  title,
  image,
  level,
  href,
}: Props) {
  return (
    <Link
      href={href}
      className="
        block bg-white rounded-xl overflow-hidden
        shadow-sm hover:shadow-xl
        transition-all duration-300
        hover:-translate-y-1
      "
    >
      {/* image */}
      <div className="relative w-full h-40">
        <Image
          src={image}
          alt={title}
          fill
          className="
            object-cover
            transition-transform duration-300
            hover:scale-105
          "
        />
      </div>

      {/* content */}
      <div className="p-3">
        <h3 className="font-bold text-sm line-clamp-1">
          {title}
        </h3>

        {level && (
          <span className="text-xs text-gray-500">
            {level}
          </span>
        )}
      </div>
    </Link>
  );
}