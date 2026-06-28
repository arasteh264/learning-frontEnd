import SectionHeader from "../ContentSectionHeader";
import Link from "next/link";
import CourseCard from "../cards/course/CoursesCarsd";
import { ArrowLeft, BookOpen } from "lucide-react";
import { getAllCourse } from "@/src/services/course";
import EmptyState from "@/src/components/base/EmptyState";

export default async function LatestCourses() {
  debugger
  const courses = await getAllCourse() ?? [];
  

  return (
    <section className="container-custom flex flex-col gap-6">
      <SectionHeader
        title="آخرین"
        highlight="دوره های سبزلرن"
        action={
          <Link
            href="/courses"
            className="flex items-center gap-x-2 text-label sm:text-caption hover:text-brand transition-colors"
          >
            <ArrowLeft className="size-4" />
            همه دوره ها
          </Link>
        }
      />

      {courses.length === 0 ? (
        <EmptyState
          message="دوره‌ای برای نمایش وجود ندارد"
          icon={BookOpen}
        />
      ) : (
        <div dir="rtl" className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
          {courses.map((course: any) => (
            <CourseCard
              id={course.id}
              key={course.id}
              title={course.name}
              href={course.href}
              image={course.cover}
              description={course.description}
              author={{
                name: course.teachers?.bio ?? "",
                avatar: "/images/avatar-placeholder.png",
              }}
              rating={course.teachers?.rating ?? 0}
              students={0}
              price={course.price}
              oldPrice={
                course.price +
                (course.price * course.discount) / 100
              }
              discount={course.discount}
            />
          ))}
        </div>
      )}
    </section>
  );
}