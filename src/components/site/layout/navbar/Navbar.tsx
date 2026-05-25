"use client";

import { useState } from "react";
import Link from "next/link";
import { MenuOutlined, ShoppingCartOutlined } from "@ant-design/icons";

import NavLinks from "./NavLinks";
import UserActions from "./UserActions";
import MobileMenu from "./MobileMenu";
import { AlignRight, ShoppingBag } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
<header className="w-full border-b border-b-gray-200 bg-white flex justify-center mb-7">
  <div className="container-custom w-full flex justify-center py-2  ">
        <div className="hidden  md:flex w-full justify-between items-center gap-4 py-3 ">
          <div className="flex items-center gap-3">
            <UserActions />
            <Link
              href="/cart"
              className="
              relative flex items-center justify-center
              w-10 h-10 rounded-xl
               hover:bg-gray-100
              transition
            "
            >
              <ShoppingCartOutlined className="text-xl" />

              <span
                className="
                absolute -top-1 -left-1
                bg-green-600 text-white
                text-[10px]
                min-w-5 h-5
                flex items-center justify-center
                rounded-full px-1
              "
              >
                2
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-8">
            <nav className="hidden md:flex items-center gap-6">
              <NavLinks />
            </nav>
            <Link href="/" className="font-bold text-lg">
              SABZLEARN
            </Link>
          </div>
        </div>

        <div className="md:hidden w-full flex justify-between items-center ">
          <nav className="hidden md:flex items-center gap-6">
            <NavLinks />
          </nav>

          <Link
            href="/cart"
            className="
              relative flex items-center justify-center
              w-10 h-10 rounded-xl
               hover:bg-gray-100
              transition
            "
          >
            <ShoppingBag className="w-6 h-6" />

            <span
              className="
                absolute -top-1 -left-1
                bg-green-600 text-white
                text-[10px]
                min-w-5 h-5
                flex items-center justify-center
                rounded-full px-1
              "
            >
              2
            </span>
          </Link>
          <Link href="/" className="font-bold text-lg">
            SABZLEARN
          </Link>
          <button onClick={() => setOpen(true)} className="md:hidden text-xl">
            <AlignRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
