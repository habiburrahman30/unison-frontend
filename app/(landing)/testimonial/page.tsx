import TestimonialCard from "@/components/landing/TestimonialCard";
import { getTestimonials } from "@/lib/api/testimonials";

export default async function TestimonialPage() {
    const data = await getTestimonials({
        is_active: true,
        limit: 100,
    });

    return (
        <><main className="main">
            {/* breadcrumb */}
            <div className="site-breadcrumb">
                <div
                    className="site-breadcrumb-bg"
                    style={{ background: "url(/assets/img/breadcrumb/01.jpg)" }}
                />
                <div className="container">
                    <div className="site-breadcrumb-wrap">
                        <h4 className="breadcrumb-title">Testimonials</h4>
                        <ul className="breadcrumb-menu">
                            <li>
                                <a href={"/"}>
                                    <i className="far fa-home" /> Home
                                </a>
                            </li>
                            <li className="active">Testimonials</li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* breadcrumb end */}
            {/* testimonial area */}
            {/* <div className="row g-4 mt-5">
                
                    <div className="col-md-6 col-lg-4" key={testimonial.id}>
                        <TestimonialCard testimonial={testimonial} />
                    </div>
                
            </div> */}

            {data.testimonials.length > 0 && (
                <div className="testimonial-area bg py-80">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 mx-auto wow fadeInDown" data-wow-delay=".25s">
                                <div className="site-heading text-center">
                                    <span className="site-title-tagline">Testimonials</span>
                                    <h2 className="site-title">
                                        What Our Client Say's <span>About Us</span>
                                    </h2>
                                </div>
                            </div>
                        </div>
                        <div
                            className="testimonial-slider owl-carousel owl-theme wow fadeInUp"
                            data-wow-delay=".25s"
                        >
                            {data.testimonials.map((testimonial) => (
                                <TestimonialCard
                                    key={testimonial.id}
                                    testimonial={testimonial}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {data.testimonials.length === 0 && (
                <div className="text-center py-5">
                    <p className="text-muted">No testimonials available at the moment.</p>
                </div>
            )}
            {/* testimonial area end */}
        </main>
        </>
    );
}