"use client";

import { categories } from "@/src/config/courseCategory";
import { Button, Switch } from "antd";
import { useState } from "react";

export default function FilterContent() {
  const [filters, setFilters] = useState({
    myCourses: false,
    preSale: false,
    free: false,
  });

  return (
    <div className="h-full flex flex-col pt-5">

      {/* HEADER */}
      <h2 className="text-lg font-bold shrink-0 px-5">
        دسته بندی ها
      </h2>

      {/* CATEGORIES */}
      <div className="flex-1 min-h-0 overflow-y-auto mt-4 space-y-3 pr-2">
        {categories.map((item) => (
          <label
            key={item.id}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            <input
              type="checkbox"
              value={item.id}
              className="accent-black"
            />

            <span className="text-sm text-gray-700">
              {item.label}
            </span>
          </label>
        ))}
      </div>

      <div className="flex items-center justify-between py-4 px-4 bg-white border-t border-gray-200">
        <span className="text-sm text-gray-700">
          دوره‌های من
        </span>

        <Switch
          checked={filters.myCourses}
          onChange={(checked) =>
            setFilters((prev) => ({
              ...prev,
              myCourses: checked,
            }))
          }
        />
      </div>

      <div className="flex items-center justify-between py-4 px-4 bg-white border-t border-gray-200">
        <span className="text-sm text-gray-700">
          دوره‌های پیش فروش
        </span>

        <Switch
          checked={filters.preSale}
          onChange={(checked) =>
            setFilters((prev) => ({
              ...prev,
              preSale: checked,
            }))
          }
        />
      </div>

      <div className="flex items-center justify-between py-4 px-4 bg-white border-t border-gray-200">
        <span className="text-sm text-gray-700">
          فقط دوره‌های رایگان
        </span>

        <Switch
          checked={filters.free}
          onChange={(checked) =>
            setFilters((prev) => ({
              ...prev,
              free: checked,
            }))
          }
        />
      </div>

      <div className="flex items-center justify-center gap-10 bg-white mt-25 py-5 border-t border-gray-200">
        <Button
          size="medium"
          className="!border-none !bg-[#242424] !text-white"
        >
          مشاهده نتایج
        </Button>

        <Button
          size="medium"
          className="!border-none"
          onClick={() =>
            setFilters({
              myCourses: false,
              preSale: false,
              free: false,
            })
          }
        >
          حذف فیلتر
        </Button>
      </div>

    </div>
  );
}