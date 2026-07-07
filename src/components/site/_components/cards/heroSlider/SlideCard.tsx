import Image from "next/image";
import Link from "next/link";
import type { Slider } from "@/src/services/slider";

export type SlideProps = Pick<Slider, "link" | "image" | "title" | "order">;

export default function SlideCard({ link, image, title }: SlideProps) {
  return (
    <Link
      href={link}
      className="block bg-white rounded-xl overflow-hidden h-full shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div className="relative w-full h-45 md:h-120">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
    </Link>
  );
}
