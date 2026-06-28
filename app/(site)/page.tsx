
import AnnouncementBar from "@/src/components/site/announcement-bar";
import HeroSearchSection from "@/src/components/site/_components/HeroSearchSection";
import SearchBox from "@/src/components/site/search/SearchBox";
import HeroSlider from "@/src/components/site/slider/HeroSlider";
import CourseFeatures from "@/src/components/site/_components/CourseFeatures";
import dynamic from "next/dynamic";
import SocialBanners from "@/src/components/site/_components/SocialBanners";
// import LatestCourses from "@/src/components/site/_components/latestCourses";
// import CourseCategory from "@/src/components/site/_components/courseCategory";
// import LatestCoursesSlider from "@/src/components/site/_components/LatestCoursesSlider";
// import SocialBanners from "@/src/components/site/_components/SocialBanners";
// import LatestArticles from "@/src/components/site/_components/LatestArticles";
// import CommentsSlider from "@/src/components/site/_components/CommentsSlider";
// import PopularFreeCourses from "@/src/components/site/_components/freePopularCourses";
const LatestCourses = dynamic(() => import("@/src/components/site/_components/latestCourses"), { ssr: false });
const CourseCategory = dynamic(() => import("@/src/components/site/_components/courseCategory"), { ssr: false });
const LatestCoursesSlider = dynamic(() => import("@/src/components/site/_components/LatestCoursesSlider"), { ssr: false });
const PopularFreeCourses = dynamic(() => import("@/src/components/site/_components/freePopularCourses"), { ssr: false });
const LatestArticles = dynamic(() => import("@/src/components/site/_components/LatestArticles"), { ssr: false });
const CommentsSlider = dynamic(() => import("@/src/components/site/_components/CommentsSlider"), { ssr: false });
export default function Page() {




  return (
    <main>
      <AnnouncementBar />
      
      <HeroSlider />
      <HeroSearchSection />
        <SearchBox />
      <CourseFeatures />
      <LatestCourses />
      <CourseCategory />
      <LatestCoursesSlider />
      <SocialBanners
        items={[
          {
            href: "https://t.me/sabzlearn",
            image: "/images/telegram-logo-4.png",
            alt: "کانال تلگرام سبزلرن",
            ariaLabel: "کانال تلگرام سبزلرن",
            title: "کانال تلگرام سبزلرن",
            subtitle: "به‌روزترین نکات آموزشی",
            titleColor: "#229ED9",
          },
          {
            href: "https://www.instagram.com/sabzlearn_",
            image: "/images/instagram.png",
            alt: "پیج اینستاگرام سبزلرن",
            ariaLabel: "پیج اینستاگرام سبزلرن",
            title: "صفحه اینستاگرام سبزلرن",
            subtitle: "به‌روزترین نکات آموزشی",
            titleColor: "#E1306C",
          },
        ]}
      />
      <LatestArticles/>
      <CommentsSlider/>
      <PopularFreeCourses/>
    </main>
  );
}
