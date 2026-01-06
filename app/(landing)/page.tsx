"use client";

import HomeCategoryCard from "@/components/landing/HomeCategoryCard"
import TestimonialCard from "@/components/landing/TestimonialCard";
import { Testimonial } from "@/lib/api/testimonials";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function HomePage() {
  const sliderData = [
    {
      image: "/assets/img/deal/01.webp",
    },
    {
      image: "/assets/img/deal/02.webp",
    },
    {
      image: "/assets/img/deal/03.webp",
    },

  ];
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

  return (
    <>
      {/* preloader */}
      {/* <div className="preloader">
        <div className="loader-ripple">
          <div />
          <div />
        </div>
      </div> */}
      {/* preloader end */}

      {/* header area */}

      {/* header area end */}
      {/* popup search */}
      <div className="search-popup">
        <button className="close-search">
          <span className="far fa-times" />
        </button>
        <form action="#">
          <div className="form-group">
            <input
              type="search"
              name="search-field"
              className="form-control"
              placeholder="Search Here..."
              required={true}
            />
            <button type="submit">
              <i className="far fa-search" />
            </button>
          </div>
        </form>
      </div>
      {/* popup search end */}
      <main className="main">
        {/* hero section */}
        <div className="hero-section hs-1">
          <div
            className="hero-single"
            style={{ backgroundImage: "url(/assets/img/hero/bg.png)" }}
          >
            <div className="container position-relative">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="hero-content">
                    <h6
                      className="hero-sub-title"
                      data-animation="fadeInUp"
                      data-delay=".25s"
                    >
                      Health Care Technology & Solution
                    </h6>
                    <h1
                      className="hero-title"
                      data-animation="fadeInRight"
                      data-delay=".50s"
                    >

                      Delivering Innovation in <span>Medical Equipment &</span>  Healthcare Technology.
                    </h1>
                    <p data-animation="fadeInLeft" data-delay=".75s">
                      We are committed to protecting our commitment.
                    </p>
                    <div
                      className="hero-btn"
                      data-animation="fadeInUp"
                      data-delay="1s"
                    >
                      {/* <a href={"/products"} className="theme-btn">
                        Shop Now
                        <i className="fas fa-arrow-right" />
                      </a> */}
                      <a href={"/about"} className="theme-btn theme-btn2">
                        Learn More
                        <i className="fas fa-arrow-right" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="hero-right">
                    <div className="hero-img">
                      <img src="/assets/img/hero/hero-4.png" alt="" />
                    </div>
                    {/* <div className="hero-img-info">
                      <div className="icon">
                        <img src="/assets/img/icon/delivery.svg" alt="" />
                      </div>
                      <h6>Delivery within 30 minutes</h6>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* hero section end */}
        {/* search-product */}
        {/* <div className="search-product">
          <div className="container">
            <div className="col-lg-12 col-xl-9">
              <div className="search-form">
                <h5>Search Product</h5>
                <form action="#">
                  <div className="row">
                    <div className="col-md-6 col-lg-3">
                      <div className="form-group">
                        <select className="select" name="category">
                          <option value="">All Category</option>
                          <option value={1}>MGPS</option>
                          <option value={2}>Oxygen Generator</option>
                          <option value={3}>MOT</option>
                          <option value={4}>OT</option>
                          <option value={5}>ICU</option>
                          <option value={6}>NICU</option>
                          <option value={7}>Hospital Furniture</option>
                          <option value={8}>CSSD</option>
                          <option value={9}>Water Management</option>
                          <option value={10}>Disposable</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                      <div className="form-group">
                        <select className="select" name="brand">
                          <option value="">All Brand</option>
                          <option value={1}>Brand One</option>
                          <option value={2}>Brand Two</option>
                          <option value={3}>Brand Three</option>
                          <option value={4}>Brand Four</option>
                          <option value={5}>Brand Five</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="key"
                          placeholder="Enter key..."
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-2">
                      <button type="submit" className="theme-btn">
                        <span className="far fa-search" />
                        Search
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div> */}
        {/* search-product */}
        {/* category area */}

        <HomeCategoryCard />
        {/* category area end*/}

        {/* feature area end */}
        {/* popular item */}
        {/* <div className="product-area pb-100">
          <div className="container">
            <div className="row g-4">
              <div className="col-lg-9">
                <div className="row">
                  <div className="col-12 wow fadeInDown" data-wow-delay=".25s">
                    <div className="site-heading-inline">
                      <h2 className="site-title">Popular Items</h2>
                      <a href={"/products"}>
                        All Products <i className="fas fa-angle-double-right" />
                      </a>
                    </div>
                    <div className="item-tab">
                      <ul
                        className="nav nav-pills mt-40 mb-50"
                        style={{ justifyContent: "start" }}
                        id="item-tab"
                        role="tablist"
                      >
                        <li className="nav-item" role="presentation" >
                          <button
                            className="nav-link active"
                            id="item-tab1"
                            data-bs-toggle="pill"
                            data-bs-target="#pill-item-tab1"
                            type="button"
                            role="tab"
                            aria-controls="pill-item-tab1"
                            aria-selected="true"
                          >
                            MGPS
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="item-tab2"
                            data-bs-toggle="pill"
                            data-bs-target="#pill-item-tab2"
                            type="button"
                            role="tab"
                            aria-controls="pill-item-tab2"
                            aria-selected="false"
                          >
                            Oxygen Generator
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="item-tab3"
                            data-bs-toggle="pill"
                            data-bs-target="#pill-item-tab3"
                            type="button"
                            role="tab"
                            aria-controls="pill-item-tab3"
                            aria-selected="false"
                          >
                            MOT
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="item-tab4"
                            data-bs-toggle="pill"
                            data-bs-target="#pill-item-tab4"
                            type="button"
                            role="tab"
                            aria-controls="pill-item-tab4"
                            aria-selected="false"
                          >
                            OT
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="item-tab5"
                            data-bs-toggle="pill"
                            data-bs-target="#pill-item-tab5"
                            type="button"
                            role="tab"
                            aria-controls="pill-item-tab5"
                            aria-selected="false"
                          >
                            ICU
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="item-tab6"
                            data-bs-toggle="pill"
                            data-bs-target="#pill-item-tab6"
                            type="button"
                            role="tab"
                            aria-controls="pill-item-tab6"
                            aria-selected="false"
                          >
                            NICU
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="item-tab7"
                            data-bs-toggle="pill"
                            data-bs-target="#pill-item-tab7"
                            type="button"
                            role="tab"
                            aria-controls="pill-item-tab7"
                            aria-selected="false"
                          >
                            Hospital Furniture
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="item-tab8"
                            data-bs-toggle="pill"
                            data-bs-target="#pill-item-tab8"
                            type="button"
                            role="tab"
                            aria-controls="pill-item-tab8"
                            aria-selected="false"
                          >
                            CSSD
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-content wow fadeInUp"
                  data-wow-delay=".25s"
                  id="item-tabContent"
                >
                  <div
                    className="tab-pane show active"
                    id="pill-item-tab1"
                    role="tabpanel"
                    aria-labelledby="item-tab1"
                    tabIndex={0}
                  >
                    <div className="row g-3">
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="product-item">
                          <div className="product-img">
                            <span className="type new">New</span>
                            <a href="shop-single.html">
                              <img src="/assets/img/product/14.png" alt="" />
                            </a>

                          </div>
                          <div className="product-content">
                            <h3 className="product-title">
                              <a href="shop-single.html">Surgical Face Mask</a>
                            </h3>
                            <div className="product-rate">
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="far fa-star" />
                            </div>

                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="product-item">
                          <div className="product-img">
                            <span className="type hot">Hot</span>
                            <a href="shop-single.html">
                              <img src="/assets/img/product/07.png" alt="" />
                            </a>

                          </div>
                          <div className="product-content">
                            <h3 className="product-title">
                              <a href="shop-single.html">Surgical Face Mask</a>
                            </h3>
                            <div className="product-rate">
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="far fa-star" />
                            </div>

                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="product-item">
                          <div className="product-img">
                            <span className="type oos">Out Of Stock</span>
                            <a href="shop-single.html">
                              <img src="/assets/img/product/24.png" alt="" />
                            </a>

                          </div>
                          <div className="product-content">
                            <h3 className="product-title">
                              <a href="shop-single.html">Surgical Face Mask</a>
                            </h3>
                            <div className="product-rate">
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="far fa-star" />
                            </div>

                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="product-item">
                          <div className="product-img">
                            <span className="type discount">10% Off</span>
                            <a href="shop-single.html">
                              <img src="/assets/img/product/15.png" alt="" />
                            </a>

                          </div>
                          <div className="product-content">
                            <h3 className="product-title">
                              <a href="shop-single.html">Surgical Face Mask</a>
                            </h3>
                            <div className="product-rate">
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="far fa-star" />
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane"
                    id="pill-item-tab2"
                    role="tabpanel"
                    aria-labelledby="item-tab2"
                    tabIndex={0}
                  >
                    <div className="row g-3">
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="product-item">
                          <div className="product-img">
                            <span className="type new">New</span>
                            <a href="shop-single.html">
                              <img src="/assets/img/product/10.png" alt="" />
                            </a>
                            <div className="product-action-wrap">
                              <div className="product-action">
                                <a
                                  href="#"
                                  data-bs-toggle="modal"
                                  data-bs-target="#quickview"
                                  data-bs-placement="top"
                                  data-tooltip="tooltip"
                                  title="Quick View"
                                >
                                  <i className="far fa-eye" />
                                </a>


                              </div>
                            </div>
                          </div>
                          <div className="product-content">
                            <h3 className="product-title">
                              <a href="shop-single.html">Surgical Face Mask</a>
                            </h3>
                            <div className="product-rate">
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="far fa-star" />
                            </div>

                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="product-item">
                          <div className="product-img">
                            <span className="type hot">Hot</span>
                            <a href="shop-single.html">
                              <img src="/assets/img/product/11.png" alt="" />
                            </a>

                          </div>
                          <div className="product-content">
                            <h3 className="product-title">
                              <a href="shop-single.html">Surgical Face Mask</a>
                            </h3>
                            <div className="product-rate">
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="far fa-star" />
                            </div>

                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="product-item">
                          <div className="product-img">
                            <span className="type oos">Out Of Stock</span>
                            <a href="shop-single.html">
                              <img src="/assets/img/product/12.png" alt="" />
                            </a>

                          </div>
                          <div className="product-content">
                            <h3 className="product-title">
                              <a href="shop-single.html">Surgical Face Mask</a>
                            </h3>
                            <div className="product-rate">
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="far fa-star" />
                            </div>

                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="product-item">
                          <div className="product-img">
                            <span className="type discount">10% Off</span>
                            <a href="shop-single.html">
                              <img src="/assets/img/product/13.png" alt="" />
                            </a>

                          </div>
                          <div className="product-content">
                            <h3 className="product-title">
                              <a href="shop-single.html">Surgical Face Mask</a>
                            </h3>
                            <div className="product-rate">
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="far fa-star" />
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane"
                    id="pill-item-tab3"
                    role="tabpanel"
                    aria-labelledby="item-tab3"
                    tabIndex={0}
                  >
                    <div className="row g-3">
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="product-item">
                          <div className="product-img">
                            <span className="type new">New</span>
                            <a href="shop-single.html">
                              <img src="/assets/img/product/17.png" alt="" />
                            </a>

                          </div>
                          <div className="product-content">
                            <h3 className="product-title">
                              <a href="shop-single.html">Surgical Face Mask</a>
                            </h3>
                            <div className="product-rate">
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="far fa-star" />
                            </div>

                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="product-item">
                          <div className="product-img">
                            <span className="type hot">Hot</span>
                            <a href="shop-single.html">
                              <img src="/assets/img/product/18.png" alt="" />
                            </a>

                          </div>
                          <div className="product-content">
                            <h3 className="product-title">
                              <a href="shop-single.html">Surgical Face Mask</a>
                            </h3>
                            <div className="product-rate">
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="far fa-star" />
                            </div>

                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="product-item">
                          <div className="product-img">
                            <span className="type oos">Out Of Stock</span>
                            <a href="shop-single.html">
                              <img src="/assets/img/product/19.png" alt="" />
                            </a>

                          </div>
                          <div className="product-content">
                            <h3 className="product-title">
                              <a href="shop-single.html">Surgical Face Mask</a>
                            </h3>
                            <div className="product-rate">
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="far fa-star" />
                            </div>

                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="product-item">
                          <div className="product-img">
                            <span className="type discount">10% Off</span>
                            <a href="shop-single.html">
                              <img src="/assets/img/product/20.png" alt="" />
                            </a>

                          </div>
                          <div className="product-content">
                            <h3 className="product-title">
                              <a href="shop-single.html">Surgical Face Mask</a>
                            </h3>
                            <div className="product-rate">
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="far fa-star" />
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane"
                    id="pill-item-tab4"
                    role="tabpanel"
                    aria-labelledby="item-tab4"
                    tabIndex={0}
                  >
                    <div className="row g-3">
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="product-item">
                          <div className="product-img">
                            <span className="type new">New</span>
                            <a href="shop-single.html">
                              <img src="/assets/img/product/22.png" alt="" />
                            </a>

                          </div>
                          <div className="product-content">
                            <h3 className="product-title">
                              <a href="shop-single.html">Surgical Face Mask</a>
                            </h3>
                            <div className="product-rate">
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="far fa-star" />
                            </div>

                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="product-item">
                          <div className="product-img">
                            <span className="type hot">Hot</span>
                            <a href="shop-single.html">
                              <img src="/assets/img/product/23.png" alt="" />
                            </a>

                          </div>
                          <div className="product-content">
                            <h3 className="product-title">
                              <a href="shop-single.html">Surgical Face Mask</a>
                            </h3>
                            <div className="product-rate">
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="far fa-star" />
                            </div>

                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="product-item">
                          <div className="product-img">
                            <span className="type oos">Out Of Stock</span>
                            <a href="shop-single.html">
                              <img src="/assets/img/product/24.png" alt="" />
                            </a>

                          </div>
                          <div className="product-content">
                            <h3 className="product-title">
                              <a href="shop-single.html">Surgical Face Mask</a>
                            </h3>
                            <div className="product-rate">
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="far fa-star" />
                            </div>

                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="product-item">
                          <div className="product-img">
                            <span className="type discount">10% Off</span>
                            <a href="shop-single.html">
                              <img src="/assets/img/product/25.png" alt="" />
                            </a>

                          </div>
                          <div className="product-content">
                            <h3 className="product-title">
                              <a href="shop-single.html">Surgical Face Mask</a>
                            </h3>
                            <div className="product-rate">
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="far fa-star" />
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane"
                    id="pill-item-tab5"
                    role="tabpanel"
                    aria-labelledby="item-tab5"
                    tabIndex={0}
                  >
                    <div className="row g-3">
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="product-item">
                          <div className="product-img">
                            <span className="type new">New</span>
                            <a href="shop-single.html">
                              <img src="/assets/img/product/30.png" alt="" />
                            </a>

                          </div>
                          <div className="product-content">
                            <h3 className="product-title">
                              <a href="shop-single.html">Surgical Face Mask</a>
                            </h3>
                            <div className="product-rate">
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="far fa-star" />
                            </div>

                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="product-item">
                          <div className="product-img">
                            <span className="type hot">Hot</span>
                            <a href="shop-single.html">
                              <img src="/assets/img/product/31.png" alt="" />
                            </a>

                          </div>
                          <div className="product-content">
                            <h3 className="product-title">
                              <a href="shop-single.html">Surgical Face Mask</a>
                            </h3>
                            <div className="product-rate">
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="far fa-star" />
                            </div>

                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="product-item">
                          <div className="product-img">
                            <span className="type oos">Out Of Stock</span>
                            <a href="shop-single.html">
                              <img src="/assets/img/product/32.png" alt="" />
                            </a>

                          </div>
                          <div className="product-content">
                            <h3 className="product-title">
                              <a href="shop-single.html">Surgical Face Mask</a>
                            </h3>
                            <div className="product-rate">
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="far fa-star" />
                            </div>

                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="product-item">
                          <div className="product-img">
                            <span className="type discount">10% Off</span>
                            <a href="shop-single.html">
                              <img src="/assets/img/product/33.png" alt="" />
                            </a>

                          </div>
                          <div className="product-content">
                            <h3 className="product-title">
                              <a href="shop-single.html">Surgical Face Mask</a>
                            </h3>
                            <div className="product-rate">
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="far fa-star" />
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane"
                    id="pill-item-tab6"
                    role="tabpanel"
                    aria-labelledby="item-tab6"
                    tabIndex={0}
                  >
                    <div className="row g-3">
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="product-item">
                          <div className="product-img">
                            <span className="type new">New</span>
                            <a href="shop-single.html">
                              <img src="/assets/img/product/34.png" alt="" />
                            </a>

                          </div>
                          <div className="product-content">
                            <h3 className="product-title">
                              <a href="shop-single.html">Surgical Face Mask</a>
                            </h3>
                            <div className="product-rate">
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="far fa-star" />
                            </div>

                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="product-item">
                          <div className="product-img">
                            <span className="type hot">Hot</span>
                            <a href="shop-single.html">
                              <img src="/assets/img/product/35.png" alt="" />
                            </a>

                          </div>
                          <div className="product-content">
                            <h3 className="product-title">
                              <a href="shop-single.html">Surgical Face Mask</a>
                            </h3>
                            <div className="product-rate">
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="far fa-star" />
                            </div>

                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="product-item">
                          <div className="product-img">
                            <span className="type oos">Out Of Stock</span>
                            <a href="shop-single.html">
                              <img src="/assets/img/product/36.png" alt="" />
                            </a>

                          </div>
                          <div className="product-content">
                            <h3 className="product-title">
                              <a href="shop-single.html">Surgical Face Mask</a>
                            </h3>
                            <div className="product-rate">
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="far fa-star" />
                            </div>

                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="product-item">
                          <div className="product-img">
                            <span className="type discount">10% Off</span>
                            <a href="shop-single.html">
                              <img src="/assets/img/product/37.png" alt="" />
                            </a>

                          </div>
                          <div className="product-content">
                            <h3 className="product-title">
                              <a href="shop-single.html">Surgical Face Mask</a>
                            </h3>
                            <div className="product-rate">
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="far fa-star" />
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane"
                    id="pill-item-tab7"
                    role="tabpanel"
                    aria-labelledby="item-tab7"
                    tabIndex={0}
                  >
                    <div className="row g-3">
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="product-item">
                          <div className="product-img">
                            <span className="type new">New</span>
                            <a href="shop-single.html">
                              <img src="/assets/img/product/22.png" alt="" />
                            </a>

                          </div>
                          <div className="product-content">
                            <h3 className="product-title">
                              <a href="shop-single.html">Surgical Face Mask</a>
                            </h3>
                            <div className="product-rate">
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="far fa-star" />
                            </div>

                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="product-item">
                          <div className="product-img">
                            <span className="type hot">Hot</span>
                            <a href="shop-single.html">
                              <img src="/assets/img/product/23.png" alt="" />
                            </a>

                          </div>
                          <div className="product-content">
                            <h3 className="product-title">
                              <a href="shop-single.html">Surgical Face Mask</a>
                            </h3>
                            <div className="product-rate">
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="far fa-star" />
                            </div>

                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="product-item">
                          <div className="product-img">
                            <span className="type oos">Out Of Stock</span>
                            <a href="shop-single.html">
                              <img src="/assets/img/product/24.png" alt="" />
                            </a>

                          </div>
                          <div className="product-content">
                            <h3 className="product-title">
                              <a href="shop-single.html">Surgical Face Mask</a>
                            </h3>
                            <div className="product-rate">
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="far fa-star" />
                            </div>

                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="product-item">
                          <div className="product-img">
                            <span className="type discount">10% Off</span>
                            <a href="shop-single.html">
                              <img src="/assets/img/product/25.png" alt="" />
                            </a>

                          </div>
                          <div className="product-content">
                            <h3 className="product-title">
                              <a href="shop-single.html">Surgical Face Mask</a>
                            </h3>
                            <div className="product-rate">
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="far fa-star" />
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane"
                    id="pill-item-tab8"
                    role="tabpanel"
                    aria-labelledby="item-tab8"
                    tabIndex={0}
                  >
                    <div className="row g-3">
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="product-item">
                          <div className="product-img">
                            <span className="type new">New</span>
                            <a href="shop-single.html">
                              <img src="/assets/img/product/10.png" alt="" />
                            </a>
                            <div className="product-action-wrap">
                              <div className="product-action">
                                <a
                                  href="#"
                                  data-bs-toggle="modal"
                                  data-bs-target="#quickview"
                                  data-bs-placement="top"
                                  data-tooltip="tooltip"
                                  title="Quick View"
                                >
                                  <i className="far fa-eye" />
                                </a>


                              </div>
                            </div>
                          </div>
                          <div className="product-content">
                            <h3 className="product-title">
                              <a href="shop-single.html">Surgical Face Mask</a>
                            </h3>
                            <div className="product-rate">
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="far fa-star" />
                            </div>

                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="product-item">
                          <div className="product-img">
                            <span className="type hot">Hot</span>
                            <a href="shop-single.html">
                              <img src="/assets/img/product/11.png" alt="" />
                            </a>

                          </div>
                          <div className="product-content">
                            <h3 className="product-title">
                              <a href="shop-single.html">Surgical Face Mask</a>
                            </h3>
                            <div className="product-rate">
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="far fa-star" />
                            </div>

                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="product-item">
                          <div className="product-img">
                            <span className="type oos">Out Of Stock</span>
                            <a href="shop-single.html">
                              <img src="/assets/img/product/12.png" alt="" />
                            </a>

                          </div>
                          <div className="product-content">
                            <h3 className="product-title">
                              <a href="shop-single.html">Surgical Face Mask</a>
                            </h3>
                            <div className="product-rate">
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="far fa-star" />
                            </div>

                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="product-item">
                          <div className="product-img">
                            <span className="type discount">10% Off</span>
                            <a href="shop-single.html">
                              <img src="/assets/img/product/13.png" alt="" />
                            </a>

                          </div>
                          <div className="product-content">
                            <h3 className="product-title">
                              <a href="shop-single.html">Surgical Face Mask</a>
                            </h3>
                            <div className="product-rate">
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="fas fa-star" />
                              <i className="far fa-star" />
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div
                  className="product-banner wow fadeInRight"
                  data-wow-delay=".25s"
                >
                  <a href="#">
                    <img src="/assets/img/banner/product-banner.jpg" alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* popular item end */}
        {/* big banner */}

        {/* big banner end */}
        {/* brand area */}
        {/* <div className="brand-area mb-5">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="site-heading-inline">
                  <h2 className="site-title">Popular Brands</h2>
                  <a href={"/brands"}>
                    All Brands <i className="fas fa-angle-double-right" />
                  </a>
                </div>
              </div>
            </div>
            <div className="brand-slider owl-carousel owl-theme">
              <div className="brand-item">
                <a href="#">
                  <img src="/assets/img/brand/01.png" alt="" />
                </a>
              </div>
              <div className="brand-item">
                <a href="#">
                  <img src="/assets/img/brand/02.png" alt="" />
                </a>
              </div>
              <div className="brand-item">
                <a href="#">
                  <img src="/assets/img/brand/03.png" alt="" />
                </a>
              </div>
              <div className="brand-item">
                <a href="#">
                  <img src="/assets/img/brand/04.png" alt="" />
                </a>
              </div>
              <div className="brand-item">
                <a href="#">
                  <img src="/assets/img/brand/05.png" alt="" />
                </a>
              </div>
              <div className="brand-item">
                <a href="#">
                  <img src="/assets/img/brand/06.png" alt="" />
                </a>
              </div>
            </div>
          </div>
        </div> */}
        {/* brand area end */}
        {/* video area */}

        {/* video area end */}
        {/* product list */}

        {/* product list end */}
        {/* deal area */}
        <div className="deal-area pt-50 pb-50">
          <div className="deal-text-shape">Deal</div>
          <div className="container">
            <div className="deal-wrap wow fadeInUp" data-wow-delay=".25s">
              <div className="deal-slider owl-carousel owl-theme">

                {sliderData.map((team, index) => (
                  <div className="deal-item" key={index}>
                    <div className="row align-items-center">
                      {/* <div className="col-lg-6">
                      <div className="deal-content">
                        <div className="deal-info pb-20">
                          <span>Weekly Deal</span>
                          <h1>Best Deal For This Week</h1>
                          <p>
                            There are many variations of passages available but the
                            majority have suffered alteration in some form by
                            injected humour, or randomised words which don't look
                            even slightly believable.
                          </p>
                        </div>

                        <a href={"/products"} className="theme-btn theme-btn2">
                          Shop Now <i className="fas fa-arrow-right" />
                        </a>
                      </div>
                    </div> */}
                      <div className="col-lg-12">
                        <div className="deal-img">
                          <img src={team.image && team.image !== "" ? team.image : "/assets/img/no-image-found.jpg"}
                            alt={team.image} />

                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {/* <div className="deal-item">
                  <div className="row align-items-center">
                    <div className="col-lg-6">
                      <div className="deal-content">
                        <div className="deal-info pb-20">
                          <span>Weekly Deal</span>
                          <h1>Best Deal For This Week</h1>
                          <p>
                            There are many variations of passages available but the
                            majority have suffered alteration in some form by
                            injected humour, or randomised words which don't look
                            even slightly believable.
                          </p>
                        </div>

                        <a href={"/products"} className="theme-btn theme-btn2">
                          Shop Now <i className="fas fa-arrow-right" />
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="deal-img">
                        <img src="/assets/img/deal/02.png" alt="" />

                      </div>
                    </div>
                  </div>
                </div>
                <div className="deal-item">
                  <div className="row align-items-center">
                    <div className="col-lg-6">
                      <div className="deal-content">
                        <div className="deal-info pb-20">
                          <span>Weekly Deal</span>
                          <h1>Best Deal For This Week</h1>
                          <p>
                            There are many variations of passages available but the
                            majority have suffered alteration in some form by
                            injected humour, or randomised words which don't look
                            even slightly believable.
                          </p>
                        </div>

                        <a href={"/products"} className="theme-btn theme-btn2">
                          Shop Now <i className="fas fa-arrow-right" />
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="deal-img">
                        <img src="/assets/img/deal/03.png" alt="" />

                      </div>
                    </div>
                  </div>
                </div> */}


              </div>
            </div>
          </div>
        </div>
        {/* deal area end */}
        {/* about area */}
        <div className="about-area py-100">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="about-left wow fadeInLeft" data-wow-delay=".25s">
                  <div className="about-img">
                    <div className="row">
                      <div className="col-7">
                        <img
                          className="img-1"
                          src="/assets/img/about/01.jpg"
                          alt=""
                        />
                      </div>
                      <div className="col-5 align-self-end">
                        <img
                          className="img-2"
                          src="/assets/img/about/02.jpg"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className="about-experience">
                    <div className="about-experience-icon">
                      <img src="/assets/img/icon/experience.svg" alt="" />
                    </div>
                    <b>
                      10 Years Of <br /> Experience
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
                  <a href={"/contact"} className="theme-btn mt-4">
                    Discover More
                    <i className="fas fa-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* about area end */}
        {/* choose-area */}
        <div className="choose-area bg py-100">
          <div className="container">
            <div
              className="row g-4 align-items-center wow fadeInDown"
              data-wow-delay=".25s"
            >
              <div className="col-lg-4">
                <div className="choose-img">
                  <img src="/assets/img/choose/01.jpg" alt="" />
                </div>
              </div>
              <div className="col-lg-4">
                <span className="site-title-tagline">Why Choose Us</span>
                <h2 className="site-title">
                  We Deliver Excellence in Medical Equipment and Healthcare Solutions.
                </h2>
              </div>
              <div className="col-lg-4">
                <p>
                  We are dedicated to delivering reliable, innovative, and high-performance healthcare solutions that empower medical professionals and institutions to provide better care with confidence.
                </p>
              </div>
            </div>
            <div className="choose-content wow fadeInUp" data-wow-delay=".25s">
              <div className="row g-4">
                <div className="col-lg-4">
                  <div className="choose-item">
                    <div className="choose-icon">
                      <img src="/assets/img/icon/warranty.svg" alt="" />
                    </div>
                    <div className="choose-info">
                      <h4>Certified Medical Equipment</h4>
                      <p>
                        All our products are sourced from trusted global manufacturers and meet international quality and safety standards to ensure reliability in every procedure.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="choose-item">
                    <div className="choose-icon">
                      <img src="/assets/img/icon/price.svg" alt="" />
                    </div>
                    <div className="choose-info">
                      <h4>Advanced Healthcare Technology</h4>
                      <p>
                        We bring you cutting-edge medical devices and digital healthcare innovations designed to improve efficiency, accuracy, and patient outcomes.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="choose-item">
                    <div className="choose-icon">
                      <img src="/assets/img/icon/delivery.svg" alt="" />
                    </div>
                    <div className="choose-info">
                      <h4>Nationwide Delivery & Support</h4>
                      <p>
                        Fast, secure delivery across the country with professional after-sales support to keep your medical operations running smoothly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* choose-area end*/}
        {/* gallery-area */}
        <div className="gallery-area py-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mx-auto">
                <div className="site-heading text-center">
                  <span className="site-title-tagline">Our Gallery</span>
                  <h2 className="site-title">
                    Let's Check Our Photo <span>Gallery</span>
                  </h2>
                </div>
              </div>
            </div>
            <div className="row g-4 popup-gallery">
              <div className="col-md-12 col-lg-6">
                <div
                  className="gallery-item gallery-btn-active wow fadeInUp"
                  data-wow-delay=".25s"
                >
                  <div className="gallery-img">
                    <img src="/assets/img/gallery/01.jpg" alt="" />
                    <a
                      className="popup-img gallery-link"
                      href="/assets/img/gallery/01.jpg"
                    >
                      <i className="fal fa-plus" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-lg-3">
                <div className="gallery-item wow fadeInDown" data-wow-delay=".25s">
                  <div className="gallery-img">
                    <img src="/assets/img/gallery/02.jpg" alt="" />
                    <a
                      className="popup-img gallery-link"
                      href="/assets/img/gallery/02.jpg"
                    >
                      <i className="fal fa-plus" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-lg-3">
                <div className="gallery-item wow fadeInUp" data-wow-delay=".25s">
                  <div className="gallery-img">
                    <img src="/assets/img/gallery/03.jpg" alt="" />
                    <a
                      className="popup-img gallery-link"
                      href="/assets/img/gallery/03.jpg"
                    >
                      <i className="fal fa-plus" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-lg-3">
                <div className="gallery-item wow fadeInDown" data-wow-delay=".25s">
                  <div className="gallery-img">
                    <img src="/assets/img/gallery/04.jpg" alt="" />
                    <a
                      className="popup-img gallery-link"
                      href="/assets/img/gallery/04.jpg"
                    >
                      <i className="fal fa-plus" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-lg-3">
                <div className="gallery-item wow fadeInUp" data-wow-delay=".25s">
                  <div className="gallery-img">
                    <img src="/assets/img/gallery/05.jpg" alt="" />
                    <a
                      className="popup-img gallery-link"
                      href="/assets/img/gallery/05.jpg"
                    >
                      <i className="fal fa-plus" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-8 col-lg-6">
                <div className="gallery-item wow fadeInDown" data-wow-delay=".25s">
                  <div className="gallery-img">
                    <img src="/assets/img/gallery/06.jpg" alt="" />
                    <a
                      className="popup-img gallery-link"
                      href="/assets/img/gallery/06.jpg"
                    >
                      <i className="fal fa-plus" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* gallery-area end */}
        {/* testimonial area */}
        <div className="testimonial-area ts-bg py-80">
          <div className="container">
            <div className="row">
              <div
                className="col-lg-6 mx-auto wow fadeInDown"
                data-wow-delay=".25s"
              >
                <div className="site-heading text-center">
                  <span className="site-title-tagline">Testimonials</span>
                  <h2 className="site-title text-white">
                    What Our Client Say's <span>About Us</span>
                  </h2>
                </div>
              </div>
            </div>
            <div
              className="testimonial-slider owl-carousel owl-theme wow fadeInUp"
              data-wow-delay=".25s"
            >
              {testimonials.map((data) => (
                <div className="testimonial-item" key={data.id}>
                  <div className="testimonial-author">
                    <div className="testimonial-author-img">
                      {data.image ? (
                        <img
                          src={data.image}
                          alt={data.name}
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
                          {data.name.charAt(0).toUpperCase()}
                        </div>
                      )
                      }
                    </div>
                    <div className="testimonial-author-info">
                      <h4>{data.name}</h4>
                      <p>{data.designation ?? ""}</p>
                    </div>
                  </div>
                  <div className="testimonial-quote">
                    <p>
                      {data.message}
                    </p>
                  </div>
                  <div className="testimonial-rate">
                    {renderStars(data.rating)}
                  </div>
                  <div className="testimonial-quote-icon">
                    <img src="/assets/img/icon/quote.svg" alt={data.name} />
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>

        {/* testimonial area end */}
        {/* blog area */}
        {/* <div className="blog-area py-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mx-auto">
                <div className="site-heading text-center">
                  <span className="site-title-tagline">Our Blog</span>
                  <h2 className="site-title">
                    Our Latest News &amp; <span>Blog</span>
                  </h2>
                </div>
              </div>
            </div>
            <div className="row g-4">
              <div className="col-md-6 col-lg-4">
                <div className="blog-item wow fadeInUp" data-wow-delay=".25s">
                  <div className="blog-item-img">
                    <img src="/assets/img/blog/01.jpg" alt="Thumb" />
                    <span className="blog-date">
                      <i className="far fa-calendar-alt" /> Aug 12, 2024
                    </span>
                  </div>
                  <div className="blog-item-info">
                    <div className="blog-item-meta">
                      <ul>
                        <li>
                          <a href="#">
                            <i className="far fa-user-circle" /> By Alicia Davis
                          </a>
                        </li>

                      </ul>
                    </div>
                    <h4 className="blog-title">
                      <a href="#">
                        There are many variations of passage available majority
                        suffered.
                      </a>
                    </h4>
                    <p>
                      There are many variations available the majority have suffered
                      alteration randomised words.
                    </p>
                    <a className="theme-btn" href={"/news-event/1"}>
                      Read More
                      <i className="fas fa-arrow-right" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="blog-item wow fadeInDown" data-wow-delay=".25s">
                  <div className="blog-item-img">
                    <img src="/assets/img/blog/02.jpg" alt="Thumb" />
                    <span className="blog-date">
                      <i className="far fa-calendar-alt" /> Aug 15, 2024
                    </span>
                  </div>
                  <div className="blog-item-info">
                    <div className="blog-item-meta">
                      <ul>
                        <li>
                          <a href="#">
                            <i className="far fa-user-circle" /> By Habibbur Rahman
                          </a>
                        </li>

                      </ul>
                    </div>
                    <h4 className="blog-title">
                      <a href="#">
                        Contrary to popular belief making simply random text latin.
                      </a>
                    </h4>
                    <p>
                      There are many variations available the majority have suffered
                      alteration randomised words.
                    </p>
                    <a className="theme-btn" href={"/news-event/1"}>
                      Read More
                      <i className="fas fa-arrow-right" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="blog-item wow fadeInUp" data-wow-delay=".25s">
                  <div className="blog-item-img">
                    <img src="/assets/img/blog/03.jpg" alt="Thumb" />
                    <span className="blog-date">
                      <i className="far fa-calendar-alt" /> Aug 18, 2024
                    </span>
                  </div>
                  <div className="blog-item-info">
                    <div className="blog-item-meta">
                      <ul>
                        <li>
                          <a href="#">
                            <i className="far fa-user-circle" /> By Alicia Davis
                          </a>
                        </li>

                      </ul>
                    </div>
                    <h4 className="blog-title">
                      <a href="#">
                        {" "}
                        If you are going use passage you need sure there middle
                        text.
                      </a>
                    </h4>
                    <p>
                      There are many variations available the majority have suffered
                      alteration randomised words.
                    </p>
                    <a className="theme-btn" href={"/news-event/1"}>
                      Read More
                      <i className="fas fa-arrow-right" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* blog area end */}
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
        {/* instagram-area */}
        {/* <div className="instagram-area pb-100">
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
      {/* footer area */}

      {/* footer area end */}
      {/* scroll-top */}
      <a href="#" id="scroll-top">
        <i className="far fa-arrow-up-from-arc" />
      </a>
      {/* scroll-top end */}
      {/* modal quick shop*/}
      <div
        className="modal quickview fade"
        id="quickview"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="quickview"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i className="far fa-xmark" />
            </button>
            <div className="modal-body">
              <div className="row">
                <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                  <div className="quickview-img">
                    <img src="/assets/img/product/04.png" alt="#" />
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
                  <div className="quickview-content">
                    <h4 className="quickview-title">Surgical Face Mask</h4>
                    <div className="quickview-rating">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star-half-alt" />
                      <i className="far fa-star" />
                      <span className="rating-count"> (4 Customer Reviews)</span>
                    </div>
                    <div className="quickview-price">
                      <h5>
                        <del>$860</del>
                        <span>$740</span>
                      </h5>
                    </div>
                    <ul className="quickview-list">
                      <li>
                        Brand:<span>Medica</span>
                      </li>
                      <li>
                        Category:<span>Healthcare</span>
                      </li>
                      <li>
                        Stock:<span className="stock">Available</span>
                      </li>
                      <li>
                        Code:<span>789FGDF</span>
                      </li>
                    </ul>
                    <div className="quickview-cart">
                      <a href="#" className="theme-btn">
                        Add to cart
                      </a>
                    </div>
                    <div className="quickview-social">
                      <span>Share:</span>
                      <a href="#">
                        <i className="fab fa-facebook-f" />
                      </a>
                      <a href="#">
                        <i className="fab fa-x-twitter" />
                      </a>
                      <a href="#">
                        <i className="fab fa-pinterest-p" />
                      </a>
                      <a href="#">
                        <i className="fab fa-instagram" />
                      </a>
                      <a href="#">
                        <i className="fab fa-linkedin-in" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* modal quick shop end */}
    </>

  );
}
