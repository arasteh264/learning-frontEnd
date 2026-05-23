"use client";

import { ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

type Breakpoints = {
  [width: number]: {
    slidesPerView: number;
  };
};

const defaultBreakpoints: Breakpoints = {
  0: { slidesPerView: 1.2 },
  640: { slidesPerView: 2 },
  768: { slidesPerView: 2.5 },
  1024: { slidesPerView: 4 },
};

type BaseSliderProps<T> = {
  data: T[];
  renderItem: (item: T | null) => ReactNode;

  loading?: boolean;
  loadingCount?: number;

  autoplay?: boolean;
  freeMode?: boolean;

  breakpoints?: Breakpoints;
};

export default function BaseSlider<T>({
  data,
  renderItem,
  loading = false,
  loadingCount = 6,
  autoplay = true,
  freeMode = true,
  breakpoints,
}: BaseSliderProps<T>) {
  const items = loading ? Array(loadingCount).fill(null) : data;

  return (
    <div className="container-custom ">
      <Swiper
        modules={[FreeMode, Autoplay, Pagination]}
        freeMode={freeMode}
        autoplay={
          autoplay
            ? {
                delay: 4000,
                disableOnInteraction: false,
              }
            : false
        }
        pagination={{ clickable: true }}
        spaceBetween={16}
        slidesPerView={1.2}
        breakpoints={breakpoints ?? defaultBreakpoints} 
      >
        {items.map((item, i) => (
          <SwiperSlide key={i}>
            {renderItem(item)}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}