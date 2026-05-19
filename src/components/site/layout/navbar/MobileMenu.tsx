"use client";

import { useState } from "react";
import Link from "next/link";
import { navItems } from "@/src/config/siteMenu";
import { ChevronDown, MoveLeft } from "lucide-react";

export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const coursesMenu = navItems.find((item) => item.megaMenu);

  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  if (!coursesMenu) return null;

  return (
    <>
      {/* overlay */}
      <div
        className={`fixed inset-0 bg-black/40 transition ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* panel */}
      <div
        className={`
          fixed top-0 right-0 h-full w-72 bg-white shadow-xl
          transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* header */}
        <div className="bg-gray-100 py-5 text-center">
          <Link
            href="/auth/login"
            className="text-gray-900 font-bold inline-flex items-center gap-2"
          >
            <MoveLeft className="w-4 h-4" />
            ورود یا ثبت نام
          </Link>
        </div>

        {/* title */}
        <div className="flex flex-col py-4">
          <span className="text-right py-2 px-3 text-green-600">
            دوره های آموزشی
          </span>

          {/* categories only */}
          {coursesMenu.megaMenu?.map((category, index) => {
            const isOpen = activeCategory === index;
            const Icon = category.icon;

            return (
              <div key={category.href} className="border-b border-gray-100">
                {/* category row */}
                <button
                  onClick={() =>
                    setActiveCategory(isOpen ? null : index)
                  }
                  className="w-full flex justify-between items-center py-3 px-3 text-sm font-semibold"
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />

                  <div className="flex items-center gap-2">
                    <span>{category.title}</span>
                                        {Icon && (
                      <Icon className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                </button>

                {/* courses */}
                <div
                  className={`overflow-hidden items-end text-end transition-all duration-300 px-6 ${
                    isOpen ? "max-h-96 py-1" : "max-h-0"
                  }`}
                >
                  {category.courses?.map((course) => (
                    <Link
                      key={course.href}
                      href={course.href}
                      onClick={onClose}
                      className="block text-xs font-bold text-gray-600 py-2"
                    >
                      {course.title}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}