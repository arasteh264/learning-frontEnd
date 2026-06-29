
export const dynamic = "force-dynamic";
import AnnouncementBar from "@/src/components/site/announcement-bar";
import HeroSearchSection from "@/src/components/site/_components/HeroSearchSection";
import SearchBox from "@/src/components/site/search/SearchBox";
import HeroSlider from "@/src/components/site/slider/HeroSlider";
import CourseFeatures from "@/src/components/site/_components/CourseFeatures";
import LatestCourses from "@/src/components/site/_components/latestCourses";
import CourseCategory from "@/src/components/site/_components/courseCategory";
import LatestCoursesSlider from "@/src/components/site/_components/LatestCoursesSlider";
import SocialBanners from "@/src/components/site/_components/SocialBanners";
import LatestArticles from "@/src/components/site/_components/LatestArticles";
import CommentsSlider from "@/src/components/site/_components/CommentsSlider";
import PopularFreeCourses from "@/src/components/site/_components/freePopularCourses";

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
