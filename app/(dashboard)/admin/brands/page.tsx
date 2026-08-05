import { getBrands } from "@/lib/api/brands";
import BrandsTable from "@/components/dashboard/BrandsTable";
import Link from "next/link";

interface PageProps {
    searchParams: Promise<{
        page?: string;
        limit?: string;
        search?: string;
    }>;
}

export default async function AdminBrandsPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const page = Number(params.page) || 1;
    const limit = Number(params.limit) || 8;
    const search = params.search || "";

    const data = await getBrands({
        page,
        limit,
        search,
    });

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <h4 className="text-lg font-semibold text-slate-900">Brands</h4>
                <Link
                    href="/admin/brands/create"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
                >
                    <span className="far fa-plus-circle" />
                    Add Brand
                </Link>
            </div>

            <BrandsTable brands={data.brands} pagination={data.pagination} />
        </div>
    );
}
