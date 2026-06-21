import { FileText } from "lucide-react";
import SessionCard from "./sessionCard";
import type { CourseSession } from "@/src/services/course";

type Props = {
  sessions: CourseSession[];
};

export default function Session({ sessions }: Props) {
  if (!sessions?.length) return null;

  const totalLessons = sessions.reduce(
    (sum, s) => sum + (s.children?.length || 0),
    0
  );

  return (
    <section className="py-5 mt-5 bg-[#fafafa] rounded-xl p-5">
      <div className="flex justify-end items-center gap-2 mb-4">
        <div className="flex flex-col items-end">
          <h2 className="font-bold text-[#1C2B27]">جلسات</h2>
          <span className="text-xs text-gray-400">
            {sessions.length.toLocaleString("fa-IR")} جلسه ·{" "}
            {totalLessons.toLocaleString("fa-IR")} بخش
          </span>
        </div>
        <FileText className="size-7 md:size-9 text-[#1EB35B]" />
      </div>

      <div className="space-y-3">
        {sessions.map((session, index) => (
          <SessionCard key={session.id} session={session} index={index} />
        ))}
      </div>
    </section>
  );
}