import EditTestimonialForm from "@/components/dashboard/EditTestimonialForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";


interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditTestimonialPage({ params }: PageProps) {
    const { id } = await params;
    const testimonialId = parseInt(id);

    if (isNaN(testimonialId)) {
        notFound();
    }

    const testimonial = await prisma.testimonial.findUnique({
        where: { id: testimonialId },
    });

    if (!testimonial) {
        notFound();
    }

    return (
        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-6 py-4">
                <h4 className="text-lg font-semibold text-slate-900">Edit Customer</h4>
            </div>
            <div className="p-6 dash-form">
                <EditTestimonialForm testimonial={testimonial} />
            </div>
        </div>
    );
}