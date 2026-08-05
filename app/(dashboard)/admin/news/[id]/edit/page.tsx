
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

        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-6 py-4">
                <h4 className="text-lg font-semibold text-slate-900">Edit News</h4>
            </div>
            <div className="p-6 dash-form">
                <EditNewsForm news={news} categories={categoriesData.categories} />
            </div>
        </div>


    );
}
