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
        <div className="row">
            <div className="col-lg-12">
                <div className="user-card">
                    <h4 className="user-card-title">Edit Gallery Image</h4>
                    <div className="user-form">
                        <EditGalleryForm item={item} />
                    </div>
                </div>
            </div>
        </div>
    );
}