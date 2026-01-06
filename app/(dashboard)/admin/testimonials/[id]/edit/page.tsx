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
        <div className="row">
            <div className="col-lg-12">
                <div className="user-card">
                    <h4 className="user-card-title">Edit Testimonial</h4>
                    <div className="user-form">
                        <EditTestimonialForm testimonial={testimonial} />
                    </div>
                </div>
            </div>
        </div>
    );
}