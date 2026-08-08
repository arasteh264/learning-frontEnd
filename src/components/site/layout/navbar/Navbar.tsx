"use client";

import { useState } from "react";
import Link from "next/link";
import NavLinks from "./NavLinks";
import UserActions from "./UserActions";
import MobileMenu from "./MobileMenu";
import { AlignRight } from "lucide-react";
import CartIcon from "@/app/(site)/cart/CartIcon";
import Logo from "@/src/components/base/logo";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-b-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 flex justify-center">
      <div className="container-custom w-full flex justify-center py-2">
        {/* desktop */}
        <div className="hidden md:flex w-full justify-between items-center gap-4 py-3">
          <div className="flex items-center gap-3">
            <UserActions />
            <CartIcon />
          
          </div>
          <div className="flex items-center gap-8">
            <nav className="flex items-center gap-6">
              <NavLinks />
            </nav>
            <Link href="/" aria-label="صفحه اصلی">
              <Logo />
            </Link>
          </div>
        </div>

        <div className="md:hidden w-full flex justify-between items-center">
          <div className="flex items-center gap-1">
       
            <CartIcon />
          </div>

          <Link href="/" aria-label="صفحه اصلی" className="shrink-0">
            <Logo />
          </Link>

          <button
            onClick={() => setOpen(true)}
            aria-label="باز کردن منو"
            aria-expanded={open}
            className="
              flex items-center justify-center
              w-10 h-10
              rounded-xl
              text-gray-700
              hover:bg-brand/10 hover:text-brand
              active:scale-95
              transition-colors
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-brand/40
            "
          >
            <AlignRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}