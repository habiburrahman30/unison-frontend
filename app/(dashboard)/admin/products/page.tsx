
import { getProducts } from "@/lib/api/products";
import ProductsTable from "@/components/dashboard/ProductsTable";
import { Suspense, use } from "react";

interface PageProps {
    searchParams: Promise<{
        page?: string;
        limit?: string;
        search?: string;
        category_id?: string;
        brand_id?: string;
    }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {


    const params = await searchParams;

    const page = Number(params.page) || 1;
    const limit = Number(params.limit) || 10;
    const search = params.search || "";
    const categoryId = params.category_id ? Number(params.category_id) : undefined;
    const brandId = params.brand_id ? Number(params.brand_id) : undefined;

    const data = await getProducts({
        page,
        limit,
        search,
        category_id: categoryId,
        brand_id: brandId,
    });

    // Serialize to plain objects (alternative method)
    const serializedData = JSON.parse(JSON.stringify(data));

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <h4 className="text-lg font-semibold text-slate-900">Products</h4>
                <a
                    href="/admin/products/create"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
                >
                    <span className="far fa-plus-circle" />
                    Add Product
                </a>
            </div>

            <Suspense fallback={<div className="p-6 text-sm text-slate-500">Loading…</div>}>
                <ProductsTable
                    products={serializedData.products}
                    pagination={serializedData.pagination}
                />
            </Suspense>
        </div>
    );
}
