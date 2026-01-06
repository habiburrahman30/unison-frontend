import { getBrands } from "@/lib/api/brands";
import BrandsTable from "@/components/dashboard/BrandsTable";
import Link from "next/link";

interface PageProps {
    searchParams: Promise<{
        page?: string;
        search?: string;
    }>;
}

export default async function AdminTeamsPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const page = Number(params.page) || 1;
    const search = params.search || "";

    const data = await getBrands({
        page,
        limit: 20,
        search,
    });

    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="user-card">
                    <div className="user-card-header">
                        <h4 className="user-card-title">Teams</h4>
                        <div className="user-card-header-right">
                            <Link
                                href="/admin/teams/create"
                                className="theme-btn"
                            >
                                <span className="far fa-plus-circle" />
                                Add Team
                            </Link>

                        </div>
                    </div>

                    <BrandsTable brands={data.brands} pagination={data.pagination} />

                </div>
            </div>
        </div>
    );
}
