"use client";

import SectionHeader from "../ContentSectionHeader";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";

import BaseSlider from "@/src/components/base/BaseSlider";
import CourseCard from "../cards/course/CoursesCarsd";
import CourseCardSkeleton from "../cards/course/CourseCardSkeleton";
import EmptyState from "@/src/components/base/EmptyState";

import { mapCourseToCardProps } from "@/src/utils/mapCourse";
import { useGetLatestCourses } from "@/src/services/course";

export default function LatestCoursesSlider() {
  const { data: courses, isLoading } = useGetLatestCourses();

  const mapped = (courses || []).map(mapCourseToCardProps);

  const isEmpty = !isLoading && mapped.length === 0;

  return (
    <section dir="rtl" className="container-custom flex flex-col gap-6">
      <SectionHeader
        title="جدیدترین"
        highlight="دوره‌ها"
        action={
          <Link
            href="/courses"
            className="flex items-center gap-x-2 text-label sm:text-caption hover:text-brand transition-colors"
          >
            <ArrowLeft className="size-4" />
            همه دوره‌ها
          </Link>
        }
      />

      {isEmpty ? (
        <EmptyState
          message="دوره‌ای برای نمایش وجود ندارد"
          icon={BookOpen}
        />
      ) : (
        <BaseSlider
          data={mapped}
          loading={isLoading}
          loadingCount={4}
          renderItem={(course) =>
            course ? <CourseCard {...course} /> : <CourseCardSkeleton />
          }
          breakpoints={{
            0: { slidesPerView: 1.2 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3.2 },
          }}
        />
      )}
    </section>
  );
}