import AnnouncementBar from "@/src/components/site/announcement-bar";
import HeroSearchSection from "@/src/components/site/_components/HeroSearchSection";
import Navbar from "@/src/components/site/layout/navbar/Navbar";
import SearchBox from "@/src/components/site/search/SearchBox";
import HeroSlider from "@/src/components/site/slider/HeroSlider";
import CourseFeatures from "@/src/components/site/_components/CourseFeatures";
import LatestCourses from "@/src/components/site/_components/latestCourses";
import CourseCategory from "@/src/components/site/_components/courseCategory";
import LatestCoursesSlider from "@/src/components/site/_components/LatestCoursesSlider/LatestCoursesSlider";
import SocialBanners from "@/src/components/site/_components/SocialBanners";
import LatestArticles from "@/src/components/site/_components/LatestArticles";
export default function Page() {
  const mockBanner = {
    text: "⏳ فقط تا ۳۱ اردیبهشت! | آخرین فرصت خرید با ۷۰٪ تخفیف و قیمت سال قبل 🔥 | افزایش قیمت دوره‌ها از اول خرداد 🚨 | همین امروز ثبت‌نام کن",
    endDate: "2026-05-21T23:59:59",
  };
  return (
    <main>
      <AnnouncementBar text={mockBanner.text} endDate={mockBanner.endDate} />
      <Navbar />
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
    </main>
  );
}
