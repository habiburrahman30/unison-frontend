'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import WhatsAppWidget from "../landing/WhatsAppWidget";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/news-event", label: "News / Event" },
    { href: "/testimonial", label: "Customer" },
    { href: "/contact", label: "Contact Us" },
];

export default function HeaderClient({ categories }: { categories: any[] }) {
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    return (
        <header className="header">
            {/* header top */}
            <div className="header-top">
                <div className="container">
                    <div className="header-top-wrap">
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-6 col-xl-5">
                                <div className="header-top-left">
                                    <ul className="header-top-list">
                                        <li>
                                            <a href="#">
                                                <i className="far fa-envelopes" />
                                                <span>[info@unisonbizltd.com.bd]</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="tel:+88 01723-435818">
                                                <i className="far fa-headset" /> +88 01723-435818
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-6 col-xl-7">
                                <div className="header-top-right">
                                    <ul className="header-top-list">
                                        <li className="social">
                                            <div className="header-top-social">
                                                <span>Follow Us: </span>
                                                <a href="https://www.facebook.com/share/1D2Yr22Dkq/" target="_blank" rel="noopener noreferrer">
                                                    <i className="fab fa-facebook" />
                                                </a>
                                                <a href="https://www.linkedin.com/company/unisonbizbd/" target="_blank" rel="noopener noreferrer">
                                                    <i className="fab fa-linkedin" />
                                                </a>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* navbar */}
            <div className="main-navigation">
                <nav className="navbar navbar-expand-lg">
                    <div className="container position-relative">
                        <a className="navbar-brand" href="/">
                            <img src="/assets/img/logo/logo.png" alt="logo" />
                        </a>
                        <div className="mobile-menu-right">
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasNavbar"
                                aria-controls="offcanvasNavbar"
                                aria-label="Toggle navigation"
                            >
                                <span /><span /><span />
                            </button>
                        </div>
                        <div
                            className="offcanvas offcanvas-start"
                            tabIndex={-1}
                            id="offcanvasNavbar"
                            aria-labelledby="offcanvasNavbarLabel"
                        >
                            <div className="offcanvas-header">
                                <a href="/" className="offcanvas-brand" id="offcanvasNavbarLabel">
                                    <img src="/assets/img/logo/logo.png" alt="" />
                                </a>
                                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
                            </div>
                            <div className="offcanvas-body">
                                <ul className="navbar-nav justify-content-end flex-grow-1">

                                    {/* Home */}
                                    <li className="nav-item">
                                        <Link className={`nav-link ${isActive("/") ? "active" : ""}`} href="/">
                                            Home
                                        </Link>
                                    </li>

                                    {/* Products dropdown */}
                                    <li className="nav-item dropdown">
                                        <Link
                                            className={`nav-link dropdown-toggle ${isActive("/products") ? "active" : ""}`}
                                            href="/products"
                                            data-bs-toggle="dropdown"
                                        >
                                            Product
                                        </Link>
                                        {categories.length > 0 && (
                                            <ul className="dropdown-menu fade-down" style={{ width: "400px" }}>
                                                {categories.map((cat: any) => (
                                                    <li key={cat.id}>
                                                        <Link
                                                            className={`dropdown-item ${pathname === `/products?category_id=${cat.id}` ? "active" : ""}`}
                                                            href={`/products?category_id=${cat.id}`}
                                                        >
                                                            {cat.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>

                                    {/* About Us dropdown */}
                                    <li className="nav-item dropdown">
                                        <Link
                                            className={`nav-link dropdown-toggle ${isActive("/about") ? "active" : ""}`}
                                            href="/about"
                                            data-bs-toggle="dropdown"
                                        >
                                            About Us
                                        </Link>
                                        <ul className="dropdown-menu fade-down">
                                            <li>
                                                <Link className={`dropdown-item ${isActive("/our-team") ? "active" : ""}`} href="/our-team">
                                                    Our Team
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className={`dropdown-item ${isActive("/our-gallery") ? "active" : ""}`} href="/our-gallery">
                                                    Gallery
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>

                                    {/* Other nav links */}
                                    {navLinks.slice(1).map((link) => (
                                        <li key={link.href} className="nav-item">
                                            <Link
                                                className={`nav-link ${isActive(link.href) ? "active" : ""}`}
                                                href={link.href}
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}

                                </ul>
                                <div className="nav-right" />
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

            <WhatsAppWidget />
        </header>
    );
}