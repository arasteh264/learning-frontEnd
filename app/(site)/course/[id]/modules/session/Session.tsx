import { FileText, VideoOff } from "lucide-react";
import SessionCard from "./sessionCard";
import type { Session } from "@/src/services/course";


type Props = {
  sessions: Session[];
};

export default function Session({ sessions }: Props) {
  return (
    <section className="mt-5 bg-[#fafafa] rounded-xl p-5">
      <div className="flex justify-end items-center gap-2 mb-4">
        <div className="flex flex-col items-end">
          <h2 className="font-bold text-[#1C2B27]">جلسات دوره</h2>
          {sessions.length > 0 && (
            <span className="text-xs text-gray-400">
              {sessions.length.toLocaleString("fa-IR")} جلسه
            </span>
          )}
        </div>
        <FileText className="size-7 md:size-9 text-[#1EB35B]" />
      </div>

      {sessions.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
          <VideoOff className="size-10 text-gray-200" />
          <p className="text-sm text-gray-400">
            این دوره در حال حاضر جلسه‌ای ندارد
          </p>
          <p className="text-xs text-gray-300">
            به‌زودی محتوا اضافه خواهد شد
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {sessions.map((session, index) => (
            <SessionCard key={session.id} session={session} index={index} />
          ))}
        </div>
      )}
    </section>
  );
}