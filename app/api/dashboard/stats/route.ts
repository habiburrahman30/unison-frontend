import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/lib/utils/response";
import { handlePrismaError } from "@/lib/utils/errorHandler";

export async function GET(request: NextRequest) {
  try {
    // Get counts for all tables in parallel
    const [
      productsCount,
      categoriesCount,
      brandsCount,
      newsCount,
      newsCategoriesCount,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.brand.count(),
      prisma.news.count(),
      prisma.newsCategory.count(),
    ]);

    const stats = {
      products: productsCount,
      categories: categoriesCount,
      brands: brandsCount,
      news: newsCount,
      newsCategories: newsCategoriesCount,
    };

    return ApiResponse.success(stats);
  } catch (error: any) {
    const { message, statusCode } = handlePrismaError(error);
    return ApiResponse.error(message, statusCode);
  }
}
