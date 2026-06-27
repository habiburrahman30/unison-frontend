import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/lib/utils/response";
import { handlePrismaError } from "@/lib/utils/errorHandler";
import { slugify } from "@/lib/slugify";

// GET /api/news
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";

    const where = search
      ? {
          OR: [
            { title: { contains: search } },
            { description: { contains: search } },
          ],
        }
      : {};

    const [news, total] = await Promise.all([
      prisma.news.findMany({
        where,
        include: { category: true },
        orderBy: { created_at: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.news.count({ where }),
    ]);

    return ApiResponse.success({
      data: news,
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

// POST /api/news
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      image,
      category_id,
      published,
      from_date,
      to_date,
      tags,
    } = body;

    if (!title) return ApiResponse.error("Title is required", 400);
    if (!description) return ApiResponse.error("Description is required", 400);
    if (!category_id) return ApiResponse.error("Category is required", 400);
    if (!from_date) return ApiResponse.error("From date is required", 400);
    if (!to_date) return ApiResponse.error("To date is required", 400);

    const slug = slugify(title);

    const existingNews = await prisma.news.findUnique({ where: { slug } });
    if (existingNews)
      return ApiResponse.error("News with this title already exists", 400);

    const news = await prisma.news.create({
      data: {
        title: title.trim(),
        slug,
        description: description.trim(),
        image: image || null,
        category_id: Number(category_id),
        published: published ?? false,
        from_date: new Date(from_date),
        to_date: new Date(to_date),
        tags: tags ?? [],
      },
    });

    return ApiResponse.success(news, "News created successfully", 201);
  } catch (error: any) {
    const { message, statusCode } = handlePrismaError(error);
    return ApiResponse.error(message, statusCode);
  }
}
