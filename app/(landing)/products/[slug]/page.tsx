

import products from "@/app/data/products";
import brands from "@/app/data/brands";
import categoryes from "@/app/data/categoryes";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {

    const { slug } = await params; // ✅ Must await

    const product = products.find((item) => item.slug === slug);
    const brand = brands.find((item) => item.id == product?.brand_id);
    const category = categoryes.find((cat) => cat.id == product?.category_id);

    if (!product) return notFound();
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
                            <h4 className="breadcrumb-title">Shop Single</h4>
                            <ul className="breadcrumb-menu">
                                <li>
                                    <a href="index-2.html">
                                        <i className="far fa-home" /> Home
                                    </a>
                                </li>
                                <li className="active">Shop Single</li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* breadcrumb end */}
                {/* shop single */}
                <div className="shop-single py-90">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-9 col-lg-6 col-xxl-5">
                                <div className="shop-single-gallery">
                                    {/* <a
                                        className="shop-single-video popup-youtube"
                                        href="https://www.youtube.com/watch?v=ckHzmP1evNU"
                                        data-tooltip="tooltip"
                                        title="Watch Video"
                                    >
                                        <i className="far fa-play" />
                                    </a> */}
                                    <div className="flexslider-thumbnails">
                                        <ul className="slides ">

                                            {product.images.map((img, index) => (

                                                <li
                                                    data-thumb={img}
                                                    rel="adjustX:10, adjustY:"
                                                >
                                                    <img src={img} alt={product.name} />
                                                </li>
                                            ))}

                                            {/* <li data-thumb="/assets/img/product/02.png">
                                                <img src="/assets/img/product/02.png" alt="#" />
                                            </li>
                                            <li data-thumb="/assets/img/product/03.png">
                                                <img src="/assets/img/product/03.png" alt="#" />
                                            </li>
                                            <li data-thumb="/assets/img/product/04.png">
                                                <img src="/assets/img/product/04.png" alt="#" />
                                            </li> */}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 col-lg-6 col-xxl-6">
                                <div className="shop-single-info">
                                    <h4 className="shop-single-title">{product.name}</h4>

                                    <h5 className="widget-title pt-20">
                                        Product Description
                                    </h5>

                                    <p className="mb-3 ">
                                        {product.product_description}
                                    </p>

                                    <h5 className="widget-title pt-10">
                                        Technical Discription
                                    </h5>

                                    <p className="mb-3 ">
                                        {product.technical_discription}
                                    </p>

                                    <div className="shop-single-sortinfo">
                                        <ul>
                                            <li>

                                                Stock: {product.stock > 0
                                                    ? <span className="text-success">Available</span>
                                                    : <span className="text-danger">Not Available</span>}

                                            </li>
                                            <li>
                                                Origin: <span>{product.country_of_origin}</span>
                                            </li>
                                            <li>
                                                Category: <span>{category?.name}</span>
                                            </li>
                                            <li>
                                                Brand: <a href={brand?.name}>{brand?.name}</a>
                                            </li>

                                        </ul>
                                    </div>

                                    <a href={product.product_url} target="_blank"
                                        rel="noopener noreferrer" className="theme-btn mt-4">
                                        View Product
                                        <i className="fas fa-arrow-right" />
                                    </a>

                                </div>
                            </div>
                        </div>
                        {/* shop single details */}
                        {/* <div className="shop-single-details">
                            <nav>
                                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                    <button
                                        className="nav-link active"
                                        id="nav-tab1"
                                        data-bs-toggle="tab"
                                        data-bs-target="#tab1"
                                        type="button"
                                        role="tab"
                                        aria-controls="tab1"
                                        aria-selected="true"
                                    >
                                        Description
                                    </button>
                                    <button
                                        className="nav-link"
                                        id="nav-tab2"
                                        data-bs-toggle="tab"
                                        data-bs-target="#tab2"
                                        type="button"
                                        role="tab"
                                        aria-controls="tab2"
                                        aria-selected="false"
                                    >
                                        Additional Info
                                    </button>

                                </div>
                            </nav>
                            <div className="tab-content" id="nav-tabContent">
                                <div
                                    className="tab-pane fade show active"
                                    id="tab1"
                                    role="tabpanel"
                                    aria-labelledby="nav-tab1"
                                >
                                    <div className="shop-single-desc">
                                        <p>
                                            There are many variations of passages of Lorem Ipsum available,
                                            but the majority have suffered alteration in some form, by
                                            injected humour, or randomised words which don't look even
                                            slightly believable. If you are going to use a passage of Lorem
                                            Ipsum, you need to be sure there isn't anything embarrassing
                                            hidden in the middle of text. All the Lorem Ipsum generators on
                                            the Internet tend to repeat predefined chunks as necessary,
                                            making this the first true generator on the Internet.
                                        </p>
                                        <p>
                                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                                            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                                            quae ab illo inventore veritatis et quasi architecto beatae
                                            vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                                            voluptas sit aspernatur aut odit aut fugit, sed quia
                                            consequuntur magni dolores eos qui ratione voluptatem sequi
                                            nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                                            sit amet, consectetur, adipisci velit.
                                        </p>
                                        <div className="row">
                                            <div className="col-lg-5 col-xl-4">
                                                <div className="shop-single-list">
                                                    <h5 className="title">Features</h5>
                                                    <ul>
                                                        <li>Modern Art Deco Chaise Lounge</li>
                                                        <li>Unique cylindrical design copper finish</li>
                                                        <li>Covered in grey velvet fabric</li>
                                                        <li>Modern Bookcase in Copper Colored Finish</li>
                                                        <li>Use of Modern Materials</li>
                                                        <li>Mirrored compartments and upgraded interior</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-xl-5">
                                                <div className="shop-single-list">
                                                    <h5 className="title">Specifications</h5>
                                                    <ul>
                                                        <li>
                                                            <span>Dimensions:</span> 4ft W x 7ft h
                                                        </li>
                                                        <li>
                                                            <span>Model Year:</span> 2024
                                                        </li>
                                                        <li>
                                                            <span>Available Sizes:</span> 8.5, 9.0, 9.5, 10.0
                                                        </li>
                                                        <li>
                                                            <span>Manufacturer:</span> Reebok Inc.
                                                        </li>
                                                        <li>
                                                            <span>Available Colors:</span>{" "}
                                                            White/Red/Blue,Black/Orange/Green
                                                        </li>
                                                        <li>
                                                            <span>Made In:</span> USA
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="tab-pane fade"
                                    id="tab2"
                                    role="tabpanel"
                                    aria-labelledby="nav-tab2"
                                >
                                    <div className="shop-single-additional">
                                        <p>
                                            There are many variations of passages of Lorem Ipsum available,
                                            but the majority have suffered alteration in some form, by
                                            injected humour, or randomised words which don't look even
                                            slightly believable. If you are going to use a passage of Lorem
                                            Ipsum, you need to be sure there isn't anything embarrassing
                                            hidden in the middle of text. All the Lorem Ipsum generators on
                                            the Internet tend to repeat predefined chunks as necessary,
                                            making this the first true generator on the Internet.
                                        </p>
                                        <p>
                                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                                            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                                            quae ab illo inventore veritatis et quasi architecto beatae
                                            vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                                            voluptas sit aspernatur aut odit aut fugit, sed quia
                                            consequuntur magni dolores eos qui ratione voluptatem sequi
                                            nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                                            sit amet, consectetur, adipisci velit.
                                        </p>
                                        <div className="shop-single-list">
                                            <h5 className="title">Shipping Options:</h5>
                                            <ul>
                                                <li>
                                                    <span>Standard:</span> 6-7 Days, Shipping Cost - Free
                                                </li>
                                                <li>
                                                    <span>Express:</span> 1-2 Days, Shipping Cost - $20
                                                </li>
                                                <li>
                                                    <span>Courier:</span> 2-3 Days, Shipping Cost - $30
                                                </li>
                                                <li>
                                                    <span>Fastgo:</span> 1-3 Days, Shipping Cost - $15
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div> */}
                        {/* shop single details end */}
                        {/* related item */}
                        {/* <div className="product-area related-item pt-40">
                            <div className="container px-0">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="site-heading-inline">
                                            <h2 className="site-title">Related Items</h2>
                                            <a href={"/products"}>
                                                View More <i className="fas fa-arrow-right" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="row g-4 item-2">
                                    <div className="col-md-6 col-lg-3">
                                        <div className="product-item">
                                            <div className="product-img">
                                                <span className="type new">New</span>
                                                <a href="shop-single.html">
                                                    <img src="/assets/img/product/07.png" alt="" />
                                                </a>
                                                <div className="product-action-wrap">

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
                                    <div className="col-md-6 col-lg-3">
                                        <div className="product-item">
                                            <div className="product-img">
                                                <span className="type hot">Hot</span>
                                                <a href="shop-single.html">
                                                    <img src="/assets/img/product/08.png" alt="" />
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
                                    <div className="col-md-6 col-lg-3">
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
                                    <div className="col-md-6 col-lg-3">
                                        <div className="product-item">
                                            <div className="product-img">
                                                <span className="type discount">10% Off</span>
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
                                </div>
                            </div>
                        </div> */}
                        {/* related item end */}
                    </div>
                </div>
                {/* shop single end */}



            </main>


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