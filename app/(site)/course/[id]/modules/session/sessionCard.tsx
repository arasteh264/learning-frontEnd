"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function SessionCard({ session }: any) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white p-4 rounded-xl">

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setOpen((p) => !p)}
          className="text-gray-500"
        >
          <ChevronDown
            className={`size-5 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
        <div className="flex flex-col">
          <span className="text-sm font-medium">{session.title}</span>

          <span className="text-xs text-gray-500">
          </span>
        </div>



      </div>

      {open && session.children?.length > 0 && (
        <div className="mt-3 space-y-2 border-t pt-3">
          {session.children.map((child: any) => (
            <div
              key={child.id}
              className="flex items-center justify-between text-xs text-gray-600"
            >
              <span>{child.title}</span>
              <span>{child.duration}</span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}