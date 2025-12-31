import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/lib/utils/response";
import { handlePrismaError } from "@/lib/utils/errorHandler";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const categoryId = searchParams.get("categoryId");
    const brandId = searchParams.get("brandId");

    const where: any = {};
    if (categoryId) where.categoryId = parseInt(categoryId);
    if (brandId) where.brandId = parseInt(brandId);

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
          brand: true,
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.product.count({ where }),
    ]);

    return ApiResponse.success({
      products,
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, price, stock, images, categoryId, brandId } =
      body;

    if (!name || !price || !categoryId || !brandId) {
      return ApiResponse.error(
        "Required fields: name, price, categoryId, brandId",
        400
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock: stock || 0,
        images: images || [],
        categoryId,
        brandId,
      },
      include: {
        category: true,
        brand: true,
      },
    });

    return ApiResponse.success(product, "Product created successfully", 201);
  } catch (error: any) {
    const { message, statusCode } = handlePrismaError(error);
    return ApiResponse.error(message, statusCode);
  }
}
