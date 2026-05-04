export default function AboutPage() {
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
                                            <img className="img-2" src="/assets/img/about/02.jpg" alt="" />
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
                                        We Provide Best Medical Equipment & <span>Healthcare</span> Technology For You.
                                    </h2>
                                </div>
                                <p>
                                    Committed to excellence in healthcare, we provide reliable medical equipment and advanced technology solutions for hospitals, clinics, and healthcare institutions.
                                </p>
                                <div className="about-list">
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
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* about area end */}
            {/* counter area */}
            <div className="counter-area pt-50 pb-50">
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
            </div>
            {/* counter area end */}
            {/* testimonial area */}
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
                        <div className="testimonial-item">
                            <div className="testimonial-author">
                                <div className="testimonial-author-img">
                                    <img src="/assets/img/testimonial/01.jpg" alt="" />
                                </div>
                                <div className="testimonial-author-info">
                                    <h4>Sylvia H Green</h4>
                                    <p>Customer</p>
                                </div>
                            </div>
                            <div className="testimonial-quote">
                                <p>
                                    There are many variations of long passages available but the
                                    content majority have suffered to the editor page when looking at
                                    its layout alteration in some injected.
                                </p>
                            </div>
                            <div className="testimonial-rate">
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                            </div>
                            <div className="testimonial-quote-icon">
                                <img src="/assets/img/icon/quote.svg" alt="" />
                            </div>
                        </div>
                        <div className="testimonial-item">
                            <div className="testimonial-author">
                                <div className="testimonial-author-img">
                                    <img src="/assets/img/testimonial/02.jpg" alt="" />
                                </div>
                                <div className="testimonial-author-info">
                                    <h4>Gordo Novak</h4>
                                    <p>Customer</p>
                                </div>
                            </div>
                            <div className="testimonial-quote">
                                <p>
                                    There are many variations of long passages available but the
                                    content majority have suffered to the editor page when looking at
                                    its layout alteration in some injected.
                                </p>
                            </div>
                            <div className="testimonial-rate">
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                            </div>
                            <div className="testimonial-quote-icon">
                                <img src="/assets/img/icon/quote.svg" alt="" />
                            </div>
                        </div>
                        <div className="testimonial-item">
                            <div className="testimonial-author">
                                <div className="testimonial-author-img">
                                    <img src="/assets/img/testimonial/03.jpg" alt="" />
                                </div>
                                <div className="testimonial-author-info">
                                    <h4>Reid E Butt</h4>
                                    <p>Customer</p>
                                </div>
                            </div>
                            <div className="testimonial-quote">
                                <p>
                                    There are many variations of long passages available but the
                                    content majority have suffered to the editor page when looking at
                                    its layout alteration in some injected.
                                </p>
                            </div>
                            <div className="testimonial-rate">
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                            </div>
                            <div className="testimonial-quote-icon">
                                <img src="/assets/img/icon/quote.svg" alt="" />
                            </div>
                        </div>
                        <div className="testimonial-item">
                            <div className="testimonial-author">
                                <div className="testimonial-author-img">
                                    <img src="/assets/img/testimonial/04.jpg" alt="" />
                                </div>
                                <div className="testimonial-author-info">
                                    <h4>Parker Jimenez</h4>
                                    <p>Customer</p>
                                </div>
                            </div>
                            <div className="testimonial-quote">
                                <p>
                                    There are many variations of long passages available but the
                                    content majority have suffered to the editor page when looking at
                                    its layout alteration in some injected.
                                </p>
                            </div>
                            <div className="testimonial-rate">
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                            </div>
                            <div className="testimonial-quote-icon">
                                <img src="/assets/img/icon/quote.svg" alt="" />
                            </div>
                        </div>
                        <div className="testimonial-item">
                            <div className="testimonial-author">
                                <div className="testimonial-author-img">
                                    <img src="/assets/img/testimonial/05.jpg" alt="" />
                                </div>
                                <div className="testimonial-author-info">
                                    <h4>Heruli Nez</h4>
                                    <p>Customer</p>
                                </div>
                            </div>
                            <div className="testimonial-quote">
                                <p>
                                    There are many variations of long passages available but the
                                    content majority have suffered to the editor page when looking at
                                    its layout alteration in some injected.
                                </p>
                            </div>
                            <div className="testimonial-rate">
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                            </div>
                            <div className="testimonial-quote-icon">
                                <img src="/assets/img/icon/quote.svg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* testimonial area end */}
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