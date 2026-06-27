import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/lib/utils/response";
import { handlePrismaError } from "@/lib/utils/errorHandler";
import path from "path";
import { unlink, access } from "fs/promises";

async function deleteImageFile(imageUrl: string) {
  try {
    const filepath = path.join(process.cwd(), "public", imageUrl);
    await access(filepath);
    await unlink(filepath);
  } catch {
    // File doesn't exist — ignore
  }
}

// GET /api/teams/:id
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const member = await prisma.teamMember.findUnique({
      where: { id: Number(id) },
    });

    if (!member) return ApiResponse.error("Team member not found", 404);

    return ApiResponse.success(member);
  } catch (error: any) {
    const { message, statusCode } = handlePrismaError(error);
    return ApiResponse.error(message, statusCode);
  }
}

// PATCH /api/teams/:id
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, position, bio, image, email, phone, social_links } = body;

    const existing = await prisma.teamMember.findUnique({
      where: { id: Number(id) },
    });
    if (!existing) return ApiResponse.error("Team member not found", 404);

    // Delete old image if changed or removed
    if (existing.image && image !== existing.image) {
      await deleteImageFile(existing.image);
    }

    const member = await prisma.teamMember.update({
      where: { id: Number(id) },
      data: {
        ...(name && { name: name.trim() }),
        ...(position && { position: position.trim() }),
        ...(bio !== undefined && { bio: bio?.trim() || null }),
        ...(image !== undefined && { image }),
        ...(email !== undefined && { email: email?.trim() || null }),
        ...(phone !== undefined && { phone: phone?.trim() || null }),
        ...(social_links !== undefined && { social_links }),
      },
    });

    return ApiResponse.success(member, "Team member updated successfully");
  } catch (error: any) {
    const { message, statusCode } = handlePrismaError(error);
    return ApiResponse.error(message, statusCode);
  }
}

// DELETE /api/teams/:id
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const existing = await prisma.teamMember.findUnique({
      where: { id: Number(id) },
    });
    if (!existing) return ApiResponse.error("Team member not found", 404);

    if (existing.image) await deleteImageFile(existing.image);

    await prisma.teamMember.delete({ where: { id: Number(id) } });

    return ApiResponse.success(null, "Team member deleted successfully");
  } catch (error: any) {
    const { message, statusCode } = handlePrismaError(error);
    return ApiResponse.error(message, statusCode);
  }
}
