"use client";

import { useState } from "react";
import Link from "next/link";
import { MenuOutlined } from "@ant-design/icons";

import NavLinks from "./NavLinks";
import UserActions from "./UserActions";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b bg-white flex justify-center">
      <div className="container  flex justify-end items-center  h-16 px-4">

 
        <div className="hidden md:flex items-center gap-3">
          <UserActions />
        </div>
        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLinks />
        </nav>

        {/* AUTH */}


        {/* MOBILE BUTTON */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden text-xl"
        >
          <MenuOutlined />
        </button>

               {/* LOGO */}
        <Link href="/" className="font-bold text-lg">
          SABZLEARN
        </Link>
      </div>

      {/* MOBILE MENU */}
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}