"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function UserActions() {
  const { data: session, status } = useSession();
debugger
  if (status === "loading") return null;

  if (session) {
    return (
      <div className="hidden md:flex items-center border border-green-600 rounded-lg py-2 px-2">
        <span className="text-sm text-green-600 px-1">
          {session.user?.name}
        </span>
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