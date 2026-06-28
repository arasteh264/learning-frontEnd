import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const token = req.cookies.get("next-auth.session-token");
  const isAdmin = req.nextUrl.pathname.startsWith("/admin");

  if (isAdmin && !token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}