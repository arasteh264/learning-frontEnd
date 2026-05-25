import SectionHeader from "../ContentSectionHeader";
import Link from "next/link";
import CourseCard from "../cards/course/CoursesCarsd";
import { ArrowLeft } from "lucide-react";
import { courses } from "@/src/config/courseCategory";



export default function LatestCourses() {
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
        {courses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    </section>
  );
}
