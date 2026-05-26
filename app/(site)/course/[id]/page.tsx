"use client";
import { courseComments, courseDetails } from "@/src/config/courseCategory";
import Breadcrumb from "@/src/components/base/Breadcrumb";
import HeroSection from "./modules/HeroSection";
import StatsGrid from "./modules/StatsGrid";
import Session from "./modules/session/Session";
import PrerequisitesCard from "./modules/session/PrerequisitesCard";
import CommentList from "./modules/session/CommentList";

export default function CourseDetailsPage() {
  const { breadcrumb, hero, stats } = courseDetails;

  return (
    <section className="container-custom text-right">
      <Breadcrumb items={breadcrumb} className="mb-8" />

      <HeroSection hero={hero} />

      <StatsGrid stats={stats} />
      <Session/>
      <PrerequisitesCard
  items={["Node", "Express"]}
/>
<CommentList comments={courseComments} />
    </section>
  );
}