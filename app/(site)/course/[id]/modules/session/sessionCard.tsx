"use client";

import { useState } from "react";
import { ChevronDown, PlayCircle, FileEdit } from "lucide-react";
import { Session } from "@/src/services/course";

type Props = {
  session: Session;
  index: number;
};

export default function SessionCard({ session, index }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between gap-3 p-4 text-right"
      >
        <ChevronDown
          className={`size-5 text-gray-400 shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />

        <div className="flex items-center gap-3 flex-1 min-w-0 justify-end">
          <div className="flex flex-col items-end min-w-0">
            <span className="text-sm font-medium text-[#1C2B27] truncate">
              {session.title}
            </span>
            <span className="text-xs text-gray-400">
              {session.children?.length || 0} بخش · {session.duration}
            </span>
          </div>

          {session.isFree && (
            <span className="shrink-0 text-[10px] font-medium text-[#1EB35B] bg-[#1EB35B]/10 px-2 py-1 rounded-full">
              رایگان
            </span>
          )}

          <span className="shrink-0 size-8 rounded-full bg-[#fafafa] flex items-center justify-center text-xs font-medium text-gray-400">
            {(index + 1).toLocaleString("fa-IR")}
          </span>
        </div>
      </button>

      {open && session.children?.length > 0 && (
        <div className="px-4 pb-4 space-y-1 border-t border-gray-50">
          {session.children.map((child ) => (
            <div
              key={child.id}
              className="flex items-center justify-between text-xs text-gray-600 py-2.5 px-2 rounded-lg hover:bg-[#fafafa] transition-colors"
            >
              <span className="text-gray-400">{child.duration}</span>
              <div className="flex items-center gap-2">
                <span>{child.title}</span>
                {child.title.includes("تمرین") ? (
                  <FileEdit className="size-4 text-gray-300" />
                ) : (
                  <PlayCircle className="size-4 text-gray-300" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}