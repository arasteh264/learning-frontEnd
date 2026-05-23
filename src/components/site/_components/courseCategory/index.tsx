"use client";
import SectionHeader from "../ContentSectionHeader";
import BaseSlider from "@/src/components/base/BaseSlider";
import CategoryCard from "../cards/category/CategoryCards";
import CategoryCardSkeleton from "../cards/category/CategoryCardSkeleton";
export const categories = [
  {
    id: 1,
    title: "پایتون",
    href: "/courses/python",
    image: "/slider/1.webp",
    count: 7,
  },
  {
    id: 2,
    title: "جاوااسکریپت",
    href: "/courses/javascript",
   image: "/slider/2.webp",
    count: 12,
  },
  {
    id: 3,
    title: "ری‌اکت",
    href: "/courses/react",
    image: "/slider/3.webp",
    count: 9,
  },
  {
    id: 4,
    title: "نکست جی‌اس",
    href: "/courses/nextjs",
    image: "/slider/4.webp",
    count: 5,
  },
  {
    id: 5,
    title: "تایپ اسکریپت",
    href: "/courses/typescript",
   image: "/slider/1.webp",
    count: 6,
  },
];

export default function CourseCategory() {
  return (
    <section className="container-custom flex flex-col gap-2 mt-10">
      <SectionHeader
        title="دسته بندی"
        highlight="دوره ها"
      />

<BaseSlider
  data={categories}
  loading={false}
  loadingCount={6}
  autoplay
    breakpoints={{
    0: { slidesPerView: 2.5 },
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 6 },
  }}
  renderItem={(item) =>
    item ? <CategoryCard {...item} /> : <CategoryCardSkeleton />
  }
/>
    </section>
  );
}

