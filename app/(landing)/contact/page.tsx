

export default function ContactPage() {
    return (
        <>

            <main className="main">
                {/* breadcrumb */}
                <div className="site-breadcrumb">
                    <div
                        className="site-breadcrumb-bg"
                        style={{ background: "url(/assets/img/breadcrumb/01.jpg)" }}
                    />
                    <div className="container">
                        <div className="site-breadcrumb-wrap">
                            <h4 className="breadcrumb-title">Contact Us</h4>
                            <ul className="breadcrumb-menu">
                                <li>
                                    <a href={"/"}>
                                        <i className="far fa-home" /> Home
                                    </a>
                                </li>
                                <li className="active">Contact Us</li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* breadcrumb end */}
                {/* contact area */}
                <div className="contact-area pt-100 pb-80">
                    <div className="container">
                        <div className="contact-wrapper">
                            <div className="row">
                                <div className="col-lg-5">
                                    <div className="contact-content">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="contact-info">
                                                    <div className="contact-info-icon">
                                                        <i className="fal fa-map-location-dot" />
                                                    </div>
                                                    <div className="contact-info-content">
                                                        <h5>Sales Office & Mailing Address</h5>
                                                        <p>House: 25, Road: 09, Block: H, Mirpur -2, Dhaka-1216 Bangladesh</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="contact-info">
                                                    <div className="contact-info-icon">
                                                        <i className="fal fa-headset" />
                                                    </div>
                                                    <div className="contact-info-content">
                                                        <h5>Call Us</h5>
                                                        <p>+880-1714112027</p>
                                                        <p>+880-1714112023</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="contact-info">
                                                    <div className="contact-info-icon">
                                                        <i className="fal fa-envelopes" />
                                                    </div>
                                                    <div className="contact-info-content">
                                                        <h5>Email Us</h5>
                                                        <p>
                                                            <a
                                                                href="info@unisonbizltd.com.bd" target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="__cf_email__"
                                                            >
                                                                info@unisonbizltd.com.bd
                                                            </a>
                                                        </p>
                                                        <p>
                                                            <a
                                                                href="saiful.hasan@unisonbizltd.com.bd" target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="__cf_email__"
                                                            >
                                                                saiful.hasan@unisonbizltd.com.bd
                                                            </a>
                                                        </p>
                                                        <p>
                                                            <a
                                                                href="unisonbizbd@gmail.com" target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="__cf_email__"
                                                            >
                                                                unisonbizbd@gmail.com
                                                            </a>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="contact-info">
                                                    <div className="contact-info-icon">
                                                        <i className="fal fa-alarm-clock" />
                                                    </div>
                                                    <div className="contact-info-content">
                                                        <h5>Open Time</h5>
                                                        <p>Open 7 Days — 24 Hours</p>
                                                        {/* <p>
                                                            Sunday - <span className="text-danger">Closed</span>
                                                        </p> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-7">
                                    <div className="contact-form">
                                        <div className="contact-form-header">
                                            <h2>Get In Touch</h2>
                                            <p>
                                                It is a long established fact that a reader will be distracted
                                                by the readable content of a page words which even slightly
                                                when looking at its layout.{" "}
                                            </p>
                                        </div>
                                        <form
                                            method="post"
                                            action="https://live.themewild.com/medion//assets/php/contact.php"
                                            id="contact-form"
                                        >
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="name"
                                                            placeholder="Your Name"
                                                            required={true}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <input
                                                            type="email"
                                                            className="form-control"
                                                            name="email"
                                                            placeholder="Your Email"
                                                            required={true}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="subject"
                                                    placeholder="Your Subject"
                                                    required={true}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <textarea
                                                    name="message"
                                                    cols={30}
                                                    rows={4}
                                                    className="form-control"
                                                    placeholder="Write Your Message"
                                                    required={true}
                                                    defaultValue={""}
                                                />
                                            </div>
                                            <button type="submit" className="theme-btn">
                                                Send Message <i className="far fa-paper-plane" />
                                            </button>
                                            <div className="col-md-12 my-3">
                                                <div className="form-messege text-success" />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* end contact area */}
                {/* newsletter area */}
                {/* <div className="newsletter-area pb-100">
                    <div className="container wow fadeInUp" data-wow-delay=".25s">
                        <div className="newsletter-wrap">
                            <div className="row">
                                <div className="col-lg-6 mx-auto">
                                    <div className="newsletter-content">
                                        <h3>
                                            Get <span>20%</span> Off Discount Coupon
                                        </h3>
                                        <p>By Subscribe Our Newsletter</p>
                                        <div className="subscribe-form">
                                            <form action="#">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="Your Email Address"
                                                />
                                                <button className="theme-btn" type="submit">
                                                    Subscribe <i className="far fa-paper-plane" />
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                {/* newsletter area end */}
                {/* map */}
                <div className="contact-map">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.3405610766417!2d90.36182289999999!3d23.8064859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0d9de327c2d%3A0xfc0c07e06bd9b989!2z4KaH4KaJ4Kao4Ka_4Ka44KaoIOCmrOCmv-CmnCDgprLgpr_gpq7gpr_gpp_gp4fgpqE!5e0!3m2!1sen!2sbd!4v1761850821380!5m2!1sen!2sbd"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        aria-hidden="false"
                        loading="lazy"
                    // referrerpolicy="no-referrer-when-downgrade"
                    />
                </div>
                {/* end map */}
            </main>

        </>
    );
}
