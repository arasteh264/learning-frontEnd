"use client";

import { ChevronRight, ChevronLeft } from "lucide-react";
import clsx from "clsx";

interface Props {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null;

  const pages = getPageList(page, totalPages);

  return (
    <div dir="rtl" className="flex items-center justify-center gap-1.5 py-10">
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        aria-label="صفحه قبل"
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 transition hover:bg-zinc-50 disabled:opacity-30"
      >
        <ChevronRight size={16} />
      </button>

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`dots-${i}`} className="px-1 text-xs text-zinc-400">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p as number)}
            className={clsx(
              "h-9 min-w-9 rounded-xl px-2 text-xs font-medium transition",
              p === page
                ? "bg-zinc-900 text-white"
                : "border border-zinc-200 text-zinc-600 hover:bg-zinc-50"
            )}
          >
            {(p as number).toLocaleString("fa-IR")}
          </button>
        )
      )}

      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        aria-label="صفحه بعد"
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 transition hover:bg-zinc-50 disabled:opacity-30"
      >
        <ChevronLeft size={16} />
      </button>
    </div>
  );
}

function getPageList(current: number, total: number): (number | "...")[] {
  const delta = 1;
  const range: (number | "...")[] = [];
  const left = Math.max(2, current - delta);
  const right = Math.min(total - 1, current + delta);

  range.push(1);
  if (left > 2) range.push("...");
  for (let i = left; i <= right; i++) range.push(i);
  if (right < total - 1) range.push("...");
  if (total > 1) range.push(total);

  return range;
}