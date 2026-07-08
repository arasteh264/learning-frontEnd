"use client";

import { Button } from "antd";
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";

interface Props {
  open: (type: "filter" | "updates") => void;
  search: string;
  onSearchChange: (value: string) => void;
  activeFilterCount: number;
  latestUpdateLabel?: string;
}

export default function CoursesFilter({
  open,
  search,
  onSearchChange,
  activeFilterCount,
  latestUpdateLabel = "جدیدترین آپدیت",
}: Props) {
  return (
    <div className="flex flex-col gap-3 py-7 sm:flex-row sm:items-center">
      {/* جستجو */}
      <div className="relative flex-1">
        <Search
          size={16}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400"
        />
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="جستجو در دوره‌ها..."
          className="h-11 w-full rounded-2xl border border-zinc-200 bg-white pr-11 pl-4 text-sm outline-none transition focus:border-zinc-400"
        />
      </div>

      <div className="flex items-center gap-3 overflow-x-auto">
        <Button
          onClick={() => open("updates")}
          size="small"
          className="!h-11 !shrink-0 !rounded-2xl !border !border-zinc-200 !bg-white !shadow-none hover:!bg-zinc-50"
        >
          <div className="flex items-center gap-2 px-1">
            <Sparkles size={15} className="text-orange-500" />
            <span className="text-xs font-medium">{latestUpdateLabel}</span>
          </div>
        </Button>

        <Button
          onClick={() => open("filter")}
          size="small"
          className="!h-11 !shrink-0 !rounded-2xl !border-0 !bg-zinc-900 !text-white !shadow-none hover:!bg-zinc-800"
        >
          <div className="flex items-center gap-2 px-5">
            <SlidersHorizontal size={15} />
            <span className="text-xs font-medium">فیلتر</span>
            {activeFilterCount > 0 && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold">
                {activeFilterCount.toLocaleString("fa-IR")}
              </span>
            )}
          </div>
        </Button>
      </div>
    </div>
  );
}