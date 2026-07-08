"use client";

import { Check } from "lucide-react";
import clsx from "clsx";
import { updateSortOptions } from "@/src/config/courseCategory";
import type { SortId } from "./Usecoursesfilter";

interface Props {
  active: SortId;
  onChange: (id: SortId) => void;
}

export default function UpdatesContent({ active, onChange }: Props) {
  return (
    <div className="flex flex-col divide-y divide-zinc-100 overflow-hidden rounded-xl bg-white">
      {updateSortOptions.map((item) => {
        const isActive = active === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onChange(item.id as SortId)}
            className={clsx(
              "flex items-center justify-between px-4 py-4 text-sm transition",
              "hover:bg-zinc-50",
              isActive && "bg-zinc-50 font-medium"
            )}
          >
            <span className="text-xs text-zinc-800">{item.label}</span>
            {isActive && <Check size={16} className="text-emerald-500" />}
          </button>
        );
      })}
    </div>
  );
}