import CategoriesTable from "@/components/dashboard/CategoriesTable";
import { getCategories } from "@/lib/api/categories";

import Link from "next/link";

interface PageProps {
    searchParams: Promise<{
        page?: string;
        search?: string;
    }>;
}

export default async function AdminCategoriesPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const page = Number(params.page) || 1;
    const search = params.search || "";

    const data = await getCategories({
        page,
        limit: 20,
        search,
    });
    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="user-card">
                    <div className="user-card-header">
                        <h4 className="user-card-title">Categories</h4>
                        <div className="user-card-header-right">
                            <Link
                                href="/admin/categories/create"
                                className="theme-btn"
                            >
                                <span className="far fa-plus-circle" />
                                Add Category
                            </Link>

                        </div>
                    </div>

                    <CategoriesTable categories={data.categories} pagination={data.pagination} />

                </div>
            </div>
        </div>
    );
}
