"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { navItems } from "@/src/config/siteMenu";

export default function NavLinks() {
  const [activeCategory, setActiveCategory] = useState(
    navItems[0]?.megaMenu?.[0],
  );

  return (
    <nav className="flex items-center gap-8">
      {navItems.map((item) => (
        <div key={item.href} className="relative group">
          {/* main nav item */}

          <Link
            href={item.href}
            className="
              flex items-center gap-1
              py-2 text-sm
              hover:text-green-600
              transition
            "
          >
                        {item.megaMenu && (
              <ChevronDown
                size={16}
                className="transition group-hover:rotate-180"
              />
            )}
            {item.title}


          </Link>

          {/* mega menu */}
          {item.megaMenu && (
            <div
              className="
                absolute top-full right-0 pt-5 z-50

                opacity-0 invisible
                group-hover:opacity-100
                group-hover:visible

                transition-all
              "
            >
              <div
                className="
                  flex
                  bg-white
                  border
                  rounded-2xl
                  shadow-xl
                  p-5
                  gap-3
                  min-w-[560px]
                "
              >
                {/* left courses panel */}
                <div
                  className="
                    w-72
                    bg-gray-50
                    rounded-2xl
                    p-5
                    flex flex-col justify-between items-end
                  "
                >
                  <div className="flex flex-col gap-4">
                    {activeCategory?.courses?.map((course) => (
                      <Link
                        key={course.href}
                        href={course.href}
                        className="
                          text-sm
                          hover:text-green-600
                          transition
                        "
                      >
                        {course.title}
                      </Link>
                    ))}
                  </div>

                  <Link
                    href={activeCategory?.href || "#"}
                    className="
                      mt-8
                      text-sm
                      text-sky-500
                      hover:text-sky-600
                    "
                  >
                    همه دوره های {activeCategory?.title}
                  </Link>
                </div>

                {/* right categories */}
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
                          className={`
                            flex items-center justify-between
                            px-4 py-3 rounded-xl
                            transition
                            ${isActive ? "bg-gray-100" : "hover:bg-gray-50"}
                          `}
                        >
                          <ChevronLeft size={16} />
                          <div className="flex items-center gap-2">
          

                            <span className="font-medium">
                              {category.title}
                            </span>
                                              {category.icon && (
                              <category.icon
                                size={18}
                                className="text-green-600"
                              />
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
