"use client";

import SectionHeader from "../ContentSectionHeader";
import Link from "next/link";
import CourseCard from "../cards/course/CoursesCarsd";
import CourseCardSkeleton from "../cards/course/CourseCardSkeleton";
import { ArrowLeft, BookOpen, Newspaper, PackageX } from "lucide-react";
import { mapCourseToCardProps } from "@/src/utils/mapCourse";
import { usePopularFreeCourses } from "@/src/services/course";
import EmptyState from "@/src/components/base/EmptyState";

export default function PopularFreeCourses() {
  const { data, isLoading } = usePopularFreeCourses();

  const mapped: any[] = (data || []).map(mapCourseToCardProps);

  return (
    <section className="container-custom flex flex-col gap-6">
      <SectionHeader
        title="پرطرفدارترین"
        highlight="دوره‌های رایگان"
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

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <CourseCardSkeleton key={i} />
          ))}
        </div>
      ) : mapped.length === 0 ? (
        <EmptyState message="دوره موجود نیست" icon={BookOpen} />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mapped.map((course: any, i: number) => (
            <CourseCard key={i} {...course} />
          ))}
        </div>
      )}
    </section>
  );
}