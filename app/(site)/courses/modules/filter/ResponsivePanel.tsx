"use client";

import { Drawer } from "antd";
import { X } from "lucide-react";
import { PanelType } from "./useResponsivePanel";
import FilterContent from "./FilterContent";
import UpdatesContent from "./UpdatesContent";

interface Props {
  open: boolean;
  type: PanelType;
  onClose: () => void;
}

export default function ResponsivePanel({ open, type, onClose }: Props) {
  const isFilter = type === "filter";
  const isUpdates = type === "updates";

  return (
    <Drawer
      open={open}
      onClose={onClose}
      placement={isMobile() ? "bottom" : "right"}
      height={isMobile() ? (isFilter ? "100dvh" : "35vh") : "100%"}
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
      <div className="container-custom flex items-center justify-between px-4 py-3 bg-gray-100">
        <div className="text-sm font-semibold text-gray-800">
          {isFilter && "فیلتر نتایج"}
          {isUpdates && "مرتب سازی بر اساس"}
        </div>

        <button
          onClick={onClose}
          className="
     
      p-2
      rounded-full
      hover:bg-gray-100
      transition
    "
        >
          <X size={18} />
        </button>
      </div>
      <div className="h-full overflow-y-auto">
        {isFilter && <FilterContent />}
        {isUpdates && <UpdatesContent />}
      </div>
    </Drawer>
  );
}

function isMobile() {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
}
