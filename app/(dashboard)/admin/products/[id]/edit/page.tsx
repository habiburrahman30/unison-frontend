import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditProductForm from "@/components/dashboard/EditProductForm";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

// Helper function to serialize product
function serializeProduct(product: any) {
    return {
        ...product,
        price: Number(product.price),
        old_price: product.old_price ? Number(product.old_price) : null,
        created_at: product.created_at?.toISOString(),
        updated_at: product.updated_at?.toISOString(),
    };
}

export default async function EditProductPage({ params }: PageProps) {
    const { id } = await params;
    const productId = parseInt(id);

    if (isNaN(productId)) {
        notFound();
    }

    const [product, categories, brands] = await Promise.all([
        prisma.product.findUnique({
            where: { id: productId },
            include: {
                category: true,
                brand: true,
            },
        }),
        prisma.category.findMany({
            orderBy: { name: "asc" },
        }),
        prisma.brand.findMany({
            orderBy: { name: "asc" },
        }),
    ]);

    if (!product) {
        notFound();
    }

    // Serialize the product to convert Decimal to number
    const serializedProduct = serializeProduct(product);

    return (
        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-6 py-4">
                <h4 className="text-lg font-semibold text-slate-900">Edit Product</h4>
            </div>
            <div className="p-6 dash-form">
                <EditProductForm
                    product={serializedProduct}
                    categories={categories}
                    brands={brands}
                />
            </div>
        </div>
    );
}