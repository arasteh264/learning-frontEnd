"use client";

import Link from "next/link";
import { navItems } from "@/src/config/siteMenu";

export default function NavLinks() {
  return (
    <nav className="flex items-center gap-6">
      {navItems.map((item) => (
        <div key={item.href} className="relative group">
          
          <Link
            href={item.href}
            className="text-sm hover:text-green-600 py-2 block"
          >
            {item.title}
          </Link>

          {item.children?.length > 0 && (
            <div className="absolute top-full right-0 pt-2 z-50">
              
              <div
                className="
                  bg-white shadow-lg rounded-xl
                  min-w-[200px] border
                  opacity-0 invisible
                  group-hover:opacity-100 group-hover:visible
                  transition
                "
              >
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="block px-3 py-2 text-sm hover:bg-gray-100"
                  >
                    {child.title}
                  </Link>
                ))}
              </div>

            </div>
          )}
        </div>
      ))}
    </nav>
  );
}