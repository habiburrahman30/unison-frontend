import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditBrandForm from "@/components/dashboard/EditBrandForm";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditBrandPage({ params }: PageProps) {
    const { id } = await params;
    const brandId = parseInt(id);

    if (isNaN(brandId)) {
        notFound();
    }

    const brand = await prisma.brand.findUnique({
        where: { id: brandId },
    });

    if (!brand) {
        notFound();
    }

    return (
        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-6 py-4">
                <h4 className="text-lg font-semibold text-slate-900">Edit Brand</h4>
            </div>
            <div className="p-6 dash-form">
                <EditBrandForm brand={brand} />
            </div>
        </div>
    );
}