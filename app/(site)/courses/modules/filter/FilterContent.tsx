"use client";

import { categories } from "@/src/config/courseCategory";
import { Button, Switch } from "antd";

interface Props {
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

export default function FilterContent({
  selectedCategories,
  onToggleCategory,
  onlyFree,
  onFreeChange,
  onlyPreSale,
  onPreSaleChange,
  onApply,
  onClear,
  resultCount,
}: Props) {
  return (
    <div className="flex h-full flex-col pt-5">
      <h2 className="shrink-0 px-5 text-lg font-bold">دسته‌بندی‌ها</h2>

      <div className="mt-4 min-h-0 flex-1 space-y-1 overflow-y-auto px-3">
        {categories.map((item:any) => {
          const checked = selectedCategories.includes(item.id as string);

          return (
            <label
              key={item.id}
              className="flex cursor-pointer items-center gap-2 rounded-xl p-2.5 transition hover:bg-zinc-50"
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggleCategory(item.id as string)}
                className="h-4 w-4 accent-zinc-900"
              />
              <span className="text-sm text-zinc-700">{item.label}</span>
            </label>
          );
        })}
      </div>

      {/* سوییچ‌ها */}
      <div className="flex items-center justify-between border-t border-zinc-100 bg-white px-4 py-4">
        <span className="text-sm text-zinc-700">فقط دوره‌های رایگان</span>
        <Switch checked={onlyFree} onChange={onFreeChange} />
      </div>

      <div className="flex items-center justify-between border-t border-zinc-100 bg-white px-4 py-4">
        <span className="text-sm text-zinc-700">دوره‌های پیش‌فروش</span>
        <Switch checked={onlyPreSale} onChange={onPreSaleChange} />
      </div>

      {/* اکشن‌ها */}
      <div className="flex items-center justify-center gap-3 border-t border-zinc-100 bg-white py-5">
        <Button
          size="large"
          className="!rounded-xl !border-none !bg-zinc-900 !px-8 !text-white"
          onClick={onApply}
        >
          مشاهده {resultCount.toLocaleString("fa-IR")} نتیجه
        </Button>

        <Button
          size="large"
          className="!rounded-xl !border-none"
          onClick={onClear}
        >
          حذف فیلتر
        </Button>
      </div>
    </div>
  );
}