"use client";

import { useEffect, useState } from "react";

import BaseSlider from "@/src/components/base/BaseSlider";

import { sliderData } from "@/src/config/slider";

import SlideCard from "../_components/cards/heroSlider/SlideCard";
import SkeletonCard from "../_components/cards/heroSlider/skeletonCard";

export default function CardSlider() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);

    return () => clearTimeout(t);
  }, []);

  return (
<BaseSlider
  data={sliderData}
  loading={loading}
  renderItem={(course) =>
    course ? <SlideCard {...course} /> : <SkeletonCard />
  }
/>
  );
}