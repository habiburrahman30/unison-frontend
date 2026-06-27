import Link from "next/link";
import { getGalleryItems } from "@/lib/api/gallery";
import GalleryTable from "@/components/dashboard/GalleryTable";


interface PageProps {
    searchParams: Promise<{ page?: string; limit?: string; search?: string }>;
}

export default async function AdminGalleryPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const page = Number(params.page) || 1;
    const limit = Number(params.limit) || 10;
    const search = params.search || "";

    const data = await getGalleryItems({ page, limit, search });

    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="user-card">

                    <div className="user-card-header">
                        <h4 className="user-card-title">Gallery</h4>
                        <div className="user-card-header-right">
                            <Link
                                href="/admin/gallery/create"
                                className="theme-btn"
                            >
                                <span className="far fa-plus-circle" />
                                Add Image
                            </Link>

                        </div>
                    </div>
                    <div className="user-form">
                        {data.data.length === 0 ? (
                            <div className="text-center py-5">
                                <p className="text-muted">No gallery items found.</p>
                            </div>
                        ) : (
                            <GalleryTable items={data.data} pagination={data.pagination} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}