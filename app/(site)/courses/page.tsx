"use client";

import CoursesFilter from "./modules/filter/coursesFilter";
import IntroCourses from "./modules/introCourses";
import ResponsivePanel from "./modules/filter/ResponsivePanel";
import { useResponsivePanel } from "./modules/filter/useResponsivePanel";

export default function Page() {
  const { activePanel, open, close } = useResponsivePanel();

  return (
    <section className="container-custom">
      <IntroCourses />

      <CoursesFilter
        open={open}
        latestUpdateLabel="آپدیت جدید React"
      />

      <ResponsivePanel
        open={!!activePanel}
        type={activePanel}
        onClose={close}
      />
    </section>
  );
}