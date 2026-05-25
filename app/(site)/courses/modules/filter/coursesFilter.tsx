"use client";

import { Button } from "antd";
import { SlidersHorizontal, Sparkles } from "lucide-react";

interface Props {
  open: (type: "filter" | "updates") => void;
  latestUpdateLabel?: string;
}

export default function CoursesFilter({
  open,
  latestUpdateLabel = "جدیدترین آپدیت",
}: Props) {
  return (
    <div className="flex items-center gap-3 overflow-x-auto py-7 justify-center">
      {/* Updates */}
      <Button
        onClick={() => open("updates")}
        size="small"
        className="
          !h-11
          !rounded-2xl
          !border
          !border-zinc-200
          !bg-white
          hover:!bg-zinc-50
          !shadow-none
        "
      >
        <div className="flex items-center gap-2">
          <Sparkles size={15} className="text-orange-500" />

          <span className="font-medium text-xs">{latestUpdateLabel}</span>
        </div>
      </Button>

      {/* Filter */}
      <Button
        onClick={() => open("filter")}
        size="small"
        className="
          !h-11
          !rounded-2xl
          !border-0
          !bg-zinc-900
          hover:!bg-zinc-800
          !text-white
          !shadow-none
        "
      >
        <div className="flex items-center gap-2 px-5">
          <SlidersHorizontal size={15} />

          <span className="font-medium text-xs">فیلتر</span>
        </div>
      </Button>
    </div>
  );
}
