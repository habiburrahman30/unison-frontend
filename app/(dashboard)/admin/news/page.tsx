

import NewsTable from "@/components/dashboard/NewsTable";
import { getNews } from "@/lib/api/news";


import Link from "next/link";

interface PageProps {
    searchParams: Promise<{
        page?: string;
        limit?: string;
        search?: string;
    }>;
}

export default async function NewsPage({ searchParams }: PageProps) {
    const params = await searchParams;

    const search = params.search || "";
    const page = Number(params.page) || 1;
    const limit = Number(params.limit) || 8;

    const data = await getNews({
        page,
        limit,
        search,
    });

    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="user-card">
                    <div className="user-card-header">
                        <h4 className="user-card-title">News</h4>
                        <div className="user-card-header-right">
                            <Link
                                href="/admin/news/create"
                                className="theme-btn"
                            >
                                <span className="far fa-plus-circle" />
                                Add News
                            </Link>

                        </div>
                    </div>

                    <NewsTable news={data.data} pagination={data.pagination} />

                </div>
            </div>
        </div>
    );
}
