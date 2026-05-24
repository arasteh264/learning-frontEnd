import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type SocialBannerItem = {
  href: string;
  image: string;
  alt: string;
  ariaLabel: string;
  titleColor?: string;
  title: string;
  subtitle: string;
};

type SocialBannersProps = {
  items: SocialBannerItem[];
};

export default function SocialBanners({ items }: SocialBannersProps) {
  return (
    <div className="container-custom  py-10 sm:py-16 lg:py-20">
      <section className="flex flex-col sm:flex-row gap-5">
        {items.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            target="_blank"
            aria-label={item.ariaLabel}
            className="w-full  flex items-center justify-between  gap-5 px-5  py-5 shadow-2xl rounded-2xl"
          >
            <Button
              type="primary"
              size="small"
              className="!bg-gray-800 text-white hover:bg-black/80 flex items-center gap-1"
            >
              <ArrowLeft className="size-3" />
              مشاهده
            </Button>

            <div className="flex flex-col bg-gray-100 rounded-xl text-right py-2 px-1">
              <span className="text-xs">{item.subtitle}</span>
              <h1
                className="text-sm font-extrabold pt-1"
                style={{ color: item.titleColor }}
              >
                {item.title}
              </h1>{" "}
            </div>

            <Image
              src={item.image}
              alt={item.alt}
              width={25}
              height={25}
              className="rounded-xl   object-cover hover:opacity-90 transition"
            />
          </Link>
        ))}
      </section>
    </div>
  );
}
