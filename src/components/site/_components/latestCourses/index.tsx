import SectionHeader from "../ContentSectionHeader";
import Link from "next/link";
import CourseCard from "../cards/course/CoursesCarsd";
import { ArrowLeft } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "آموزش React از صفر تا ورود به بازار کار",
    href: "/course/react",
    image: "/slider/1.webp",
    description:
      "یادگیری React به صورت پروژه محور و کاملاً کاربردی برای ورود به بازار کار.",
    author: {
      name: "محمدامین سعیدی راد",
      avatar: "/slider/1.webp",
    },
    rating: 4.8,
    students: 300,
    price: 1875000,
    oldPrice: 6250000,
    discount: 70,
  },
  {
    id: 2,
    title: "Next.js حرفه‌ای برای پروژه‌های واقعی",
    href: "/course/nextjs",
    image: "/slider/2.webp",
    description: "ساخت اپلیکیشن‌های SSR و Fullstack با Next.js",
    author: {
      name: "علی رضایی",
      avatar: "/slider/2.webp",
    },
    rating: 4.7,
    students: 300,
    price: 1990000,
    oldPrice: 4000000,
    discount: 50,
  },
  {
    id: 3,
    title: "JavaScript پیشرفته",
    href: "/course/js",
    image: "/slider/3.webp",
    description: "درک عمیق از JS و مفاهیم پیشرفته",
    author: {
      name: "سارا محمدی",
      avatar: "/slider/3.webp",
    },
    rating: 4.6,
    students: 300,
    price: 1500000,
    oldPrice: 3000000,
    discount: 50,
  },
  {
    id: 4,
    title: "TypeScript از صفر تا حرفه‌ای",
    href: "/course/ts",
    image: "/slider/4.webp",
    description: "تایپ‌اسکریپت برای پروژه‌های واقعی",
    author: {
      name: "رضا کریمی",
      avatar: "/slider/4.webp",
    },
    rating: 4.9,
    students: 300,
    price: 2200000,
    oldPrice: 5000000,
    discount: 60,
  },
];

export default function LatestCourses() {
  return (
    <section className="container-custom flex flex-col gap-6">
      <SectionHeader
        title="آخرین"
        highlight="دوره های سبزلرن"
        action={
          <Link
            href="/courses?sort_by=updated_at"
            className="flex items-center gap-x-2 text-label sm:text-caption hover:text-brand transition-colors"
          >
            <ArrowLeft className="size-4" />
            همه دوره ها
          </Link>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* add eskelton */}
        {courses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    </section>
  );
}
  // {loading
  //         ? Array.from({ length: 4 }).map((_, i) => (
  //             <CourseCardSkeleton key={i} />
  //           ))
  //         : courses.map((course) => (
  //             <CourseCard key={course.id} {...course} />
  //           ))}
