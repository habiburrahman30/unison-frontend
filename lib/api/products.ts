import { prisma } from "@/lib/prisma";
import { Prisma, Product } from "@prisma/client";

export interface ProductWithRelations {
  id: number;
  name: string;
  slug: string;
  manufacturer: string;
  country_of_origin: string;
  product_url: string;
  product_description: string;
  technical_description: string | null;
  price: number; // Changed from Decimal
  old_price: number | null; // Changed from Decimal
  stock: number;
  is_trending: boolean;
  images: string[];
  category_id: number;
  brand_id: number;
  created_at: Date;
  updated_at: Date;
  category: {
    id: number;
    name: string;
  };
  brand: {
    id: number;
    name: string;
  };
}

export interface ProductsResponse {
  products: ProductWithRelations[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface GetProductsParams {
  page?: number;
  limit?: number;
  category_id?: number;
  brand_id?: number;
  is_trending?: boolean;
  search?: string;
}

// Helper function to serialize product data
function serializeProduct(product: any): ProductWithRelations {
  return {
    ...product,
    price: Number(product.price),
    old_price: product.old_price ? Number(product.old_price) : null,
    created_at: new Date(product.created_at),
    updated_at: new Date(product.updated_at),
  };
}

// SERVER-SIDE: Fetch products with filters (using Prisma)
export async function getProducts(
  params?: GetProductsParams
): Promise<ProductsResponse> {
  const page = params?.page || 1;
  const limit = params?.limit || 10;

  const where: Prisma.ProductWhereInput = {};

  if (params?.category_id) where.category_id = params.category_id;
  if (params?.brand_id) where.brand_id = params.brand_id;
  if (params?.is_trending) where.is_trending = true;

  if (params?.search) {
    where.OR = [
      { name: { contains: params.search, mode: "insensitive" } },
      { manufacturer: { contains: params.search, mode: "insensitive" } },
      { product_description: { contains: params.search, mode: "insensitive" } },
    ];
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        brand: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { created_at: "desc" },
    }),
    prisma.product.count({ where }),
  ]);

  // Serialize products to convert Decimal to number
  const serializedProducts = products.map(serializeProduct);

  return {
    products: serializedProducts,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

// SERVER-SIDE: Fetch single product by ID
export async function getProductById(
  id: number
): Promise<ProductWithRelations | null> {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      brand: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (!product) return null;

  return serializeProduct(product);
}

// SERVER-SIDE: Fetch single product by slug
export async function getProductBySlug(
  slug: string
): Promise<ProductWithRelations | null> {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      brand: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (!product) return null;

  return serializeProduct(product);
}

// SERVER-SIDE: Fetch trending products
export async function getTrendingProducts(
  limit: number = 10
): Promise<ProductWithRelations[]> {
  const products = await prisma.product.findMany({
    where: { is_trending: true },
    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      brand: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    take: limit,
    orderBy: { created_at: "desc" },
  });

  return products.map(serializeProduct);
}

// CLIENT-SIDE: Functions for client components (using fetch)
export async function createProduct(data: any): Promise<ProductWithRelations> {
  console.log(data);
  const response = await fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create product");
  }

  const result = await response.json();
  return result.data;
}

export async function updateProduct(
  id: number,
  data: any
): Promise<ProductWithRelations> {
  const response = await fetch(`/api/products/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update product");
  }

  const result = await response.json();
  return result.data;
}

export async function deleteProduct(id: number): Promise<void> {
  const response = await fetch(`/api/products/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete product");
  }
}
