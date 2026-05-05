import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const session = req.auth;
  const { pathname } = req.nextUrl;

  const isLoggedIn = !!session?.user;
  const isAdmin = session?.user?.role === "ADMIN";

  // ← Never block auth API routes
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const isAdminRoute = pathname.startsWith("/admin");
  const isAuthRoute = pathname === "/login" || pathname === "/register";

  if (isAdminRoute) {
    if (!isLoggedIn)
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    if (!isAdmin) return NextResponse.redirect(new URL("/", req.nextUrl));
    return NextResponse.next();
  }

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/login", "/register"],
  // ↑ /api/auth is NOT in matcher so it's never intercepted
};
