import TestimonialCard from "@/components/landing/TestimonialCard";
import TestimonialSlider from "@/components/landing/TestimonialSlider";
import { getTestimonials } from "@/lib/api/testimonials";

export default async function TestimonialPage() {
    const data = await getTestimonials({
        is_active: true,
        limit: 100,
    });
    const customers = [
        { id: 1, name: "Ayesha Rahman", img: "https://i.pravatar.cc/150?img=1" },
        { id: 2, name: "Tanvir Hasan", img: "https://i.pravatar.cc/150?img=2" },
        { id: 3, name: "Nusrat Jahan", img: "https://i.pravatar.cc/150?img=3" },
        { id: 4, name: "Rahim Uddin", img: "https://i.pravatar.cc/150?img=4" },
    ];
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
                        <h4 className="breadcrumb-title">Customers</h4>
                        <ul className="breadcrumb-menu">
                            <li>
                                <a href={"/"}>
                                    <i className="far fa-home" /> Home
                                </a>
                            </li>
                            <li className="active">Customers</li>
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
                                    <span className="site-title-tagline">Customers</span>
                                    <h2 className="site-title">
                                        What Our Client Say's <span>About Us</span>
                                    </h2>
                                </div>
                            </div>
                        </div>
                        {/* Client component for Swiper */}
                        <TestimonialSlider testimonials={data.testimonials} />
                        {/* <div
                            className="testimonial-slider owl-carousel owl-theme wow fadeInUp"
                            data-wow-delay=".25s"
                        >
                            {data.testimonials.map((testimonial) => (
                                <TestimonialCard
                                    key={testimonial.id}
                                    testimonial={testimonial}
                                />
                            ))}
                        </div> */}
                    </div>
                </div>
            )}
            {data.testimonials.length === 0 && (
                <div className="text-center py-5">
                    <p className="text-muted">No testimonials available at the moment.</p>
                </div>
            )}
            {/* testimonial area end */}



            {/* <div className="p-4 bg-white border border-gray-200 hover:-translate-y-1 transition duration-300 rounded-lg shadow shadow-black/10 max-w-80">
                <img className="rounded-md max-h-40 w-full object-cover" src="https://images.unsplash.com/photo-1560264418-c4445382edbc?q=80&w=400" alt="officeImage" />
                <p className="text-gray-900 text-xl font-semibold ml-2 mt-4">
                    Your Card Title
                </p>

            </div> */}

        </main>
        </>
    );
}