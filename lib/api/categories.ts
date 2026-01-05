import { prisma } from "@/lib/prisma";

export interface Category {
  id: number;
  name: string;
  description: string | null;
  image: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface CategoriesResponse {
  categories: Category[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// SERVER-SIDE: Get all categories
export async function getCategories(params?: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<CategoriesResponse> {
  const page = params?.page || 1;
  const limit = params?.limit || 10;

  const where: any = {};
  if (params?.search) {
    where.name = { contains: params.search, mode: "insensitive" };
  }

  const [categories, total] = await Promise.all([
    prisma.category.findMany({
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
    prisma.category.count({ where }),
  ]);

  return {
    categories,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

// SERVER-SIDE: Get single category
export async function getCategoryById(id: number): Promise<Category | null> {
  return await prisma.category.findUnique({
    where: { id },
  });
}

// CLIENT-SIDE: Create category
export async function createCategory(data: any): Promise<Category> {
  const response = await fetch("/api/categories", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create category");
  }

  const result = await response.json();
  return result.data;
}

// CLIENT-SIDE: Update category
export async function updateCategory(id: number, data: any): Promise<Category> {
  const response = await fetch(`/api/categories/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update category");
  }

  const result = await response.json();
  return result.data;
}

// CLIENT-SIDE: Delete category
export async function deleteCategory(id: number): Promise<void> {
  const response = await fetch(`/api/categories/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete category");
  }
}
