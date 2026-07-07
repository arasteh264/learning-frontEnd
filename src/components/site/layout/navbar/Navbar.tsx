"use client";

import { useState } from "react";
import Link from "next/link";
import NavLinks from "./NavLinks";
import UserActions from "./UserActions";
import MobileMenu from "./MobileMenu";
import { AlignRight, ShoppingBag } from "lucide-react";
import CartIcon from "@/app/(site)/cart/CartIcon";
import Logo from "@/src/components/base/logo";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b border-b-gray-200 bg-white flex justify-center">
      <div className="container-custom w-full flex justify-center py-2">
        {/* desktop */}
        <div className="hidden md:flex w-full justify-between items-center gap-4 py-3">
          <div className="flex items-center gap-3">
            <UserActions />
            <CartIcon />
          </div>
          <div className="flex items-center gap-8">
            <nav className="hidden md:flex items-center gap-6">
              <NavLinks />
            </nav>
            <Link href="/">
              <Logo />
            </Link>
          </div>
        </div>

        {/* mobile */}
        <div className="md:hidden w-full flex justify-between items-center">
          <nav className="hidden md:flex items-center gap-6">
            <NavLinks />
          </nav>

          <Link
            href="/cart"
            className="relative flex items-center justify-center w-10 h-10 rounded-xl hover:bg-brand/10 hover:text-brand transition-colors"
          >
            <ShoppingBag className="w-6 h-6" />
            <span className="absolute -top-1 -left-1 bg-brand text-white text-[10px] min-w-5 h-5 flex items-center justify-center rounded-full px-1">
              2
            </span>
          </Link>

          <Link href="/">
            <Logo />
          </Link>

          <button
            onClick={() => setOpen(true)}
            className="flex items-center justify-center w-10 h-10 rounded-xl hover:bg-brand/10 hover:text-brand transition-colors"
          >
            <AlignRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}