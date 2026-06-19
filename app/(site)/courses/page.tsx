"use client";

import CoursesFilter from "./modules/filter/coursesFilter";
import IntroCourses from "./modules/introCourses";
import ResponsivePanel from "./modules/filter/ResponsivePanel";
import { useResponsivePanel } from "./modules/filter/useResponsivePanel";
import { courses } from "@/src/config/courseCategory";
import MiniCourseCard from "@/src/components/site/_components/cards/course/miniCourseCard";

export default function Page() {
  const { activePanel, open, close } = useResponsivePanel();

  return (
    <section className="container-custom">
      <IntroCourses />

      <CoursesFilter
        open={open}
        latestUpdateLabel="آپدیت جدید React"
      />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {courses.map((course) => (
          <MiniCourseCard key={course.id} {...course} />
        ))}
      </div>
      <ResponsivePanel
        open={!!activePanel}
        type={activePanel}
        onClose={close}
      />
    </section>
  );
}