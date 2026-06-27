import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/lib/utils/response";
import { handlePrismaError } from "@/lib/utils/errorHandler";

export async function GET() {
  try {
    const categories = await prisma.newsCategory.findMany({
      include: {
        _count: {
          select: { news: true },
        },
      },
      orderBy: { name: "asc" },
    });

    return ApiResponse.success(categories);
  } catch (error: any) {
    const { message, statusCode } = handlePrismaError(error);
    return ApiResponse.error(message, statusCode);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description } = body;

    if (!name) {
      return ApiResponse.error("Category name is required", 400);
    }

    // Check if category already exists
    const existingCategory = await prisma.newsCategory.findUnique({
      where: { name },
    });

    if (existingCategory) {
      return ApiResponse.error("Category with this name already exists", 400);
    }

    const category = await prisma.newsCategory.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
      },
    });

    return ApiResponse.success(category, "Category created successfully", 201);
  } catch (error: any) {
    const { message, statusCode } = handlePrismaError(error);
    return ApiResponse.error(message, statusCode);
  }
}
