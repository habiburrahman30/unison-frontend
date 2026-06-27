import { prisma } from "@/lib/prisma";

export interface GalleryItem {
  id: number;
  title: string;
  description: string | null;
  image: string;
  created_at: Date;
  updated_at: Date;
}

export interface GalleryResponse {
  data: GalleryItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface GalleryPayload {
  title: string;
  description?: string | null;
  image: string;
}

// SERVER-SIDE: Get all gallery items
export async function getGalleryItems(params?: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<GalleryResponse> {
  const page = params?.page || 1;
  const limit = params?.limit || 10;

  const where: any = {};
  if (params?.search) {
    where.OR = [{ title: { contains: params.search } }];
  }

  const [data, total] = await Promise.all([
    prisma.gallery.findMany({
      where,
      orderBy: { created_at: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.gallery.count({ where }),
  ]);

  return {
    data,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
}

// SERVER-SIDE: Get single gallery item
export async function getGalleryItemById(
  id: number,
): Promise<GalleryItem | null> {
  return await prisma.gallery.findUnique({ where: { id } });
}

// CLIENT-SIDE: Create gallery item
export async function createGalleryItem(
  data: GalleryPayload,
): Promise<GalleryItem> {
  const response = await fetch("/api/gallery", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create gallery item");
  }

  const result = await response.json();
  return result.data;
}

// CLIENT-SIDE: Update gallery item
export async function updateGalleryItem(
  id: number,
  data: Partial<GalleryPayload>,
): Promise<GalleryItem> {
  const response = await fetch(`/api/gallery/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update gallery item");
  }

  const result = await response.json();
  return result.data;
}

// CLIENT-SIDE: Delete gallery item
export async function deleteGalleryItem(id: number): Promise<void> {
  const response = await fetch(`/api/gallery/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete gallery item");
  }
}
