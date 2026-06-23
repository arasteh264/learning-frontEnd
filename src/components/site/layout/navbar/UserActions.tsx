"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { User, Settings, LogOut } from "lucide-react";

export default function UserActions() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  if (status === "loading") return null;

  if (session) {
    return (
      <div className="relative hidden md:block cursor-pointer">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center  rounded-full border border-green-600 px-2 py-1.5 text-green-600 hover:bg-green-600 hover:text-white transition-all"
        >
          <div className=" rounded-full flex items-center justify-center">
            <User className="w-6 h-6" />
          </div>

          <span className="text-sm font-medium">
            {session.user?.name}
          </span>
        </button>

        {open && (
          <div className="absolute left-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg overflow-hidden z-50">
            
            <Link
              href="/profile"
              className="flex items-center gap-x-2 px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              <User className="w-4 h-4" />
              پروفایل
            </Link>


            <button
              onClick={() => signOut()}
              className="w-full flex items-center gap-x-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
              خروج
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="hidden md:flex items-center border border-green-600 rounded-lg py-2 px-2">
      <Link href="/auth/login" className="text-sm px-1 text-green-600">
        ورود
      </Link>
      <span className="text-green-600">|</span>
      <Link href="/auth/register" className="text-green-600 text-sm px-1">
        ثبت نام
      </Link>
    </div>
  );
}