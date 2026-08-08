"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
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
  const [mounted, setMounted] = useState(false);

  // Portal target only exists on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll while the drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!coursesMenu || !mounted) return null;

  return createPortal(
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="منوی دوره‌ها"
        className={`fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-white shadow-xl transition-transform duration-300 z-50 overflow-y-auto ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="bg-brand/5 py-5 text-center">
          <Link
            href="/auth/login"
            onClick={onClose}
            className="text-[#1E1B4B] font-bold inline-flex items-center gap-2"
          >
            <MoveLeft className="w-4 h-4" />
            ورود یا ثبت نام
          </Link>
        </div>

        <div className="flex flex-col py-4">
          <span className="text-right py-2 px-3 text-brand text-sm font-medium">
            دوره های آموزشی
          </span>

          {coursesMenu.megaMenu?.map((category, index) => {
            const isOpen = activeCategory === index;
            const Icon = category.icon;

            return (
              <div key={category.href} className="border-b border-gray-100">
                <button
                  onClick={() => setActiveCategory(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="w-full flex justify-between items-center py-3 px-3 text-sm font-semibold"
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />

                  <div className="flex items-center gap-2">
                    <span>{category.title}</span>
                    {Icon && <Icon className="w-4 h-4 text-brand" />}
                  </div>
                </button>

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
                      className="block text-xs font-bold text-gray-600 py-2 hover:text-brand transition-colors"
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
    </>,
    document.body
  );
}