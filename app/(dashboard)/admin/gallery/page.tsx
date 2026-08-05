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
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <h4 className="text-lg font-semibold text-slate-900">Gallery</h4>
                <Link
                    href="/admin/gallery/create"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
                >
                    <span className="far fa-plus-circle" />
                    Add Image
                </Link>
            </div>

            {data.data.length === 0 ? (
                <div className="px-5 py-14 text-center">
                    <i className="far fa-images mb-3 text-3xl text-slate-300" />
                    <p className="text-sm text-slate-500">No gallery items found.</p>
                </div>
            ) : (
                <GalleryTable items={data.data} pagination={data.pagination} />
            )}
        </div>
    );
}