"use client";

import { useState } from "react";
import { PlayCircle, Clock, Lock, Unlock, X } from "lucide-react";
import type { Session } from "@/src/services/course";



type Props = {
  session: Session;
  index: number;
};


export default function SessionCard({ session, index }: Props) {
  const [playerOpen, setPlayerOpen] = useState(false);

  return (
    <>
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between gap-3 p-4">

          <div className="shrink-0">
            {session.free ? (
              <button
                type="button"
                onClick={() => session.video && setPlayerOpen(true)}
                className="size-9 rounded-full bg-[#1EB35B]/10 flex items-center justify-center text-[#1EB35B] hover:bg-[#1EB35B]/20 transition-colors"
                aria-label="پخش ویدیو"
              >
                <PlayCircle className="size-5" />
              </button>
            ) : (
              <div className="size-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-300">
                <Lock className="size-4" />
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 flex-1 min-w-0 justify-end">
            <div className="flex flex-col items-end min-w-0">
              <span className="text-sm font-medium text-[#1C2B27] truncate">
                {session.title}
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs text-gray-400">{session.time}</span>
                <Clock className="size-3 text-gray-300" />
              </div>
            </div>

            {session.free ? (
              <span className="shrink-0 text-[10px] font-medium text-[#1EB35B] bg-[#1EB35B]/10 px-2 py-1 rounded-full flex items-center gap-1">
                <Unlock className="size-3" />
                رایگان
              </span>
            ) : (
              <span className="shrink-0 text-[10px] font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                پولی
              </span>
            )}

            <span className="shrink-0 size-8 rounded-full bg-[#fafafa] border border-gray-100 flex items-center justify-center text-xs font-medium text-gray-400">
              {(index + 1).toLocaleString("fa-IR")}
            </span>
          </div>
        </div>
      </div>

      {playerOpen && session.video && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setPlayerOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl bg-black rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPlayerOpen(false)}
              className="absolute top-3 left-3 z-10 size-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="بستن"
            >
              <X className="size-4" />
            </button>
            <div className="p-4 text-right border-b border-white/10">
              <span className="text-white text-sm font-medium">
                {session.title}
              </span>
            </div>
            <video
              src={session.video}
              controls
              autoPlay
              className="w-full aspect-video"
              controlsList="nodownload"
            />
          </div>
        </div>
      )}
    </>
  );
}