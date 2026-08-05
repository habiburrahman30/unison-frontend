import { notFound } from "next/navigation";
import { getGalleryItemById } from "@/lib/api/gallery";
import EditGalleryForm from "@/components/dashboard/EditGalleryForm";


interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function EditGalleryPage({ params }: PageProps) {
    const { id } = await params;
    const item = await getGalleryItemById(Number(id));

    if (!item) notFound();

    return (
        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-6 py-4">
                <h4 className="text-lg font-semibold text-slate-900">Edit Gallery Image</h4>
            </div>
            <div className="p-6 dash-form">
                <EditGalleryForm item={item} />
            </div>
        </div>
    );
}