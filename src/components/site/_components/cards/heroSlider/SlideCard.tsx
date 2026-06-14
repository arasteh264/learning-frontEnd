import Image from "next/image";
import Link from "next/link";

export type SlideProps = {
  link: string;
  image_url: string;
  title: string;
  order: string;
};

export default function SlideCard({ link, image_url, title, order }: SlideProps) {
  return (
    <Link
      href={link }
      className="
        block bg-white rounded-xl overflow-hidden h-full
        shadow-sm hover:shadow-xl
        transition-all duration-300
      "
    >
      {/* image */}
      <div className="relative w-full h-45 md:h-120">
        <Image
          src={image_url}
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
