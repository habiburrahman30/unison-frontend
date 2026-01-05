import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/lib/utils/response";
import { handlePrismaError } from "@/lib/utils/errorHandler";
import { slugify } from "@/lib/slugify";

// GET - Get single product by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return ApiResponse.error("Invalid product ID", 400);
    }

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        brand: true,
      },
    });

    if (!product) {
      return ApiResponse.error("Product not found", 404);
    }

    return ApiResponse.success(product);
  } catch (error: any) {
    const { message, statusCode } = handlePrismaError(error);
    return ApiResponse.error(message, statusCode);
  }
}

// PATCH - Update product
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();

    if (isNaN(id)) {
      return ApiResponse.error("Invalid product ID", 400);
    }

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return ApiResponse.error("Product not found", 404);
    }

    // If name is being updated and slug is not provided, regenerate slug
    if (body.name && !body.slug) {
      body.slug = slugify(body.name);
    }

    // If slug is being updated, check if it's unique
    if (body.slug && body.slug !== existingProduct.slug) {
      const slugExists = await prisma.product.findUnique({
        where: { slug: body.slug },
      });

      if (slugExists) {
        return ApiResponse.error("Product with this slug already exists", 400);
      }
    }

    // Parse numeric fields if they exist
    const updateData: any = { ...body };
    if (body.price) updateData.price = parseFloat(body.price);
    if (body.old_price) updateData.old_price = parseFloat(body.old_price);
    if (body.stock !== undefined) updateData.stock = parseInt(body.stock);
    if (body.category_id) updateData.category_id = parseInt(body.category_id);
    if (body.brand_id) updateData.brand_id = parseInt(body.brand_id);

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
      include: {
        category: true,
        brand: true,
      },
    });

    return ApiResponse.success(product, "Product updated successfully");
  } catch (error: any) {
    const { message, statusCode } = handlePrismaError(error);
    return ApiResponse.error(message, statusCode);
  }
}

// DELETE - Delete product
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return ApiResponse.error("Invalid product ID", 400);
    }

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return ApiResponse.error("Product not found", 404);
    }

    await prisma.product.delete({
      where: { id },
    });

    return ApiResponse.success(null, "Product deleted successfully");
  } catch (error: any) {
    const { message, statusCode } = handlePrismaError(error);
    return ApiResponse.error(message, statusCode);
  }
}
