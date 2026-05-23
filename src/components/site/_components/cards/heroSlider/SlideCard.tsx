import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  image: string;
  level?: string;
  href: string;
};

export default function SlideCard({ title, image, level, href }: Props) {
  return (
    <Link
      href={href}
      className="
        block bg-white rounded-xl overflow-hidden h-full
        shadow-sm hover:shadow-xl
        transition-all duration-300
      "
    >
      {/* image */}
      <div className="relative w-full h-45 md:h-120">
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
    </Link>
  );
}
