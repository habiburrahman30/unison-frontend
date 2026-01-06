import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/lib/utils/response";
import { handlePrismaError } from "@/lib/utils/errorHandler";
import { deleteUploadedFile } from "@/lib/utils/fileUtils";

// GET - Single brand
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (isNaN(Number(id))) {
      return ApiResponse.error("Invalid brand ID", 400);
    }

    const brand = await prisma.brand.findUnique({
      where: { id: Number(id) },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    if (!brand) {
      return ApiResponse.error("Brand not found", 404);
    }

    return ApiResponse.success(brand);
  } catch (error: any) {
    const { message, statusCode } = handlePrismaError(error);
    return ApiResponse.error(message, statusCode);
  }
}

// PATCH - Update brand
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (isNaN(Number(id))) {
      return ApiResponse.error("Invalid brand ID", 400);
    }

    // Check if brand exists
    const existingBrand = await prisma.brand.findUnique({
      where: { id: Number(id) },
    });

    if (!existingBrand) {
      return ApiResponse.error("Brand not found", 404);
    }

    // Check if name is being changed and if new name already exists
    if (body.name && body.name !== existingBrand.name) {
      const nameExists = await prisma.brand.findUnique({
        where: { name: body.name },
      });

      if (nameExists) {
        return ApiResponse.error("Brand with this name already exists", 400);
      }
    }

    // Update brand
    const brand = await prisma.brand.update({
      where: { id: Number(id) },
      data: {
        name: body.name?.trim(),
        description: body.description?.trim() || null,
        logo: body.logo || null,
      },
    });

    return ApiResponse.success(brand, "Brand updated successfully");
  } catch (error: any) {
    const { message, statusCode } = handlePrismaError(error);
    return ApiResponse.error(message, statusCode);
  }
}

// DELETE - Delete brand and associated logo
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (isNaN(Number(id))) {
      return ApiResponse.error("Invalid brand ID", 400);
    }

    const brand = await prisma.brand.findUnique({
      where: { id: Number(id) },
    });

    if (!brand) {
      return ApiResponse.error("Brand not found", 404);
    }

    await prisma.brand.delete({
      where: { id: Number(id) },
    });

    // Delete brand logo if exists
    if (brand.logo) {
      await deleteUploadedFile(brand.logo, "brand");
    }

    return ApiResponse.success(null, "Brand deleted successfully");
  } catch (error: any) {
    const { message, statusCode } = handlePrismaError(error);
    return ApiResponse.error(message, statusCode);
  }
}
