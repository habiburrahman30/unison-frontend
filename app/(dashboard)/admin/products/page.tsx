
import { getProducts } from "@/lib/api/products";
import ProductsTable from "@/components/dashboard/ProductsTable";
import { Suspense, use } from "react";

interface PageProps {
    searchParams: Promise<{
        page?: string;
        search?: string;
        category_id?: string;
        brand_id?: string;
    }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {


    const params = await searchParams;

    const page = Number(params.page) || 1;
    const search = params.search || "";
    const categoryId = params.category_id ? Number(params.category_id) : undefined;
    const brandId = params.brand_id ? Number(params.brand_id) : undefined;

    const data = await getProducts({
        page,
        limit: 20,
        search,
        category_id: categoryId,
        brand_id: brandId,
    });

    // Serialize to plain objects (alternative method)
    const serializedData = JSON.parse(JSON.stringify(data));

    return (

        <div className="row">
            <div className="col-lg-12">
                <div className="user-card">
                    <div className="user-card-header">
                        <h4 className="user-card-title">Products</h4>
                        <div className="user-card-header-right">
                            <a
                                href="/admin/products/create"
                                className="theme-btn"
                            >
                                <span className="far fa-plus-circle" />
                                Add Product
                            </a>

                        </div>
                    </div>

                    <Suspense fallback={<div>Loading...</div>}>
                        <ProductsTable
                            products={serializedData.products}
                            pagination={serializedData.pagination}
                        />
                    </Suspense>

                </div>
            </div>
        </div>

    );
}
