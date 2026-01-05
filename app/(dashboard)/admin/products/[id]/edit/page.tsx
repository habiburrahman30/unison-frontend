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
        <div className="row">
            <div className="col-lg-12">
                <div className="user-card">
                    <h4 className="user-card-title">Edit Product</h4>
                    <div className="user-form">
                        <EditProductForm
                            product={serializedProduct}
                            categories={categories}
                            brands={brands}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}