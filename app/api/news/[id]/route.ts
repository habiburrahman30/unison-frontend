import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/lib/utils/response";
import { handlePrismaError } from "@/lib/utils/errorHandler";
import { slugify } from "@/lib/slugify";

// Helper to delete image file
async function deleteImageFile(imageUrl: string) {
  try {
    const { unlink, access } = await import("fs/promises");
    const path = await import("path");
    const filepath = path.join(process.cwd(), "public", imageUrl);
    await access(filepath);
    await unlink(filepath);
  } catch {
    // File doesn't exist or already deleted — ignore
  }
}

// PATCH /api/news/:id
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      title,
      description,
      image,
      category_id,
      published,
      from_date,
      to_date,
      tags,
    } = body;

    const existing = await prisma.news.findUnique({
      where: { id: Number(id) },
    });
    if (!existing) return ApiResponse.error("News not found", 404);

    // ✅ If image changed and old image exists, delete old image
    if (image !== existing.image && existing.image) {
      await deleteImageFile(existing.image);
    }

    // ✅ If image removed (null) and old image exists, delete old image
    if (image === null && existing.image) {
      await deleteImageFile(existing.image);
    }

    const news = await prisma.news.update({
      where: { id: Number(id) },
      data: {
        ...(title && { title: title.trim(), slug: slugify(title) }),
        ...(description && { description: description.trim() }),
        ...(image !== undefined && { image }),
        ...(category_id && { category_id: Number(category_id) }),
        ...(published !== undefined && { published }),
        ...(from_date && { from_date: new Date(from_date) }),
        ...(to_date && { to_date: new Date(to_date) }),
        ...(tags && { tags }),
      },
    });

    return ApiResponse.success(news, "News updated successfully");
  } catch (error: any) {
    const { message, statusCode } = handlePrismaError(error);
    return ApiResponse.error(message, statusCode);
  }
}

// DELETE /api/news/:id
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const existing = await prisma.news.findUnique({
      where: { id: Number(id) },
    });
    if (!existing) return ApiResponse.error("News not found", 404);

    // ✅ Delete image file before deleting news record
    if (existing.image) {
      await deleteImageFile(existing.image);
    }

    await prisma.news.delete({ where: { id: Number(id) } });

    return ApiResponse.success(null, "News deleted successfully");
  } catch (error: any) {
    const { message, statusCode } = handlePrismaError(error);
    return ApiResponse.error(message, statusCode);
  }
}

// GET /api/news/:id
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params; // ✅ await params

    const news = await prisma.news.findUnique({
      where: { id: Number(id) },
      include: { category: true },
    });

    if (!news) return ApiResponse.error("News not found", 404);

    return ApiResponse.success(news);
  } catch (error: any) {
    const { message, statusCode } = handlePrismaError(error);
    return ApiResponse.error(message, statusCode);
  }
}
