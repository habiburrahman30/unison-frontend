

import NewsCategoriesTable from "@/components/dashboard/NewsCategoriesTable";
import { getNewsCategories } from "@/lib/api/news-categories";


import Link from "next/link";

interface PageProps {
    searchParams: Promise<{
        page?: string;
        limit?: string;
        search?: string;
    }>;
}

export default async function NewsCategoriesPage({ searchParams }: PageProps) {
    const params = await searchParams;

    const search = params.search || "";
    const page = Number(params.page) || 1;
    const limit = Number(params.limit) || 8;

    const data = await getNewsCategories({
        page,
        limit,
        search,
    });
    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="user-card">
                    <div className="user-card-header">
                        <h4 className="user-card-title">News Categories</h4>
                        <div className="user-card-header-right">
                            <Link
                                href="/admin/news-categories/create"
                                className="theme-btn"
                            >
                                <span className="far fa-plus-circle" />
                                Add News Category
                            </Link>

                        </div>
                    </div>

                    <NewsCategoriesTable categories={data.categories} pagination={data.pagination} />

                </div>
            </div>
        </div>
    );
}
