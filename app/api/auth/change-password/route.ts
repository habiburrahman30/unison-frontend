import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/lib/utils/response";
import { handlePrismaError } from "@/lib/utils/errorHandler";
import { verifyToken } from "@/lib/utils/jwt";
import { comparePassword, hashPassword } from "@/lib/utils/password";

export async function PUT(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return ApiResponse.error("Authentication required", 401);
    }

    const decoded = verifyToken(token);
    const body = await request.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return ApiResponse.error("Both passwords are required", 400);
    }

    if (newPassword.length < 6) {
      return ApiResponse.error(
        "New password must be at least 6 characters",
        400
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return ApiResponse.error("User not found", 404);
    }

    const isPasswordValid = await comparePassword(
      currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      return ApiResponse.error("Current password is incorrect", 401);
    }

    const hashedPassword = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: decoded.id },
      data: { password: hashedPassword },
    });

    return ApiResponse.success(null, "Password changed successfully");
  } catch (error: any) {
    const { message, statusCode } = handlePrismaError(error);
    return ApiResponse.error(message, statusCode);
  }
}
