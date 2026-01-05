import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/lib/utils/response";
import { handlePrismaError } from "@/lib/utils/errorHandler";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true },
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
    const { name, description, image } = body;

    if (!name) {
      return ApiResponse.error("Category name is required", 400);
    }

    // Check if category already exists
    const existingCategory = await prisma.category.findUnique({
      where: { name },
    });

    if (existingCategory) {
      return ApiResponse.error("Category with this name already exists", 400);
    }

    const category = await prisma.category.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        image: image || null,
      },
    });

    return ApiResponse.success(category, "Category created successfully", 201);
  } catch (error: any) {
    const { message, statusCode } = handlePrismaError(error);
    return ApiResponse.error(message, statusCode);
  }
}
