import { getBrands } from "@/lib/api/brands";

import Link from "next/link";
import { getTestimonials } from "@/lib/api/testimonials";
import TestimonialsTable from "@/components/dashboard/TestimonialsTable";

interface PageProps {
    searchParams: Promise<{
        page?: string;
        search?: string;
    }>;
}

export default async function AdminTestimonialsPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const page = Number(params.page) || 1;
    const search = params.search || "";

    const data = await getTestimonials({
        page,
        limit: 20,
        search,
    });

    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="user-card">
                    <div className="user-card-header">
                        <h4 className="user-card-title">Testimonials</h4>
                        <div className="user-card-header-right">
                            <Link
                                href="/admin/testimonials/create"
                                className="theme-btn"
                            >
                                <span className="far fa-plus-circle" />
                                Add Testimonial
                            </Link>

                        </div>
                    </div>

                    <TestimonialsTable
                        testimonials={data.testimonials}
                        pagination={data.pagination}
                    />

                </div>
            </div>
        </div>
    );
}
