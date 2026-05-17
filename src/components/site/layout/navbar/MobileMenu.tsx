"use client";

import { useState } from "react";
import Link from "next/link";
import { navItems } from "@/config/siteMenu";

export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      {/* overlay */}
      <div
        className={`fixed inset-0 bg-black/40 transition ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* drawer */}
      <div
        className={`
          fixed top-0 right-0 h-full w-72 bg-white shadow-xl
          transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="p-4 font-bold border-b">منو</div>

        <div className="p-4 flex flex-col gap-2">
          {navItems.map((item, index) => (
            <div key={item.href}>
              
              {/* main item */}
              <div
                className="flex justify-between items-center py-2 cursor-pointer"
                onClick={() =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
              >
                <Link href={item.href} onClick={onClose}>
                  {item.title}
                </Link>

                {item.children && (
                  <span className="text-xs">▼</span>
                )}
              </div>

              {/* sub menu */}
              {item.children && activeIndex === index && (
                <div className="pr-3 flex flex-col gap-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={onClose}
                      className="text-sm text-gray-600 py-1"
                    >
                      {child.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <hr />

          <Link href="/auth/login" onClick={onClose}>
            ورود
          </Link>

          <Link
            href="/auth/register"
            onClick={onClose}
            className="text-green-600 font-medium"
          >
            ثبت نام
          </Link>
        </div>
      </div>
    </>
  );
}