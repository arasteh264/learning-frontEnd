"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";

import { sliderData } from "@/src/config/slider";
import SlideCard from "./SlideCard";
import SkeletonCard from "./skeletonCard";

export default function CardSlider() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="container-custom mt-5">
      <Swiper
        modules={[FreeMode, Autoplay,Pagination]}
        freeMode
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        spaceBetween={16}
        slidesPerView={1.2}
        breakpoints={{
          0: { slidesPerView: 1.2 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 2.5 },
          1024: { slidesPerView: 1 },
        }}
      >
        {(loading ? Array(6).fill(0) : sliderData).map(
          (course: any, i: number) => (
            <SwiperSlide key={i}>
              {loading ? <SkeletonCard /> : <SlideCard {...course} />}
            </SwiperSlide>
          ),
        )}
      </Swiper>
    </div>
  );
}
