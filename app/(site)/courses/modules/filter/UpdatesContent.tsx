"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import clsx from "clsx";
import { updateSortOptions } from "@/src/config/courseCategory";

export default function UpdatesContent() {
  const [active, setActive] = useState("latest");

  return (
    <div className=" space-y-4">


      <div className="flex flex-col divide-y divide-gray-200 rounded-xl  bg-white overflow-hidden">

        {updateSortOptions.map((item) => {
          const isActive = active === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={clsx(
                "flex items-center justify-between px-4 py-5 text-sm transition",
                "hover:bg-gray-50",
                isActive && "bg-gray-100 font-medium"
              )}
            >
              <span className="text-gray-800 text-xs">
                {item.label}
              </span>

              {isActive && (
                <Check size={16} className="text-green-500" />
              )}
            </button>
          );
        })}

      </div>
    </div>
  );
}