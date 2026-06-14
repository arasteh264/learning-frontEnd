"use client";

import BaseSlider from "@/src/components/base/BaseSlider";


import SlideCard, { SlideProps } from "../_components/cards/heroSlider/SlideCard";
import SkeletonCard from "../_components/cards/heroSlider/skeletonCard";
import { useQuery } from "@tanstack/react-query";
import { getAll } from "@/src/services/slider";

export default function CardSlider() {
  const { data, isLoading,isFetching } = useQuery({
    queryKey: ["sliders"],
    queryFn: getAll,
  });

  return (
    <section className="mt-5">
<BaseSlider<SlideProps>
  data={data ?? []}
  loading={isLoading||isFetching}
renderItem={(course) =>
  course ? (
    <SlideCard
      link={course.link}
      image_url={course.image_url}
      title={course.title}
      order={course.order}
    />
  ) : (
    <SkeletonCard />
  )
}
   autoplay
    breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 2.2 },
          1024: { slidesPerView: 1 },
  }}
/>
</section>
  );
}