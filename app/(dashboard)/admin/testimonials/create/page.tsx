
import CreateTestimonialForm from "@/components/dashboard/CreateTestimonialForm";



export default function CreateTestimonialPage() {
    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="user-card">
                    <h4 className="user-card-title">Create Testimonial</h4>
                    <div className="user-form">
                        <CreateTestimonialForm />
                    </div>
                </div>
            </div>
        </div>
    );
}