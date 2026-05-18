"use client";

import Link from "next/link";

export default function UserActions() {
  return (
    <div className="hidden md:flex items-center border border-green-600 rounded-lg py-2 px-2">
      <Link href="/auth/login" className="text-sm px-1 text-green-600">
        ورود
      </Link>
<span className="text-green-600">|</span>
      <Link
        href="/auth/register"
        className=" text-green-600 rounded-lg text-sm px-1"
      >
        ثبت نام
      </Link>
    </div>
  );
}