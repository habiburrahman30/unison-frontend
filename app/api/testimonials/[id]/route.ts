import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/lib/utils/response";
import { handlePrismaError } from "@/lib/utils/errorHandler";
import { deleteUploadedFile } from "@/lib/utils/fileUtils";

// GET - Single testimonial
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return ApiResponse.error("Invalid testimonial ID", 400);
    }

    const testimonial = await prisma.testimonial.findUnique({
      where: { id },
    });

    if (!testimonial) {
      return ApiResponse.error("Testimonial not found", 404);
    }

    return ApiResponse.success(testimonial);
  } catch (error: any) {
    const { message, statusCode } = handlePrismaError(error);
    return ApiResponse.error(message, statusCode);
  }
}

// PATCH - Update testimonial
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const body = await request.json();

    if (isNaN(id)) {
      return ApiResponse.error("Invalid testimonial ID", 400);
    }

    // Check if testimonial exists
    const existingTestimonial = await prisma.testimonial.findUnique({
      where: { id },
    });

    if (!existingTestimonial) {
      return ApiResponse.error("Testimonial not found", 404);
    }

    // Validate rating if provided
    if (body.rating && (body.rating < 1 || body.rating > 5)) {
      return ApiResponse.error("Rating must be between 1 and 5", 400);
    }

    // Update testimonial
    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        name: body.name?.trim(),
        designation: body.designation?.trim() || null,
        company: body.company?.trim() || null,
        rating: body.rating,
        message: body.message?.trim(),
        image: body.image || null,
        is_active: body.is_active,
      },
    });

    return ApiResponse.success(testimonial, "Testimonial updated successfully");
  } catch (error: any) {
    const { message, statusCode } = handlePrismaError(error);
    return ApiResponse.error(message, statusCode);
  }
}

// DELETE - Delete testimonial and associated image
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (isNaN(id)) {
      return ApiResponse.error("Invalid testimonial ID", 400);
    }

    const testimonial = await prisma.testimonial.findUnique({
      where: { id },
    });

    if (!testimonial) {
      return ApiResponse.error("Testimonial not found", 404);
    }

    await prisma.testimonial.delete({
      where: { id },
    });

    // Delete testimonial image if exists
    if (testimonial.image) {
      await deleteUploadedFile(testimonial.image, "testimonial");
    }

    return ApiResponse.success(null, "Testimonial deleted successfully");
  } catch (error: any) {
    const { message, statusCode } = handlePrismaError(error);
    return ApiResponse.error(message, statusCode);
  }
}
