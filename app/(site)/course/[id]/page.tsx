"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle } from "lucide-react";
import Breadcrumb from "@/src/components/base/Breadcrumb";
import { getCourseDetails } from "@/src/services/course";
import HeroSection from "./modules/HeroSection";
import StatsGrid from "./modules/StatsGrid";
import Session from "./modules/session/Session";
import PrerequisitesCard from "./modules/session/PrerequisitesCard";
import CommentList from "./modules/session/CommentList";
import {
  HeroSkeleton,
  StatsGridSkeleton,
  SessionSkeleton,
} from "./modules/Skeletons";

export default function CourseDetailsPage() {
  const params = useParams();
  const courseId = params?.id as string;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["courseDetails", courseId],
    queryFn: () => getCourseDetails(courseId),
    enabled: !!courseId,
  });

  const course = data?.data;

  if (isError) {
    return (
      <section className="container-custom text-right py-20 h-[50vh]">
        <div className="flex flex-col items-center gap-3 text-center mt-20">
          <AlertCircle className="size-10 text-gray-300" />
          <p className="text-sm text-gray-500">
            مشکلی در دریافت اطلاعات این دوره پیش آمد. لطفا دوباره تلاش کنید.
          </p>
        </div>
      </section>
    );
  }

  if (isLoading || !course) {
    return (
      <section className="container-custom text-right">
        <div className="h-5 w-40 bg-gray-100 rounded mb-8 animate-pulse" />
        <HeroSkeleton />
        <StatsGridSkeleton />
        <SessionSkeleton />
      </section>
    );
  }

  return (
    <section className="container-custom text-right">
      {/* <Breadcrumb items={course.breadcrumb} className="mb-8" /> */}

      <HeroSection hero={course.hero} />

      <StatsGrid stats={course.stats} />

      <Session sessions={course.sessions} />

      <PrerequisitesCard items={course.prerequisites} />

      <CommentList courseId={course.id} comments={course.comments} />
    </section>
  );
}