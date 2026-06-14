"use client";
import SectionHeader from "../ContentSectionHeader";
import BaseSlider from "@/src/components/base/BaseSlider";
import CategoryCard, { CategoryCardProps } from "../cards/category/CategoryCards";
import CategoryCardSkeleton from "../cards/category/CategoryCardSkeleton";
import { useCategoryList } from "@/src/services/category";

export interface Category {
  id: string;
  title: string;
  href: string;
  image?: string | null;
  count?: number;
  created_at: string;
  updated_at: string;
}
export default function CourseCategory() {
  const { data, isLoading } = useCategoryList();

const mapped: CategoryCardProps[] = (data || []).map((c: Category) => ({
  title: c.title,
  href: c.href,
  image: c.image || null,
  count: c.count ?? 0,
}));

  return (
    <section className="container-custom flex flex-col gap-2 mt-10">
      <SectionHeader title="دسته بندی" highlight="دوره ها" />

      <BaseSlider
        data={mapped}
        loading={isLoading}
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