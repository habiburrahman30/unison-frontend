


import Link from "next/link";
import { getCategories } from "@/lib/api/categories";



export default async function Header() {
    const page = 1;

    const data = await getCategories({
        page,
        limit: 50,
    });

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
                                                <span
                                                    className="__cf_email__"
                                                    data-cfemail="4821262e27082d30292538242d662b2725"
                                                >
                                                    [info@unisonbizltd.com.bd]
                                                </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="tel:+21236547898">
                                                <i className="far fa-headset" /> +880-1714112027
                                            </a>
                                        </li>
                                        {/* <li className="help">
                                            <a href="#">
                                                <i className="far fa-comment-question" /> Need Help?
                                            </a>
                                        </li> */}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-6 col-xl-7">
                                <div className="header-top-right">
                                    <ul className="header-top-list">

                                        <li className="social">
                                            <div className="header-top-social">
                                                <span>Follow Us: </span>
                                                <a href="https://www.facebook.com/share/1D2Yr22Dkq/" target="_blank"
                                                    rel="noopener noreferrer">
                                                    <i className="fab fa-facebook" />
                                                </a>
                                                {/* <a href="#">
                                                    <i className="fab fa-x-twitter" />
                                                </a>
                                                <a href="#">
                                                    <i className="fab fa-instagram" />
                                                </a> */}
                                                <a href="https://www.linkedin.com/company/unisonbizbd/" target="_blank"
                                                    rel="noopener noreferrer">
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
            {/* header top end */}
            {/* navbar */}
            <div className="main-navigation">
                <nav className="navbar navbar-expand-lg">
                    <div className="container position-relative">
                        <a className="navbar-brand" href={"/"}>
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
                                <span />
                                <span />
                                <span />
                            </button>
                        </div>
                        <div
                            className="offcanvas offcanvas-start"
                            tabIndex={-1}
                            id="offcanvasNavbar"
                            aria-labelledby="offcanvasNavbarLabel"
                        >
                            <div className="offcanvas-header">
                                <a
                                    href={"/"}
                                    className="offcanvas-brand"
                                    id="offcanvasNavbarLabel"
                                >
                                    <img src="/assets/img/logo/logo.png" alt="" />
                                </a>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="offcanvas"
                                    aria-label="Close"
                                />
                            </div>
                            <div className="offcanvas-body">
                                <ul className="navbar-nav justify-content-end flex-grow-1">
                                    <li className="nav-item">
                                        <a className="nav-link active" href={"/"}>
                                            Home
                                        </a>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a
                                            className="nav-link dropdown-toggle"
                                            href={"/products"}
                                            data-bs-toggle="dropdown"
                                        >
                                            Product
                                        </a>
                                        {/* <Link
                                            className="nav-link dropdown-toggle"
                                            href="/products"
                                        // data-bs-toggle="dropdown"
                                        >
                                            Product
                                        </Link> */}
                                        {data.categories.length > 0 && (
                                            <ul className="dropdown-menu fade-down" style={{ width: "400px" }}>
                                                {data.categories.map((cat: any) => (
                                                    <li key={cat.id}>

                                                        <Link
                                                            className="dropdown-item"
                                                            href={`/products?category_id=${cat.id}`}
                                                        >
                                                            {cat.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                    </li>
                                    <li className="nav-item dropdown">
                                        <a
                                            className="nav-link dropdown-toggle "
                                            href={"/about"}
                                            data-bs-toggle="dropdown"
                                        >
                                            About Us
                                        </a>
                                        {/* <Link href="/about" className="nav-link dropdown-toggle">
                                            About Us
                                        </Link> */}

                                        <ul className="dropdown-menu fade-down">
                                            <li>
                                                <a className="dropdown-item" href={"/our-team"}>
                                                    Our Team
                                                </a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href={"/our-gallery"}>
                                                    Gallery
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href={"/news-event"}>
                                            News / Event
                                        </a>
                                    </li>

                                    <li className="nav-item">
                                        <a className="nav-link" href={"/testimonial"}>
                                            Customer
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href={"/contact"}>
                                            Contact Us
                                        </a>
                                    </li>
                                </ul>
                                {/* nav-right */}
                                <div className="nav-right ">
                                    {/* <a href="#" className="nav-right-link search-box-outer">
                                        <i className="far fa-search" />
                                    </a>
                                    <a href="wishlist.html" className="nav-right-link">
                                        <i className="far fa-heart" />
                                        <span>2</span>
                                    </a>
                                    <a href="shop-cart.html" className="nav-right-link">
                                        <i className="far fa-shopping-bag" />
                                        <span>5</span>
                                    </a> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </nav >
            </div >
            {/* navbar end */}
        </header >
    );
}