"use client";

import SectionHeader from "../ContentSectionHeader";
import Link from "next/link";
import { ArrowLeft, Star } from "lucide-react";

import BaseSlider from "@/src/components/base/BaseSlider";

import CommentCard from "../cards/comment/CommentCard";
import CommentCardSkeleton from "../cards/comment/CommentCardSkeleton";

const comments = [
  {
    id: 1,
    name: "علی رضایی",
    avatar: "/slider/1.webp",
    job: "برنامه نویس فرانت‌اند",
    rate: 1,
    comment:
      "دوره React سبزلرن واقعا دید منو نسبت به پروژه‌های واقعی عوض کرد. بعد از این دوره تونستم پروژه بگیرم.",
  },

  {
    id: 2,
    name: "نگار محمدی",
    avatar: "/slider/1.webp",
    job: "دانشجوی مهندسی نرم افزار",
    rate: 2,
    comment:
      "توضیحات کامل و قابل فهم بود و مثال‌های عملی خیلی کمک کرد مفاهیم رو بهتر یاد بگیرم.",
  },

  {
    id: 3,
    name: "محمد کریمی",
    avatar: "/slider/1.webp",
    job: "توسعه دهنده Next.js",
    rate: 3,
    comment:
      "کیفیت تدریس و پشتیبانی فوق‌العاده بود. جزو معدود دوره‌هایی بود که واقعا ارزش خرید داشت.",
  },

  {
    id: 4,
    name: "زهرا اکبری",
    avatar: "/slider/1.webp",
    job: "طراح رابط کاربری",
    rate: 4,
    comment:
      "پروژه محور بودن دوره‌ها باعث شد خیلی سریع‌تر وارد بازار کار بشم. اینترنت هنوز کامل سقوط نکرده ظاهراً.",
  },
];

export default function CommentsSlider() {
  return (
    <section className="container-custom flex flex-col gap-6 mt-10">
      <SectionHeader
        title="نظرات"
        highlight="دانشجوها"
        action={
          <Link
            href="/comments"
            className="flex items-center gap-x-2 text-label sm:text-caption hover:text-brand transition-colors"
          >
            <ArrowLeft className="size-4" />
            همه نظرات
          </Link>
        }
      />

      <BaseSlider
        data={comments}
        renderItem={(comment) =>
          comment ? (
            <CommentCard item={comment} />
          ) : (
            <CommentCardSkeleton />
          )
        }
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 2.2 },
          1024: { slidesPerView: 3 },
        }}
      />
    </section>
  );
}