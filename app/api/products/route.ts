import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/lib/utils/response";
import { handlePrismaError } from "@/lib/utils/errorHandler";
import { slugify } from "@/lib/slugify";

// GET - List all products with pagination and filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const categoryId = searchParams.get("category_id");
    const brandId = searchParams.get("brand_id");
    const isTrending = searchParams.get("is_trending");
    const search = searchParams.get("search");

    const where: any = {};

    if (categoryId) where.category_id = parseInt(categoryId);
    if (brandId) where.brand_id = parseInt(brandId);
    if (isTrending === "true") where.is_trending = true;

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { manufacturer: { contains: search, mode: "insensitive" } },
        { product_description: { contains: search, mode: "insensitive" } },
      ];
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
          brand: true,
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { created_at: "desc" },
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

// POST - Create a new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      slug,
      manufacturer,
      country_of_origin,
      product_url,
      product_description,
      technical_description,
      price,
      old_price,
      stock,
      is_trending,
      images,
      category_id,
      brand_id,
    } = body;

    // Validation
    if (
      !name ||
      !manufacturer ||
      !country_of_origin ||
      !product_url ||
      !product_description ||
      price === undefined ||
      !category_id ||
      !brand_id
    ) {
      return ApiResponse.error(
        "Required fields: name, manufacturer, country_of_origin, product_url, product_description, price, category_id, brand_id",
        400
      );
    }

    // Auto-generate slug if not provided
    const productSlug = slug || slugify(name);

    // Check if slug already exists
    const existingProduct = await prisma.product.findUnique({
      where: { slug: productSlug },
    });

    if (existingProduct) {
      return ApiResponse.error(
        "Product with this slug already exists. Please provide a unique slug.",
        400
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug: productSlug,
        manufacturer,
        country_of_origin,
        product_url,
        product_description,
        technical_description: technical_description || null,
        price: parseFloat(price),
        old_price: old_price ? parseFloat(old_price) : null,
        stock: stock || 0,
        is_trending: is_trending || false,
        images: images || [],
        category_id: parseInt(category_id),
        brand_id: parseInt(brand_id),
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
