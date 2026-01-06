import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditBrandForm from "@/components/dashboard/EditBrandForm";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditGalleryPage({ params }: PageProps) {
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
        <div className="row">
            <div className="col-lg-12">
                <div className="user-card">
                    <h4 className="user-card-title">Edit Gallery</h4>
                    <div className="user-form">
                        <EditBrandForm brand={brand} />
                    </div>
                </div>
            </div>
        </div>
    );
}