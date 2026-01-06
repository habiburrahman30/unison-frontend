"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Category } from "@/lib/api/categories";

export default function Footer() {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        // Fetch categories
        fetch("/api/categories")
            .then((res) => res.json())
            .then((data) => setCategories(data.data || []));


    }, []);
    return (
        <footer className="footer-area ft-bg">
            <div className="footer-widget">
                <div className="container">
                    <div className="row footer-widget-wrapper pt-100 pb-40">
                        <div className="col-md-6 col-lg-3">
                            <div className="footer-widget-box about-us">
                                <a href={"/"} className="footer-logo">
                                    <img src="/assets/img/logo/logo.png" alt="" />
                                </a>
                                <p className="mb-3">
                                    We are committed to protecting our commitment.
                                </p>
                                <ul className="footer-contact">
                                    <li>
                                        <a href="tel:+21236547898">
                                            <i className="far fa-phone" />
                                            +880-1714112027
                                        </a>
                                    </li>
                                    <li>
                                        <a href="mailto:info@unisonbizltd.com.bd" target="_blank"
                                            rel="noopener noreferrer">
                                            <i className="far fa-envelope" />
                                            <span
                                                className=""
                                                data-cfemail=""
                                            >
                                                info@unisonbizltd.com.bd
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <h4 className="footer-widget-title mt-20 mb-0 pb-2">
                                            Medical Division
                                        </h4>
                                    </li>
                                    <li>
                                        <a href="saiful.hasan@unisonbizltd.com.bd" target="_blank"
                                            rel="noopener noreferrer">
                                            <i className="far fa-envelope" />
                                            <span
                                                className=""
                                                data-cfemail=""
                                            >
                                                saiful.hasan@unisonbizltd.com.bd
                                            </span>
                                        </a>


                                    </li>
                                    <li>
                                        <a href="unisonbizbd@gmail.com" target="_blank"
                                            rel="noopener noreferrer">
                                            <i className="far fa-envelope" />
                                            <span
                                                className=""
                                                data-cfemail=""
                                            >
                                                unisonbizbd@gmail.com
                                            </span>
                                        </a>


                                    </li>
                                    <li>
                                        <h4 className="footer-widget-title mt-20 mb-0 pb-2">
                                            Registered Office
                                        </h4>
                                    </li>
                                    <li>
                                        {/* <i className="far fa-map-marker-alt" /> */}
                                        152, Gawair Madrasha Road, Ashkona, Dakkinkhan, Dhaka-1230, Bangladesh
                                    </li>

                                    <li>
                                        <h4 className="footer-widget-title mt-20 mb-0 pb-2">
                                            Sales Office & Mailing Address
                                        </h4>
                                    </li>
                                    <li>
                                        {/* <i className="far fa-map-marker-alt" /> */}
                                        House: 25, Road: 09, Block: H, Mirpur -2, Dhaka-1216 Bangladesh

                                    </li>

                                    {/* <li>
                                        <i className="far fa-clock" />
                                        Mon-Fri (9.00AM - 8.00PM)
                                    </li> */}
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="footer-widget-box list">
                                <h4 className="footer-widget-title">Quick Links</h4>
                                <ul className="footer-list">
                                    <li>
                                        <a href={"/about"}>About Us</a>
                                    </li>
                                    <li>
                                        <a href={"/news-event"}>News / Event</a>
                                    </li>
                                    <li>
                                        <a href={"/products"}>Product</a>
                                    </li>
                                    <li>
                                        <a href={"/testimonial"}>Customer</a>
                                    </li>
                                    <li>
                                        <a href={"/contact"}>Contact Us</a>
                                    </li>
                                    <li>
                                        <a href={"/terms-of-service"}>Terms Of Service</a>
                                    </li>
                                    <li>
                                        <a href={"/privacy-policy"}>Privacy policy</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="footer-widget-box list">
                                <h4 className="footer-widget-title">All Categories</h4>
                                <ul className="footer-list">

                                    {Array.isArray(categories) &&
                                        categories.map((data) => (

                                            <li key={data.id}>
                                                <a href={"/products"}>{data.name}</a>
                                            </li>
                                        ))}


                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <div className="footer-widget-box list">
                                <h4 className="footer-widget-title">Support Center</h4>
                                <ul className="footer-list">
                                    <li>
                                        <a href={"/faq"}>FAQ's</a>
                                    </li>

                                    <li>
                                        <a href={"/support-center"}>Support Center</a>
                                    </li>

                                    <li>
                                        <a href={"/returns-policy"}>Returns Policy</a>
                                    </li>

                                    <li>
                                        <a href={"/contact"}>Sitemap</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* <div className="col-md-6 col-lg-3">
                            <div className="footer-widget-box list">
                                <h4 className="footer-widget-title">Get Mobile App</h4>
                                <p>Medica App is now available on App Store &amp; Google Play.</p>
                                <div className="footer-download">
                                    <h5>Download Our Mobile App</h5>
                                    <div className="footer-download-btn">
                                        <a href="#">
                                            <i className="fab fa-google-play" />
                                            <div className="download-btn-info">
                                                <span>Get It On</span>
                                                <h6>Google Play</h6>
                                            </div>
                                        </a>
                                        <a href="#">
                                            <i className="fab fa-app-store" />
                                            <div className="download-btn-info">
                                                <span>Get It On</span>
                                                <h6>App Store</h6>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="footer-payment mt-20">
                                    <span>We Accept:</span>
                                    <img src="/assets/img/payment/visa.svg" alt="" />
                                    <img src="/assets/img/payment/mastercard.svg" alt="" />
                                    <img src="/assets/img/payment/amex.svg" alt="" />
                                    <img src="/assets/img/payment/discover.svg" alt="" />
                                    <img src="/assets/img/payment/paypal.svg" alt="" />
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="copyright">
                <div className="container">
                    <div className="copyright-wrap">
                        <div className="row">
                            <div className="col-12 col-lg-6 align-self-center">
                                <p className="copyright-text">
                                    © Copyright <span id="date" />{" "}
                                    <a href={"/"}> Unison Biz Limited </a> All Rights Reserved.
                                </p>
                            </div>
                            <div className="col-12 col-lg-6 align-self-center">
                                <div className="footer-social">
                                    <span>Follow Us:</span>
                                    <a href="https://www.facebook.com/share/1D2Yr22Dkq/" target="_blank"
                                        rel="noopener noreferrer">
                                        <i className="fab fa-facebook-f" />
                                    </a>
                                    {/* <a href="#">
                                        <i className="fab fa-x-twitter" />
                                    </a>
                                    <a href="#">
                                        <i className="fab fa-linkedin-in" />
                                    </a> */}
                                    <a href="https://www.linkedin.com/company/unisonbizbd/" target="_blank"
                                        rel="noopener noreferrer">
                                        <i className="fab fa-linkedin-in" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}