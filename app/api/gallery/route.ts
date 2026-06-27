import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/lib/utils/response";
import { handlePrismaError } from "@/lib/utils/errorHandler";

// GET /api/gallery
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";

    const where = search ? { OR: [{ title: { contains: search } }] } : {};

    const [items, total] = await Promise.all([
      prisma.gallery.findMany({
        where,
        orderBy: { created_at: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.gallery.count({ where }),
    ]);

    return ApiResponse.success({
      data: items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    const { message, statusCode } = handlePrismaError(error);
    return ApiResponse.error(message, statusCode);
  }
}

// POST /api/gallery
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, image } = body;

    if (!title) return ApiResponse.error("Title is required", 400);
    if (!image) return ApiResponse.error("Image is required", 400);

    const item = await prisma.gallery.create({
      data: {
        title: title.trim(),
        description: description?.trim() || null,
        image,
      },
    });

    return ApiResponse.success(item, "Gallery item created successfully", 201);
  } catch (error: any) {
    const { message, statusCode } = handlePrismaError(error);
    return ApiResponse.error(message, statusCode);
  }
}
