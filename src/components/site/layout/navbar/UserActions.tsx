"use client";

import Link from "next/link";

export default function UserActions() {
  return (
    <div className="hidden md:flex items-center gap-3">
      <Link href="/auth/login" className="text-sm">
        ورود
      </Link>

      <Link
        href="/auth/register"
        className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
      >
        ثبت نام
      </Link>
    </div>
  );
}