import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/lib/utils/response";
import { handlePrismaError } from "@/lib/utils/errorHandler";
import { deleteUploadedFile } from "@/lib/utils/fileUtils";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const category = await prisma.category.findUnique({
      where: { id: Number(id) },
      include: {
        products: {
          take: 10,
          orderBy: { created_at: "desc" },
        },
        _count: {
          select: { products: true },
        },
      },
    });

    if (!category) {
      return ApiResponse.error("Category not found", 404);
    }

    return ApiResponse.success(category);
  } catch (error: any) {
    const { message, statusCode } = handlePrismaError(error);
    return ApiResponse.error(message, statusCode);
  }
}

// PATCH - Update category
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (isNaN(Number(id))) {
      return ApiResponse.error("Invalid category ID", 400);
    }

    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id: Number(id) },
    });

    if (!existingCategory) {
      return ApiResponse.error("Category not found", 404);
    }

    // Check if name is being changed and if new name already exists
    if (body.name && body.name !== existingCategory.name) {
      const nameExists = await prisma.category.findUnique({
        where: { name: body.name },
      });

      if (nameExists) {
        return ApiResponse.error("Category with this name already exists", 400);
      }
    }

    // Update category
    const category = await prisma.category.update({
      where: { id: Number(id) },
      data: {
        name: body.name?.trim(),
        description: body.description?.trim() || null,
        image: body.image || null,
      },
    });

    return ApiResponse.success(category, "Category updated successfully");
  } catch (error: any) {
    const { message, statusCode } = handlePrismaError(error);
    return ApiResponse.error(message, statusCode);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (isNaN(Number(id))) {
      return ApiResponse.error("Invalid category ID", 400);
    }

    // Get the category to retrieve the image path
    const category = await prisma.category.findUnique({
      where: { id: Number(id) },
    });

    if (!category) {
      return ApiResponse.error("Category not found", 404);
    }

    // Delete the category from database
    await prisma.category.delete({
      where: { id: Number(id) },
    });

    // Delete associated image if exists
    if (category.image) {
      await deleteUploadedFile(category.image, "category");
    }

    return ApiResponse.success(null, "Category deleted successfully");
  } catch (error: any) {
    const { message, statusCode } = handlePrismaError(error);
    return ApiResponse.error(message, statusCode);
  }
}
