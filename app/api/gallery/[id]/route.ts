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

// GET /api/gallery/:id
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const item = await prisma.gallery.findUnique({
      where: { id: Number(id) },
    });

    if (!item) return ApiResponse.error("Gallery item not found", 404);
    return ApiResponse.success(item);
  } catch (error: any) {
    const { message, statusCode } = handlePrismaError(error);
    return ApiResponse.error(message, statusCode);
  }
}

// PATCH /api/gallery/:id
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, description, image } = body;

    const existing = await prisma.gallery.findUnique({
      where: { id: Number(id) },
    });
    if (!existing) return ApiResponse.error("Gallery item not found", 404);

    // Delete old image if changed
    if (image && image !== existing.image) {
      await deleteImageFile(existing.image);
    }

    const item = await prisma.gallery.update({
      where: { id: Number(id) },
      data: {
        ...(title && { title: title.trim() }),
        ...(description !== undefined && {
          description: description?.trim() || null,
        }),
        ...(image && { image }),
      },
    });

    return ApiResponse.success(item, "Gallery item updated successfully");
  } catch (error: any) {
    const { message, statusCode } = handlePrismaError(error);
    return ApiResponse.error(message, statusCode);
  }
}

// DELETE /api/gallery/:id
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const existing = await prisma.gallery.findUnique({
      where: { id: Number(id) },
    });
    if (!existing) return ApiResponse.error("Gallery item not found", 404);

    await deleteImageFile(existing.image);
    await prisma.gallery.delete({ where: { id: Number(id) } });

    return ApiResponse.success(null, "Gallery item deleted successfully");
  } catch (error: any) {
    const { message, statusCode } = handlePrismaError(error);
    return ApiResponse.error(message, statusCode);
  }
}
