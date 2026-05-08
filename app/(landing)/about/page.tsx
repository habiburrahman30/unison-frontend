
"use client"

import { Testimonial } from "@/lib/api/testimonials";
import { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

export default function AboutPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);



    useEffect(() => {
        // Fetch Testimonial
        fetch("/api/testimonials?is_active=true&limit=100")
            .then((res) => res.json())
            .then((data) => setTestimonials(data.data.testimonials || []));




    }, []);
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

    return <>
        <main className="main">
            {/* breadcrumb */}
            <div className="site-breadcrumb">
                <div
                    className="site-breadcrumb-bg"
                    style={{ background: "url(/assets/img/breadcrumb/01.jpg)" }}
                />
                <div className="container">
                    <div className="site-breadcrumb-wrap">
                        <h4 className="breadcrumb-title">About Us</h4>
                        <ul className="breadcrumb-menu">
                            <li>
                                <a href={"/"}>
                                    <i className="far fa-home" /> Home
                                </a>
                            </li>
                            <li className="active">About Us</li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* breadcrumb end */}
            {/* about area */}
            <div className="about-area py-100">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="about-left wow fadeInLeft" data-wow-delay=".25s">
                                <div className="about-img">
                                    <div className="row">
                                        <div className="col-7">
                                            <img className="img-1" src="/assets/img/about/01.jpg" alt="" />
                                        </div>
                                        <div className="col-5 align-self-end">
                                            <img className="img-2" src="/assets/img/about/04.jpeg" alt="" />
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="about-experience">
                                    <div className="about-experience-icon">
                                        <img src="/assets/img/icon/experience.svg" alt="" />
                                    </div>
                                    <b>
                                        30 Years Of <br /> Experience
                                    </b>
                                </div> */}
                                <div className="about-shape">
                                    <img src="/assets/img/shape/01.png" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="about-right wow fadeInRight" data-wow-delay=".25s">
                                <div className="site-heading mb-3">
                                    <span className="site-title-tagline justify-content-start">
                                        <i className="flaticon-drive" /> About Us
                                    </span>
                                    <h2 className="site-title">
                                        Unison Biz Limited Provide Best Medical Equipment & <span>Healthcare</span> Technology For You.
                                    </h2>
                                </div>
                                <div className="max-w-4xl mx-auto p-6 text-[22px] leading-relaxed font-serif text-black">
                                    {/* Company Information */}
                                    <div className="mb-10 space-y-1">
                                        <p>
                                            <strong>Name of the Company:</strong> UNISON BIZ LIMITED
                                        </p>

                                        <p>
                                            <strong>Incorporated Under:</strong> The Companies Act (XVIII) of 1994
                                        </p>

                                        <p>
                                            <strong>Company Structure:</strong> Private Limited Company
                                        </p>

                                        <p>
                                            <strong>Year of Foundation:</strong> 2016
                                        </p>

                                        <p>
                                            <strong>Year of Incorporation as Limited:</strong> 2019
                                        </p>

                                        <p>
                                            <strong>Membership:</strong> Bangladesh Medical Instrument & Hospital
                                            Equipment Dealers and Manufacturers Association
                                        </p>
                                    </div>

                                    <p className="mb-3">
                                        <strong>UNISON BIZ LIMITED</strong> is a leading provider of advanced and
                                        sophisticated medical technology solutions in Bangladesh. The company
                                        specializes in the <strong>supply, installation, servicing, and technical support</strong> of
                                        cutting-edge electro-medical equipment and healthcare technologies.
                                    </p>

                                    <p className="mb-3">
                                        Since its inception, Unison Biz Limited has been committed to delivering{" "}
                                        <strong>high-quality products and dependable services</strong> that enhance
                                        the effectiveness and efficiency of healthcare institutions across the
                                        nation. Guided by strong corporate philosophy and brand commitment, the
                                        company strives to be a trusted and respected name among{" "}
                                        <strong>employees, business partners, clients, and society.</strong>
                                    </p>

                                    <p className="mb-3">
                                        Unison Biz Limited imports high-end medical equipment and technologies
                                        from the <strong>United Kingdom, the United States, China, India, and other European countries</strong>,
                                        ensuring that healthcare professionals in Bangladesh have access to
                                        globally recognized and reliable medical solutions.
                                    </p>

                                    <p className="mb-3">
                                        The company is supported by a team of{" "}
                                        <strong>26 experienced professionals</strong>, including{" "}
                                        <strong>six qualified engineers</strong> (postgraduate, graduate, and
                                        diploma holders) and a group of skilled{" "}
                                        <strong>technical service specialists</strong>, backed by dedicated teams
                                        managing <strong>sales, administration, and finance.</strong>
                                    </p>

                                    <p className="mb-3">
                                        Over the years, Unison Biz Limited has successfully served{" "}
                                        <strong>
                                            tertiary-level referral medical college hospitals, district hospitals,
                                            500-bed secondary-level project hospitals,
                                        </strong>{" "}
                                        as well as numerous <strong>private clinics and diagnostic centers</strong>{" "}
                                        across Bangladesh.
                                    </p>

                                    <p>
                                        With a strong focus on <strong>innovation, quality assurance, and customer satisfaction</strong>,
                                        Unison Biz Limited continues to play a vital role in{" "}
                                        <strong>advancing healthcare technology</strong> and contributing to the
                                        growth and modernization of Bangladesh’s medical infrastructure.
                                    </p>
                                </div>
                                {/* <div className="about-list">
                                    <ul>
                                        <li>
                                            <i className="fas fa-check-double" /> High-Quality Equipment
                                        </li>
                                        <li>
                                            <i className="fas fa-check-double" /> Advanced Technology
                                        </li>
                                        <li>
                                            <i className="fas fa-check-double" /> Trusted Partner
                                        </li>
                                        <li>
                                            <i className="fas fa-check-double" /> Commitment to Excellence
                                        </li>
                                    </ul>
                                </div>
                                <a href="contact.html" className="theme-btn mt-4">
                                    Discover More
                                    <i className="fas fa-arrow-right" />
                                </a> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* about area end */}
            {/* counter area */}
            {/* <div className="counter-area pt-50 pb-50">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-sm-6">
                            <div className="counter-box">
                                <div className="icon" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <img src="/assets/img/icon/sale.svg" alt="" />
                                </div>
                                <div className="counter-info">
                                    <div className="counter-amount">
                                        <span
                                            className="counter"
                                            data-count="+"
                                            data-to={50}
                                            data-speed={3000}
                                        >
                                            50
                                        </span>
                                        <span className="counter-sign">k</span>
                                    </div>
                                    <h6 className="title">Total Sales </h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="counter-box">
                                <div className="icon" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <img src="/assets/img/icon/rate.svg" alt="" />
                                </div>
                                <div className="counter-info">
                                    <div className="counter-amount">
                                        <span
                                            className="counter"
                                            data-count="+"
                                            data-to={90}
                                            data-speed={3000}
                                        >
                                            90
                                        </span>
                                        <span className="counter-sign">k</span>
                                    </div>
                                    <h6 className="title">Happy Clients</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="counter-box">
                                <div className="icon" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <img src="/assets/img/icon/employee.svg" alt="" />
                                </div>
                                <div className="counter-info">
                                    <div className="counter-amount">
                                        <span
                                            className="counter"
                                            data-count="+"
                                            data-to={150}
                                            data-speed={3000}
                                        >
                                            150
                                        </span>
                                        <span className="counter-sign">+</span>
                                    </div>
                                    <h6 className="title">Team Workers</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="counter-box">
                                <div className="icon" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <img src="/assets/img/icon/award.svg" alt="" />
                                </div>
                                <div className="counter-info">
                                    <div className="counter-amount">
                                        <span
                                            className="counter"
                                            data-count="+"
                                            data-to={30}
                                            data-speed={3000}
                                        >
                                            30
                                        </span>
                                        <span className="counter-sign">+</span>
                                    </div>
                                    <h6 className="title">Win Awards</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            {/* counter area end */}
            {/* testimonial area */}
            {testimonials.length > 0 && (
                <div className="testimonial-area ts-bg py-80">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 mx-auto wow fadeInDown" data-wow-delay=".25s">
                                <div className="site-heading text-center">
                                    <span className="site-title-tagline">Customers</span>
                                    <h2 className="site-title text-white">
                                        What Our Client Say's <span>About Us</span>
                                    </h2>
                                </div>
                            </div>
                        </div>

                        <Swiper
                            modules={[Autoplay, Pagination]}
                            spaceBetween={24}
                            slidesPerView={1}
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                            pagination={{ clickable: true }}
                            breakpoints={{
                                768: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                            }}
                            className="wow fadeInUp pb-12"
                            data-wow-delay=".25s"
                            style={{ paddingBottom: '50px' }}
                        >
                            {testimonials.slice(0, 10).map((item) => (
                                <SwiperSlide key={item.id}>
                                    <div className="testimonial-item" style={{ height: '100%', boxSizing: 'border-box' }}>
                                        <div className="testimonial-author">
                                            <div className="testimonial-author-img">
                                                <img
                                                    src={item.image || "/assets/img/no-image-found.jpg"}
                                                    alt={item.name || "No image"}

                                                    style={{
                                                        width: '60px',
                                                        height: '60px',
                                                        borderRadius: '50%',
                                                        objectFit: 'cover',
                                                        display: 'block',
                                                    }}
                                                />
                                            </div>
                                            <div className="testimonial-author-info">
                                                <h4>{item.name}</h4>
                                                <p>{item.designation}</p>
                                            </div>
                                        </div>
                                        <div className="testimonial-quote">
                                            <p>{item.message}</p>
                                        </div>
                                        <div className="testimonial-rate">
                                            {renderStars(item.rating)}
                                        </div>
                                        <div className="testimonial-quote-icon">
                                            <img src="/assets/img/icon/quote.svg" alt="quote" />
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            )}
            {/* testimonial area */}
            {/* video area */}
            <div className="video-area mb-80">
                <div className="container-fluid px-0">
                    <div
                        className="video-content"
                        style={{ backgroundImage: "url(/assets/img/video/01.jpg)" }}
                    >
                        <div className="video-wrapper">
                            <a
                                className="play-btn popup-youtube"
                                href="https://www.youtube.com/watch?v=ckHzmP1evNU"
                            >
                                <i className="fas fa-play" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* video area end */}


            {/* feature area end */}
            {/* instagram-area */}
            {/* <div className="instagram-area py-100">
                <div className="container wow fadeInUp" data-wow-delay=".25s">
                    <div className="row">
                        <div className="col-lg-6 mx-auto">
                            <div className="site-heading text-center">
                                <h2 className="site-title">
                                    Instagram <span>@medion</span>
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="instagram-slider owl-carousel owl-theme">
                        <div className="instagram-item">
                            <div className="instagram-img">
                                <img src="/assets/img/instagram/01.jpg" alt="Thumb" />
                                <a href="#">
                                    <i className="fab fa-instagram" />
                                </a>
                            </div>
                        </div>
                        <div className="instagram-item">
                            <div className="instagram-img">
                                <img src="/assets/img/instagram/02.jpg" alt="Thumb" />
                                <a href="#">
                                    <i className="fab fa-instagram" />
                                </a>
                            </div>
                        </div>
                        <div className="instagram-item">
                            <div className="instagram-img">
                                <img src="/assets/img/instagram/03.jpg" alt="Thumb" />
                                <a href="#">
                                    <i className="fab fa-instagram" />
                                </a>
                            </div>
                        </div>
                        <div className="instagram-item">
                            <div className="instagram-img">
                                <img src="/assets/img/instagram/04.jpg" alt="Thumb" />
                                <a href="#">
                                    <i className="fab fa-instagram" />
                                </a>
                            </div>
                        </div>
                        <div className="instagram-item">
                            <div className="instagram-img">
                                <img src="/assets/img/instagram/05.jpg" alt="Thumb" />
                                <a href="#">
                                    <i className="fab fa-instagram" />
                                </a>
                            </div>
                        </div>
                        <div className="instagram-item">
                            <div className="instagram-img">
                                <img src="/assets/img/instagram/06.jpg" alt="Thumb" />
                                <a href="#">
                                    <i className="fab fa-instagram" />
                                </a>
                            </div>
                        </div>
                        <div className="instagram-item">
                            <div className="instagram-img">
                                <img src="/assets/img/instagram/07.jpg" alt="Thumb" />
                                <a href="#">
                                    <i className="fab fa-instagram" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            {/* instagram-area end */}


        </main>
    </>;
}