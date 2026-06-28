"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle } from "lucide-react";
import Breadcrumb from "@/src/components/base/Breadcrumb";
import {
  getCourseById,
  getCourseSessions,
  getCourseComments,
} from "@/src/services/course";
import HeroSection from "./modules/HeroSection";
import Session from "./modules/session/Session";
import CommentList from "./modules/session/CommentList";
import { HeroSkeleton, SessionSkeleton } from "./modules/Skeletons";

export default function CourseDetailsPage() {
  const params = useParams();
  const courseId = params?.id as string;

  const {
    data: courseData,
    isLoading: isCourseLoading,
    isError: isCourseError,
  } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => getCourseById(courseId),
    enabled: !!courseId,
  });

  const { data: sessionsData, isLoading: isSessionsLoading } = useQuery({
    queryKey: ["courseSessions", courseId],
    queryFn: () => getCourseSessions(courseId),
    enabled: !!courseId,
  });

  const { data: commentsData } = useQuery({
    queryKey: ["courseComments", courseId],
    queryFn: () => getCourseComments(courseId),
    enabled: !!courseId,
  });

  const course = courseData;
  const sessions = sessionsData || [];
  const comments = commentsData || [];

  if (isCourseError) {
    return (
      <section className="container-custom text-right py-20">
        <div className="flex flex-col items-center gap-3 text-center">
          <AlertCircle className="size-10 text-gray-300" />
          <p className="text-sm text-gray-500">
            مشکلی در دریافت اطلاعات این دوره پیش آمد. لطفا دوباره تلاش کنید.
          </p>
        </div>
      </section>
    );
  }

  if (isCourseLoading || !course) {
    return (
      <section className="container-custom text-right">
        <div className="h-5 w-40 bg-gray-100 rounded mb-8 animate-pulse" />
        <HeroSkeleton />
        <SessionSkeleton />
      </section>
    );
  }

  const breadcrumb = [
    { label: "دوره‌ها", href: "/courses" },
    { label: course.name },
  ];

  return (
    <section className="container-custom text-right">
      {/* <Breadcrumb items={breadcrumb} className="mb-8" /> */}

      <HeroSection course={course} />

      {isSessionsLoading ? (
        <SessionSkeleton />
      ) : (
        <Session sessions={sessions} />
      )}

      <CommentList courseId={course.id} comments={comments} />
    </section>
  );
}