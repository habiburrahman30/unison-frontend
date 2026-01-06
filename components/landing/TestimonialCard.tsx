import type { Testimonial } from "@/lib/api/testimonials";
import Image from "next/image";
interface Props {
    testimonial: Testimonial;
    key: number;
}

export default function TestimonialCard({ testimonial, key }: Props) {

    const renderStars = (rating: number) => {
        return (
            <div className="testimonial-rating">
                {[...Array(5)].map((_, i) => (
                    <i
                        key={i}
                        className={`fa${i < rating ? "s" : "r"} fa-star`}
                        style={{ color: "#ffa500" }}
                    ></i>
                ))}
            </div>
        );
    };

    return (

        <div className="testimonial-item" key={testimonial.id}>
            <div className="testimonial-author">
                <div className="testimonial-author-img">
                    {testimonial.image ? (
                        <img
                            src={testimonial.image}
                            alt={testimonial.name}
                        />
                    ) : (
                        <div
                            className="testimonial-placeholder"
                            style={{
                                width: "60px",
                                height: "60px",
                                borderRadius: "50%",
                                backgroundColor: "#e0e0e0",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "24px",
                                color: "#666",
                            }}
                        >
                            {testimonial.name.charAt(0).toUpperCase()}
                        </div>
                    )
                    }
                </div>

                <div className="testimonial-author-info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.designation ?? ""}</p>
                </div>
            </div>
            <div className="testimonial-quote">
                <p>
                    {testimonial.message}
                </p>
            </div>
            <div className="testimonial-rate">
                {renderStars(testimonial.rating)}
            </div>
            <div className="testimonial-quote-icon">
                <img src="/assets/img/icon/quote.svg" alt={testimonial.name} />
            </div>
        </div>



    );
}