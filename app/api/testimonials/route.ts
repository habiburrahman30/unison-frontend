import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/lib/utils/response";
import { handlePrismaError } from "@/lib/utils/errorHandler";

// GET - List all testimonials
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search");
    const isActive = searchParams.get("is_active");

    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
      ];
    }
    if (isActive !== null && isActive !== undefined) {
      where.is_active = isActive === "true";
    }

    const [testimonials, total] = await Promise.all([
      prisma.testimonial.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { created_at: "desc" },
      }),
      prisma.testimonial.count({ where }),
    ]);

    return ApiResponse.success({
      testimonials,
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

// POST - Create testimonial
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, designation, company, rating, message, image, is_active } =
      body;

    if (!name || !message) {
      return ApiResponse.error("Name and message are required", 400);
    }

    // Validate rating
    if (rating && (rating < 1 || rating > 5)) {
      return ApiResponse.error("Rating must be between 1 and 5", 400);
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        name: name.trim(),
        designation: designation?.trim() || null,
        company: company?.trim() || null,
        rating: rating || 5,
        message: message.trim(),
        image: image || null,
        is_active: is_active !== undefined ? is_active : true,
      },
    });

    return ApiResponse.success(
      testimonial,
      "Testimonial created successfully",
      201
    );
  } catch (error: any) {
    console.error("Create testimonial error:", error);
    const { message, statusCode } = handlePrismaError(error);
    return ApiResponse.error(message, statusCode);
  }
}
