"use client";

import { useState } from "react";
import Link from "next/link";
import { navItems } from "@/src/config/siteMenu";
import { ArrowLeft, ChevronDown, MoveLeft } from "lucide-react";

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
      <div
        className={`fixed inset-0 bg-black/40 transition ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div
        className={`
          fixed top-0 right-0 h-full w-72 bg-white shadow-xl 
          transition-transform duration-300
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="bg-gray-100 py-5 text-center">
          <Link
            href="/auth/login"
            className=" text-gray-900 font-bold text-1xl inline-flex items-center gap-2"
          >
            <MoveLeft className="w-4 h-4" />
            ورود یا ثبت نام
          </Link>
        </div>

        <div className=" flex flex-col py-4">
          <span className="text-right py-2 px-3 text-green-600">
            دسته بندی ها
          </span>
          
          {navItems.map((item, index) => (
            <div key={item.href}>
              <div className="flex justify-between items-center py-3 px-3 text-sm font-semibold">
                {item.children && (
                  <button
                    onClick={() =>
                      setActiveIndex(activeIndex === index ? null : index)
                    }
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-400 ${
                        activeIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                )}
                <Link href={item.href} onClick={onClose}>
                  {item.title}
                </Link>
              </div>

              {/* sub menu */}
              {item.children && activeIndex === index && (
                <div
                  className={`pr-3 flex flex-col gap-2 px-3 text-right overflow-hidden transition-all duration-400 ease-in-out
  ${activeIndex === index ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"}`}
                >
                  {item.children?.map((child) => (
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
        </div>
      </div>
    </>
  );
}
//  <div className="pr-3 flex flex-col gap-2 px-3 text-right ">
//               {item.children.map((child) => (
//                 <Link
//                   key={child.href}
//                   href={child.href}
//                   onClick={onClose}
//                   className="text-sm text-gray-600 py-1"
//                 >
//                   {child.title}
//                 </Link>
//               ))}
//             </div>
//                     <div
//             className="flex justify-between items-center py-3 cursor-pointer px-3 text-sm font-semibold "
//             onClick={() =>
//               setActiveIndex(activeIndex === index ? null : index)
//             }
//           >
//              {item.children && (
//               <ChevronDown
//                 className={`w-4 h-4 transition-transform duration-300 ${
//                   activeIndex === index ? "rotate-180" : ""
//                 }`}
//               />
//             )}
//             <Link href={item.href} onClick={onClose}>
//               {item.title}
//             </Link>

//           </div>
