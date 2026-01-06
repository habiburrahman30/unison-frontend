import Link from "next/link";

export default function NotFound() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6 text-center py-5">
                    <h1 className="display-1">404</h1>
                    <h2>Testimonial Not Found</h2>
                    <p className="text-muted">
                        The testimonial you're looking for doesn't exist.
                    </p>
                    <Link href="/admin/testimonials" className="theme-btn mt-3">
                        <i className="far fa-arrow-left me-2"></i>
                        Back to Testimonials
                    </Link>
                </div>
            </div>
        </div>
    );
}