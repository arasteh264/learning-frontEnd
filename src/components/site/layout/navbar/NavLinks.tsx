"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { navItems } from "@/src/config/siteMenu";

export default function NavLinks() {
  const [activeCategory, setActiveCategory] = useState(
    navItems[0]?.megaMenu?.[0]
  );

  return (
    <nav className="flex items-center gap-8">
      {navItems.map((item) => (
        <div key={item.href} className="relative group">
          <Link
            href={item.href}
            className="flex items-center gap-1 py-2 text-1xl hover:text-brand transition-colors"
          >
            {item.megaMenu && (
              <ChevronDown
                size={16}
                className="transition-transform group-hover:rotate-180"
              />
            )}
            {item.title}
          </Link>

          {item.megaMenu && (
            <div className="absolute top-full right-0 pt-5 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <div className="flex bg-white border border-gray-100 rounded-2xl shadow-xl p-5 gap-3 min-w-[200px]">
                <div className="w-72 bg-gray-50 rounded-2xl p-5 flex flex-col justify-between items-end">
                  <div className="flex flex-col gap-4">
                    {activeCategory?.courses?.map((course) => (
                      <Link
                        key={course.href}
                        href={course.href}
                        className="text-sm hover:text-brand transition-colors"
                      >
                        {course.title}
                      </Link>
                    ))}
                  </div>

                  <Link
                    href={activeCategory?.href || "#"}
                    className="mt-8 text-sm text-brand hover:text-brand/80 transition-colors"
                  >
                    همه دوره های {activeCategory?.title}
                  </Link>
                </div>

                <div className="w-64 space-y-1">
                  {item.megaMenu.map((category) => {
                    const isActive = activeCategory?.href === category.href;

                    return (
                      <div
                        key={category.href}
                        onMouseEnter={() => setActiveCategory(category)}
                      >
                        <Link
                          href={category.href}
                          className={`flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
                            isActive ? "bg-brand/5" : "hover:bg-gray-50"
                          }`}
                        >
                          <ChevronLeft size={16} className="text-gray-400" />
                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              {category.title}
                            </span>
                            {category.icon && (
                              <category.icon size={18} className="text-brand" />
                            )}
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}