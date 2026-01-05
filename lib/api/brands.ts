import { prisma } from "@/lib/prisma";

export interface Brand {
  id: number;
  name: string;
  description: string | null;
  logo: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface BrandsResponse {
  brands: Brand[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// SERVER-SIDE: Get all brands
export async function getBrands(params?: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<BrandsResponse> {
  const page = params?.page || 1;
  const limit = params?.limit || 10;

  const where: any = {};
  if (params?.search) {
    where.name = { contains: params.search, mode: "insensitive" };
  }

  const [brands, total] = await Promise.all([
    prisma.brand.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: { created_at: "desc" },
    }),
    prisma.brand.count({ where }),
  ]);

  return {
    brands,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

// SERVER-SIDE: Get single brand
export async function getBrandById(id: number): Promise<Brand | null> {
  return await prisma.brand.findUnique({
    where: { id },
  });
}

// CLIENT-SIDE: Create brand
export async function createBrand(data: any): Promise<Brand> {
  const response = await fetch("/api/brands", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create brand");
  }

  const result = await response.json();
  return result.data;
}

// CLIENT-SIDE: Update brand
export async function updateBrand(id: number, data: any): Promise<Brand> {
  const response = await fetch(`/api/brands/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update brand");
  }

  const result = await response.json();
  return result.data;
}

// CLIENT-SIDE: Delete brand
export async function deleteBrand(id: number): Promise<void> {
  const response = await fetch(`/api/brands/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete brand");
  }
}
