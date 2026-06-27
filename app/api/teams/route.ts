import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/lib/utils/response";
import { handlePrismaError } from "@/lib/utils/errorHandler";

// GET /api/teams
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";

    const where = search
      ? {
          OR: [
            { name: { contains: search } },
            { position: { contains: search } },
          ],
        }
      : {};

    const [members, total] = await Promise.all([
      prisma.teamMember.findMany({
        where,
        orderBy: { created_at: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.teamMember.count({ where }),
    ]);

    return ApiResponse.success({
      data: members,
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

// POST /api/teams
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, position, bio, image, email, phone, social_links } = body;

    if (!name) return ApiResponse.error("Name is required", 400);
    // if (!position) return ApiResponse.error("Position is required", 400);
    if (!image) return ApiResponse.error("Image is required", 400);

    const member = await prisma.teamMember.create({
      data: {
        name: name.trim(),
        position: position.trim(),
        bio: bio?.trim() || null,
        image: image || null,
        email: email?.trim() || null,
        phone: phone?.trim() || null,
        social_links: social_links || null,
      },
    });

    return ApiResponse.success(member, "Team member created successfully", 201);
  } catch (error: any) {
    const { message, statusCode } = handlePrismaError(error);
    return ApiResponse.error(message, statusCode);
  }
}
