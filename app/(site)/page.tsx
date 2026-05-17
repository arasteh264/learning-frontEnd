import AnnouncementBar from "@/components/site/announcement-bar";
import Navbar from "@/components/site/layout/navbar/Navbar";

export default function Page() {
  const mockBanner = {
  text: "⏳ فقط تا ۳۱ اردیبهشت! | آخرین فرصت خرید با ۷۰٪ تخفیف و قیمت سال قبل 🔥 | افزایش قیمت دوره‌ها از اول خرداد 🚨 | همین امروز ثبت‌نام کن",
  endDate: "2026-05-21T23:59:59",
};
  return (
    <div>
      <AnnouncementBar text={mockBanner.text} endDate={mockBanner.endDate} />
      <Navbar />
    </div>
  );
}
