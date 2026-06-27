import { title } from "node:process";
import { prisma } from "@/lib/prisma";

export interface News {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string | null;
  category_id: number;
  published: boolean;
  from_date: Date;
  to_date: Date;
  tags: string[];
  created_at: Date;
  updated_at: Date;
}

export interface NewsResponse {
  data: News[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// SERVER-SIDE: Get all news
export async function getNews(params?: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<NewsResponse> {
  const page = params?.page || 1;
  const limit = params?.limit || 10;

  const where: any = {};
  if (params?.search) {
    where.title = { contains: params.search };
  }

  const [news, total] = await Promise.all([
    prisma.news.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,

      orderBy: { created_at: "desc" },
    }),
    prisma.news.count({ where }),
  ]);

  return {
    data: news.map((item) => ({
      ...item,
      tags: Array.isArray(item.tags) ? item.tags : [],
    })) as News[],
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

// SERVER-SIDE: Get single news
export async function getNewsById(id: number): Promise<News | null> {
  const news = await prisma.news.findUnique({
    where: { id },
  });

  if (!news) return null;

  return {
    ...news,
    tags: Array.isArray(news.tags) ? news.tags : [],
  } as News;
}

// CLIENT-SIDE: Create news
export async function createNews(data: any): Promise<News> {
  const response = await fetch("/api/news", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create news");
  }

  const result = await response.json();
  return result.data;
}

// CLIENT-SIDE: Update news
export async function updateNews(id: number, data: any): Promise<News> {
  const response = await fetch(`/api/news/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update news");
  }

  const result = await response.json();
  return result.data;
}

// CLIENT-SIDE: Delete news
export async function deleteNews(id: number): Promise<void> {
  const response = await fetch(`/api/news/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete news");
  }
}
