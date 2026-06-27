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
        <div className="row">
            <div className="col-lg-12">
                <div className="user-card">
                    <h4 className="user-card-title">Edit News Category</h4>
                    <div className="user-form">
                        <EditNewsCategoryForm category={category} />
                    </div>
                </div>
            </div>
        </div>
    );
}