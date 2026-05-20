import AnnouncementBar from "@/src/components/site/announcement-bar";
import HeroSearchSection from "@/src/components/site/_components/HeroSearchSection";
import Navbar from "@/src/components/site/layout/navbar/Navbar";
import SearchBox from "@/src/components/site/search/SearchBox";
import HeroSlider from "@/src/components/site/slider/HeroSlider";
import CourseFeatures from "@/src/components/site/_components/CourseFeatures";
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
      <CourseFeatures/>
    </main>
  );
}
