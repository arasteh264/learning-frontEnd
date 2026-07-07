"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { User, LogOut } from "lucide-react";

export default function UserActions() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  if (status === "loading") return null;

  if (session) {
    return (
      <div className="relative hidden md:block">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1.5 rounded-full border border-brand   p-2  bg-brand text-white transition-colors cursor-pointer"
        >
          <User className="w-5 h-5 relative left-0.5" />
          <span className="text-sm font-medium">{session.user?.name}</span>
        </button>

        {open && (
          <div className="absolute left-0 mt-2 w-48 rounded-xl border border-gray-100 bg-white shadow-lg overflow-hidden z-50">
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-x-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
            >
              <User className="w-4 h-4" />
              پروفایل
            </Link>

            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full flex items-center gap-x-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 border-t border-gray-100"
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
    <div className="hidden md:flex items-center border border-brand rounded-lg py-2 px-2">
      <Link href="/auth/login" className="text-sm px-1 text-brand">
        ورود
      </Link>
      <span className="text-brand/40">|</span>
      <Link href="/auth/register" className="text-sm px-1 text-brand">
        ثبت نام
      </Link>
    </div>
  );
}