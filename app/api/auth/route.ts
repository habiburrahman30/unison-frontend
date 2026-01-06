// app/api/auth/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json({ message: "Auth route" });
}

// Or POST, PUT, DELETE, etc.
export async function POST(request: Request) {
  // Your logic
  return NextResponse.json({ success: true });
}
