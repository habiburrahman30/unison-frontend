import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditCategoryForm from "@/components/dashboard/EditCategoryForm";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditCategoryPage({ params }: PageProps) {
    const { id } = await params;
    const categoryId = parseInt(id);

    if (isNaN(categoryId)) {
        notFound();
    }

    const category = await prisma.category.findUnique({
        where: { id: categoryId },
    });

    if (!category) {
        notFound();
    }

    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="user-card">
                    <h4 className="user-card-title">Edit Category</h4>
                    <div className="user-form">
                        <EditCategoryForm category={category} />
                    </div>
                </div>
            </div>
        </div>
    );
}