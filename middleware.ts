import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/utils/jwt";

export function middleware(request: NextRequest) {
  const protectedPaths = ["/api/products", "/api/categories", "/api/brands"];
  const path = request.nextUrl.pathname;

  const isProtectedPath = protectedPaths.some((protectedPath) =>
    path.startsWith(protectedPath)
  );

  if (
    isProtectedPath &&
    request.method !== "GET" &&
    request.method !== "POST" &&
    request.method !== "DELETE" &&
    request.method !== "PUT" &&
    request.method !== "PATCH"
  ) {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      );
    }

    try {
      verifyToken(token);
    } catch (error) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
