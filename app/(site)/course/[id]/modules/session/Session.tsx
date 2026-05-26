import { FileText } from "lucide-react";
import SessionCard from "./sessionCard";

export const courseSessionsMock = [
{
  id: 1,
  title: "جلسه ۱: مقدمه",
  duration: "12 دقیقه",
  isFree: true,
  children: [
    { id: 11, title: "ویدیو ۱", duration: "5 دقیقه" },
    { id: 12, title: "تمرین", duration: "7 دقیقه" },
  ]
},
{
  id: 2,
  title: "جلسه ۱: مقدمه",
  duration: "12 دقیقه",
  isFree: true,
  children: [
    { id: 13, title: "ویدیو ۱", duration: "5 دقیقه" },
    { id: 14, title: "تمرین", duration: "7 دقیقه" },
  ]
},
{
  id: 3,
  title: "جلسه ۱: مقدمه",
  duration: "12 دقیقه",
  isFree: true,
  children: [
    { id: 15, title: "ویدیو ۱", duration: "5 دقیقه" },
    { id: 16, title: "تمرین", duration: "7 دقیقه" },
  ]
},
{
  id: 4,
  title: "جلسه ۱: مقدمه",
  duration: "12 دقیقه",
  isFree: true,
  children: [
    { id: 17, title: "ویدیو ۱", duration: "5 دقیقه" },
    { id: 18, title: "تمرین", duration: "7 دقیقه" },
  ]
},
];

export default function Session() {
  return (
    <section className="py-5 mt-5 bg-[#fafafa] rounded-xl p-5">
      
      <div className="flex justify-end items-center gap-1 mb-4">
        <h1>جلسات</h1>
        <FileText className="size-7 md:size-9 text-[#1EB35B]" />
      </div>

      <div className="space-y-3">
        {courseSessionsMock.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
      </div>

    </section>
  );
}