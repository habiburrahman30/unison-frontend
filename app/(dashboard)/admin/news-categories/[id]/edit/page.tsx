import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditNewsCategoryForm from "@/components/dashboard/EditNewsCategoryForm";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditNewsCategoryPage({ params }: PageProps) {
    const { id } = await params;
    const categoryId = parseInt(id);

    if (isNaN(categoryId)) {
        notFound();
    }

    const category = await prisma.newsCategory.findUnique({
        where: { id: categoryId },
    });

    if (!category) {
        notFound();
    }

    return (
        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-6 py-4">
                <h4 className="text-lg font-semibold text-slate-900">Edit News Category</h4>
            </div>
            <div className="p-6 dash-form">
                <EditNewsCategoryForm category={category} />
            </div>
        </div>
    );
}