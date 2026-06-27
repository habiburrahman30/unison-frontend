
import { notFound } from "next/navigation";

import EditNewsForm from "@/components/dashboard/EditNewsForm";
import { getNewsById } from "@/lib/api/news";
import { getNewsCategories } from "@/lib/api/news-categories";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function EditNewsPage({ params }: PageProps) {
    const { id } = await params;

    const [news, categoriesData] = await Promise.all([
        getNewsById(Number(id)),
        getNewsCategories(),
    ]);

    if (!news) notFound();

    return (

        <div className="row">
            <div className="col-lg-12">
                <div className="user-card">
                    <h4 className="user-card-title">Edit News</h4>
                    <div className="user-form">
                        <EditNewsForm news={news} categories={categoriesData.categories} />
                    </div>
                </div>
            </div>
        </div>


    );
}
