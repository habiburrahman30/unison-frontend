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
        <div className="p-4 mt-4 mb-4 bg-white border border-gray-200 hover:-translate-y-1 transition duration-300 rounded-lg shadow shadow-black/10 max-w-80">
            {/* Image */}
            <img
                className="w-full h-200 object-cover"
                src={testimonial.image || "/assets/img/no-image-found.jpg"}
                alt={testimonial.name || "No image"}
            />
            <p className="text-gray-900 text-xl font-semibold ml-2 mt-4">
                <p>{testimonial.name ?? ""}</p>

            </p>
            {renderStars(testimonial.rating)}
            <p className="text-sm text-gray-500">
                {testimonial.designation || ""}
            </p>

            <p className="text-gray-700 text-sm">
                {testimonial.message}
            </p>

        </div>
        // <div className="testimonial-item" key={testimonial.id}>
        //     <div className="testimonial-author">
        //         <div className="testimonial-author-img">
        //             {testimonial.image ? (
        //                 <img
        //                     src={testimonial.image}
        //                     alt={testimonial.name}
        //                 />
        //             ) : (
        //                 <div
        //                     className="testimonial-placeholder"
        //                     style={{
        //                         width: "60px",
        //                         height: "60px",
        //                         borderRadius: "50%",
        //                         backgroundColor: "#e0e0e0",
        //                         display: "flex",
        //                         alignItems: "center",
        //                         justifyContent: "center",
        //                         fontSize: "24px",
        //                         color: "#666",
        //                     }}
        //                 >
        //                     {testimonial.name.charAt(0).toUpperCase()}
        //                 </div>
        //             )
        //             }
        //         </div>

        //         <div className="testimonial-author-info">
        //             <h4>{testimonial.name}</h4>
        //             <p>{testimonial.designation ?? ""}</p>
        //         </div>
        //     </div>
        //     <div className="testimonial-quote">
        //         <p>
        //             {testimonial.message}
        //         </p>
        //     </div>
        //     <div className="testimonial-rate">
        //         {renderStars(testimonial.rating)}
        //     </div>
        //     <div className="testimonial-quote-icon">
        //         <img src="/assets/img/icon/quote.svg" alt={testimonial.name} />
        //     </div>
        // </div>



    );
}