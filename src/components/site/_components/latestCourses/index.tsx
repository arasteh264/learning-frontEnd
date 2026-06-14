import SectionHeader from "../ContentSectionHeader";
import Link from "next/link";
import CourseCard from "../cards/course/CoursesCarsd";
import { ArrowLeft } from "lucide-react";
import { getAllCourse } from "@/src/services/course";

export default async function LatestCourses() {
  const courses = await getAllCourse({});

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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {courses.map((course: any) => (
          <CourseCard
            key={course.id}
            title={course.name}
            href={course.href}
            image={course.cover}
            description={course.description}
            author={{
              name: course.teachers?.bio ?? "",
              avatar: "/img/avatar-placeholder.png",
            }}
            rating={course.teachers?.rating ?? 0}
            students={0}
            price={course.price}
            oldPrice={course.price + (course.price * course.discount) / 100}
            discount={course.discount}
          />
        ))}
      </div>
    </section>
  );
}