import { prisma } from "@/lib/prisma";

export interface Testimonial {
  id: number;
  name: string;
  designation: string | null;
  company: string | null;
  rating: number;
  message: string;
  image: string | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface TestimonialsResponse {
  testimonials: Testimonial[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// SERVER-SIDE: Get all testimonials
export async function getTestimonials(params?: {
  page?: number;
  limit?: number;
  search?: string;
  is_active?: boolean;
}): Promise<TestimonialsResponse> {
  const page = params?.page || 1;
  const limit = params?.limit || 10;

  const where: any = {};
  if (params?.search) {
    where.OR = [
      { name: { contains: params.search, mode: "insensitive" } },
      { company: { contains: params.search, mode: "insensitive" } },
    ];
  }
  if (params?.is_active !== undefined) {
    where.is_active = params.is_active;
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

  return {
    testimonials,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

// SERVER-SIDE: Get single testimonial
export async function getTestimonialById(
  id: number
): Promise<Testimonial | null> {
  return await prisma.testimonial.findUnique({
    where: { id },
  });
}

// CLIENT-SIDE: Create testimonial
export async function createTestimonial(data: any): Promise<Testimonial> {
  const response = await fetch("/api/testimonials", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create testimonial");
  }

  const result = await response.json();
  return result.data;
}

// CLIENT-SIDE: Update testimonial
export async function updateTestimonial(
  id: number,
  data: any
): Promise<Testimonial> {
  const response = await fetch(`/api/testimonials/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update testimonial");
  }

  const result = await response.json();
  return result.data;
}

// CLIENT-SIDE: Delete testimonial
export async function deleteTestimonial(id: number): Promise<void> {
  const response = await fetch(`/api/testimonials/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete testimonial");
  }
}
