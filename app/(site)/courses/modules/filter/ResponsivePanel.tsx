"use client";

import { Drawer } from "antd";
import { X } from "lucide-react";
import { PanelType } from "./useResponsivePanel";
import FilterContent from "./FilterContent";
import UpdatesContent from "./UpdatesContent";
import type { SortId } from "./Usecoursesfilter";

interface FilterProps {
  selectedCategories: string[];
  onToggleCategory: (id: string) => void;
  onlyFree: boolean;
  onFreeChange: (value: boolean) => void;
  onlyPreSale: boolean;
  onPreSaleChange: (value: boolean) => void;
  onApply: () => void;
  onClear: () => void;
  resultCount: number;
}

interface SortProps {
  active: SortId;
  onChange: (id: SortId) => void;
}

interface Props {
  open: boolean;
  type: PanelType;
  onClose: () => void;
  filterProps: FilterProps;
  sortProps: SortProps;
}

export default function ResponsivePanel({
  open,
  type,
  onClose,
  filterProps,
  sortProps,
}: Props) {
  const isFilter = type === "filter";
  const isUpdates = type === "updates";

  return (
    <Drawer
      open={open}
      onClose={onClose}
      placement={isMobile() ? "bottom" : "right"}
      height={isMobile() ? (isFilter ? "100dvh" : "45vh") : "100%"}
      width={420}
      closeIcon={false}
      styles={{
        body: {
          padding: 0,
          overflow: "hidden",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <div className="flex items-center justify-between border-b border-zinc-100 bg-zinc-50 px-4 py-3">
        <div className="text-sm font-semibold text-zinc-800">
          {isFilter && "فیلتر نتایج"}
          {isUpdates && "مرتب‌سازی بر اساس"}
        </div>

        <button
          onClick={onClose}
          className="rounded-full p-2 transition hover:bg-zinc-100"
        >
          <X size={18} />
        </button>
      </div>

      <div className="h-full overflow-y-auto">
        {isFilter && <FilterContent {...filterProps} />}
        {isUpdates && <UpdatesContent {...sortProps} />}
      </div>
    </Drawer>
  );
}

function isMobile() {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
}