import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/lib/utils/response";
import { handlePrismaError } from "@/lib/utils/errorHandler";

// GET - List all brands
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search");

    const where: any = {};
    if (search) {
      where.name = { contains: search, mode: "insensitive" };
    }

    const [brands, total] = await Promise.all([
      prisma.brand.findMany({
        where,
        include: {
          _count: {
            select: { products: true },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { created_at: "desc" },
      }),
      prisma.brand.count({ where }),
    ]);

    return ApiResponse.success({
      brands,
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

// POST - Create brand
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, logo } = body;

    if (!name) {
      return ApiResponse.error("Brand name is required", 400);
    }

    // Check if brand already exists
    const existingBrand = await prisma.brand.findUnique({
      where: { name: name.trim() },
    });

    if (existingBrand) {
      return ApiResponse.error("Brand with this name already exists", 400);
    }

    const brand = await prisma.brand.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        logo: logo || null,
      },
    });

    return ApiResponse.success(brand, "Brand created successfully", 201);
  } catch (error: any) {
    console.error("Create brand error:", error);
    const { message, statusCode } = handlePrismaError(error);
    return ApiResponse.error(message, statusCode);
  }
}
