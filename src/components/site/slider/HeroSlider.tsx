"use client";

import BaseSlider from "@/src/components/base/BaseSlider";
import SlideCard from "../_components/cards/heroSlider/SlideCard";
import SkeletonCard from "../_components/cards/heroSlider/skeletonCard";
import { useQuery } from "@tanstack/react-query";
import { getAll, Slider } from "@/src/services/slider";

export default function CardSlider() {
  const { data, isLoading, isFetching } = useQuery<Slider[]>({
    queryKey: ["sliders"],
    queryFn: getAll,
  });

  return (
    <section className="mt-5">
      <BaseSlider<Slider>
        data={data ?? []}
        loading={isLoading || isFetching}
        renderItem={(slider) =>
          slider ? (
            <SlideCard
              link={slider.link}
              image={slider.image}
              title={slider.title}
              order={slider.order}
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