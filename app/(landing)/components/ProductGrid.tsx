export default function ProductGrid() {
    return (<>
        <div className="shop-item-wrap item-4">
            <div className="row g-4">
                <div className="col-md-6 col-lg-4">
                    <div className="product-item">
                        <div className="product-img">
                            <span className="type">Trending</span>

                            <a href={`/products/${1}`}>
                                <img src="/assets/img/product/01.png" alt="" />
                            </a>
                            <div className="product-action-wrap">
                                <div className="product-action">
                                    <a
                                        href="#"
                                        data-bs-toggle="modal"
                                        data-bs-target="#quickview"
                                        data-tooltip="tooltip"
                                        title="Quick View"
                                    >
                                        <i className="far fa-eye" />
                                    </a>
                                    <a
                                        href="#"
                                        data-tooltip="tooltip"
                                        title="Add To Wishlist"
                                    >
                                        <i className="far fa-heart" />
                                    </a>
                                    <a
                                        href="#"
                                        data-tooltip="tooltip"
                                        title="Add To Compare"
                                    >
                                        <i className="far fa-arrows-repeat" />
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
                            <div className="product-bottom">
                                <div className="product-price">
                                    <span>$100.00</span>
                                </div>
                                <button
                                    type="button"
                                    className="product-cart-btn"
                                    data-bs-placement="left"
                                    data-tooltip="tooltip"
                                    title="Add To Cart"
                                >
                                    <i className="far fa-shopping-bag" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-4">
                    <div className="product-item">
                        <div className="product-img">
                            <span className="type hot">Hot</span>
                            <a href="shop-single.html">
                                <img src="/assets/img/product/02.png" alt="" />
                            </a>
                            <div className="product-action-wrap">
                                <div className="product-action">
                                    <a
                                        href="#"
                                        data-bs-toggle="modal"
                                        data-bs-target="#quickview"
                                        data-tooltip="tooltip"
                                        title="Quick View"
                                    >
                                        <i className="far fa-eye" />
                                    </a>
                                    <a
                                        href="#"
                                        data-tooltip="tooltip"
                                        title="Add To Wishlist"
                                    >
                                        <i className="far fa-heart" />
                                    </a>
                                    <a
                                        href="#"
                                        data-tooltip="tooltip"
                                        title="Add To Compare"
                                    >
                                        <i className="far fa-arrows-repeat" />
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
                            <div className="product-bottom">
                                <div className="product-price">
                                    <span>$100.00</span>
                                </div>
                                <button
                                    type="button"
                                    className="product-cart-btn"
                                    data-bs-placement="left"
                                    data-tooltip="tooltip"
                                    title="Add To Cart"
                                >
                                    <i className="far fa-shopping-bag" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-4">
                    <div className="product-item">
                        <div className="product-img">
                            <span className="type oos">Out Of Stock</span>
                            <a href="shop-single.html">
                                <img src="/assets/img/product/03.png" alt="" />
                            </a>
                            <div className="product-action-wrap">
                                <div className="product-action">
                                    <a
                                        href="#"
                                        data-bs-toggle="modal"
                                        data-bs-target="#quickview"
                                        data-tooltip="tooltip"
                                        title="Quick View"
                                    >
                                        <i className="far fa-eye" />
                                    </a>
                                    <a
                                        href="#"
                                        data-tooltip="tooltip"
                                        title="Add To Wishlist"
                                    >
                                        <i className="far fa-heart" />
                                    </a>
                                    <a
                                        href="#"
                                        data-tooltip="tooltip"
                                        title="Add To Compare"
                                    >
                                        <i className="far fa-arrows-repeat" />
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
                            <div className="product-bottom">
                                <div className="product-price">
                                    <span>$100.00</span>
                                </div>
                                <button
                                    type="button"
                                    className="product-cart-btn"
                                    data-bs-placement="left"
                                    data-tooltip="tooltip"
                                    title="Add To Cart"
                                >
                                    <i className="far fa-shopping-bag" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-4">
                    <div className="product-item">
                        <div className="product-img">
                            <a href="shop-single.html">
                                <img src="/assets/img/product/04.png" alt="" />
                            </a>
                            <div className="product-action-wrap">
                                <div className="product-action">
                                    <a
                                        href="#"
                                        data-bs-toggle="modal"
                                        data-bs-target="#quickview"
                                        data-tooltip="tooltip"
                                        title="Quick View"
                                    >
                                        <i className="far fa-eye" />
                                    </a>
                                    <a
                                        href="#"
                                        data-tooltip="tooltip"
                                        title="Add To Wishlist"
                                    >
                                        <i className="far fa-heart" />
                                    </a>
                                    <a
                                        href="#"
                                        data-tooltip="tooltip"
                                        title="Add To Compare"
                                    >
                                        <i className="far fa-arrows-repeat" />
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
                            <div className="product-bottom">
                                <div className="product-price">
                                    <span>$100.00</span>
                                </div>
                                <button
                                    type="button"
                                    className="product-cart-btn"
                                    data-bs-placement="left"
                                    data-tooltip="tooltip"
                                    title="Add To Cart"
                                >
                                    <i className="far fa-shopping-bag" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-4">
                    <div className="product-item">
                        <div className="product-img">
                            <span className="type discount">10% Off</span>
                            <a href="shop-single.html">
                                <img src="/assets/img/product/05.png" alt="" />
                            </a>
                            <div className="product-action-wrap">
                                <div className="product-action">
                                    <a
                                        href="#"
                                        data-bs-toggle="modal"
                                        data-bs-target="#quickview"
                                        data-tooltip="tooltip"
                                        title="Quick View"
                                    >
                                        <i className="far fa-eye" />
                                    </a>
                                    <a
                                        href="#"
                                        data-tooltip="tooltip"
                                        title="Add To Wishlist"
                                    >
                                        <i className="far fa-heart" />
                                    </a>
                                    <a
                                        href="#"
                                        data-tooltip="tooltip"
                                        title="Add To Compare"
                                    >
                                        <i className="far fa-arrows-repeat" />
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
                            <div className="product-bottom">
                                <div className="product-price">
                                    <del>120.00</del>
                                    <span>$100.00</span>
                                </div>
                                <button
                                    type="button"
                                    className="product-cart-btn"
                                    data-bs-placement="left"
                                    data-tooltip="tooltip"
                                    title="Add To Cart"
                                >
                                    <i className="far fa-shopping-bag" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-4">
                    <div className="product-item">
                        <div className="product-img">
                            <a href="shop-single.html">
                                <img src="/assets/img/product/06.png" alt="" />
                            </a>
                            <div className="product-action-wrap">
                                <div className="product-action">
                                    <a
                                        href="#"
                                        data-bs-toggle="modal"
                                        data-bs-target="#quickview"
                                        data-tooltip="tooltip"
                                        title="Quick View"
                                    >
                                        <i className="far fa-eye" />
                                    </a>
                                    <a
                                        href="#"
                                        data-tooltip="tooltip"
                                        title="Add To Wishlist"
                                    >
                                        <i className="far fa-heart" />
                                    </a>
                                    <a
                                        href="#"
                                        data-tooltip="tooltip"
                                        title="Add To Compare"
                                    >
                                        <i className="far fa-arrows-repeat" />
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
                            <div className="product-bottom">
                                <div className="product-price">
                                    <span>$100.00</span>
                                </div>
                                <button
                                    type="button"
                                    className="product-cart-btn"
                                    data-bs-placement="left"
                                    data-tooltip="tooltip"
                                    title="Add To Cart"
                                >
                                    <i className="far fa-shopping-bag" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-4">
                    <div className="product-item">
                        <div className="product-img">
                            <span className="type new">New</span>
                            <a href="shop-single.html">
                                <img src="/assets/img/product/07.png" alt="" />
                            </a>
                            <div className="product-action-wrap">
                                <div className="product-action">
                                    <a
                                        href="#"
                                        data-bs-toggle="modal"
                                        data-bs-target="#quickview"
                                        data-tooltip="tooltip"
                                        title="Quick View"
                                    >
                                        <i className="far fa-eye" />
                                    </a>
                                    <a
                                        href="#"
                                        data-tooltip="tooltip"
                                        title="Add To Wishlist"
                                    >
                                        <i className="far fa-heart" />
                                    </a>
                                    <a
                                        href="#"
                                        data-tooltip="tooltip"
                                        title="Add To Compare"
                                    >
                                        <i className="far fa-arrows-repeat" />
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
                            <div className="product-bottom">
                                <div className="product-price">
                                    <span>$100.00</span>
                                </div>
                                <button
                                    type="button"
                                    className="product-cart-btn"
                                    data-bs-placement="left"
                                    data-tooltip="tooltip"
                                    title="Add To Cart"
                                >
                                    <i className="far fa-shopping-bag" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-4">
                    <div className="product-item">
                        <div className="product-img">
                            <a href="shop-single.html">
                                <img src="/assets/img/product/08.png" alt="" />
                            </a>
                            <div className="product-action-wrap">
                                <div className="product-action">
                                    <a
                                        href="#"
                                        data-bs-toggle="modal"
                                        data-bs-target="#quickview"
                                        data-tooltip="tooltip"
                                        title="Quick View"
                                    >
                                        <i className="far fa-eye" />
                                    </a>
                                    <a
                                        href="#"
                                        data-tooltip="tooltip"
                                        title="Add To Wishlist"
                                    >
                                        <i className="far fa-heart" />
                                    </a>
                                    <a
                                        href="#"
                                        data-tooltip="tooltip"
                                        title="Add To Compare"
                                    >
                                        <i className="far fa-arrows-repeat" />
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
                            <div className="product-bottom">
                                <div className="product-price">
                                    <span>$100.00</span>
                                </div>
                                <button
                                    type="button"
                                    className="product-cart-btn"
                                    data-bs-placement="left"
                                    data-tooltip="tooltip"
                                    title="Add To Cart"
                                >
                                    <i className="far fa-shopping-bag" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-4">
                    <div className="product-item">
                        <div className="product-img">
                            <a href="shop-single.html">
                                <img src="/assets/img/product/09.png" alt="" />
                            </a>
                            <div className="product-action-wrap">
                                <div className="product-action">
                                    <a
                                        href="#"
                                        data-bs-toggle="modal"
                                        data-bs-target="#quickview"
                                        data-tooltip="tooltip"
                                        title="Quick View"
                                    >
                                        <i className="far fa-eye" />
                                    </a>
                                    <a
                                        href="#"
                                        data-tooltip="tooltip"
                                        title="Add To Wishlist"
                                    >
                                        <i className="far fa-heart" />
                                    </a>
                                    <a
                                        href="#"
                                        data-tooltip="tooltip"
                                        title="Add To Compare"
                                    >
                                        <i className="far fa-arrows-repeat" />
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
                            <div className="product-bottom">
                                <div className="product-price">
                                    <span>$100.00</span>
                                </div>
                                <button
                                    type="button"
                                    className="product-cart-btn"
                                    data-bs-placement="left"
                                    data-tooltip="tooltip"
                                    title="Add To Cart"
                                >
                                    <i className="far fa-shopping-bag" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-4">
                    <div className="product-item">
                        <div className="product-img">
                            <a href="shop-single.html">
                                <img src="/assets/img/product/10.png" alt="" />
                            </a>
                            <div className="product-action-wrap">
                                <div className="product-action">
                                    <a
                                        href="#"
                                        data-bs-toggle="modal"
                                        data-bs-target="#quickview"
                                        data-tooltip="tooltip"
                                        title="Quick View"
                                    >
                                        <i className="far fa-eye" />
                                    </a>
                                    <a
                                        href="#"
                                        data-tooltip="tooltip"
                                        title="Add To Wishlist"
                                    >
                                        <i className="far fa-heart" />
                                    </a>
                                    <a
                                        href="#"
                                        data-tooltip="tooltip"
                                        title="Add To Compare"
                                    >
                                        <i className="far fa-arrows-repeat" />
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
                            <div className="product-bottom">
                                <div className="product-price">
                                    <span>$100.00</span>
                                </div>
                                <button
                                    type="button"
                                    className="product-cart-btn"
                                    data-bs-placement="left"
                                    data-tooltip="tooltip"
                                    title="Add To Cart"
                                >
                                    <i className="far fa-shopping-bag" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-4">
                    <div className="product-item">
                        <div className="product-img">
                            <a href="shop-single.html">
                                <img src="/assets/img/product/11.png" alt="" />
                            </a>
                            <div className="product-action-wrap">
                                <div className="product-action">
                                    <a
                                        href="#"
                                        data-bs-toggle="modal"
                                        data-bs-target="#quickview"
                                        data-tooltip="tooltip"
                                        title="Quick View"
                                    >
                                        <i className="far fa-eye" />
                                    </a>
                                    <a
                                        href="#"
                                        data-tooltip="tooltip"
                                        title="Add To Wishlist"
                                    >
                                        <i className="far fa-heart" />
                                    </a>
                                    <a
                                        href="#"
                                        data-tooltip="tooltip"
                                        title="Add To Compare"
                                    >
                                        <i className="far fa-arrows-repeat" />
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
                            <div className="product-bottom">
                                <div className="product-price">
                                    <span>$100.00</span>
                                </div>
                                <button
                                    type="button"
                                    className="product-cart-btn"
                                    data-bs-placement="left"
                                    data-tooltip="tooltip"
                                    title="Add To Cart"
                                >
                                    <i className="far fa-shopping-bag" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-4">
                    <div className="product-item">
                        <div className="product-img">
                            <span className="type hot">Hot</span>
                            <a href="shop-single.html">
                                <img src="/assets/img/product/12.png" alt="" />
                            </a>
                            <div className="product-action-wrap">
                                <div className="product-action">
                                    <a
                                        href="#"
                                        data-bs-toggle="modal"
                                        data-bs-target="#quickview"
                                        data-tooltip="tooltip"
                                        title="Quick View"
                                    >
                                        <i className="far fa-eye" />
                                    </a>
                                    <a
                                        href="#"
                                        data-tooltip="tooltip"
                                        title="Add To Wishlist"
                                    >
                                        <i className="far fa-heart" />
                                    </a>
                                    <a
                                        href="#"
                                        data-tooltip="tooltip"
                                        title="Add To Compare"
                                    >
                                        <i className="far fa-arrows-repeat" />
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
                            <div className="product-bottom">
                                <div className="product-price">
                                    <span>$100.00</span>
                                </div>
                                <button
                                    type="button"
                                    className="product-cart-btn"
                                    data-bs-placement="left"
                                    data-tooltip="tooltip"
                                    title="Add To Cart"
                                >
                                    <i className="far fa-shopping-bag" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-4">
                    <div className="product-item">
                        <div className="product-img">
                            <a href="shop-single.html">
                                <img src="/assets/img/product/13.png" alt="" />
                            </a>
                            <div className="product-action-wrap">
                                <div className="product-action">
                                    <a
                                        href="#"
                                        data-bs-toggle="modal"
                                        data-bs-target="#quickview"
                                        data-tooltip="tooltip"
                                        title="Quick View"
                                    >
                                        <i className="far fa-eye" />
                                    </a>
                                    <a
                                        href="#"
                                        data-tooltip="tooltip"
                                        title="Add To Wishlist"
                                    >
                                        <i className="far fa-heart" />
                                    </a>
                                    <a
                                        href="#"
                                        data-tooltip="tooltip"
                                        title="Add To Compare"
                                    >
                                        <i className="far fa-arrows-repeat" />
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
                            <div className="product-bottom">
                                <div className="product-price">
                                    <span>$100.00</span>
                                </div>
                                <button
                                    type="button"
                                    className="product-cart-btn"
                                    data-bs-placement="left"
                                    data-tooltip="tooltip"
                                    title="Add To Cart"
                                >
                                    <i className="far fa-shopping-bag" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-4">
                    <div className="product-item">
                        <div className="product-img">
                            <a href="shop-single.html">
                                <img src="/assets/img/product/14.png" alt="" />
                            </a>
                            <div className="product-action-wrap">
                                <div className="product-action">
                                    <a
                                        href="#"
                                        data-bs-toggle="modal"
                                        data-bs-target="#quickview"
                                        data-tooltip="tooltip"
                                        title="Quick View"
                                    >
                                        <i className="far fa-eye" />
                                    </a>
                                    <a
                                        href="#"
                                        data-tooltip="tooltip"
                                        title="Add To Wishlist"
                                    >
                                        <i className="far fa-heart" />
                                    </a>
                                    <a
                                        href="#"
                                        data-tooltip="tooltip"
                                        title="Add To Compare"
                                    >
                                        <i className="far fa-arrows-repeat" />
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
                            <div className="product-bottom">
                                <div className="product-price">
                                    <span>$100.00</span>
                                </div>
                                <button
                                    type="button"
                                    className="product-cart-btn"
                                    data-bs-placement="left"
                                    data-tooltip="tooltip"
                                    title="Add To Cart"
                                >
                                    <i className="far fa-shopping-bag" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-4">
                    <div className="product-item">
                        <div className="product-img">
                            <a href="shop-single.html">
                                <img src="/assets/img/product/15.png" alt="" />
                            </a>
                            <div className="product-action-wrap">
                                <div className="product-action">
                                    <a
                                        href="#"
                                        data-bs-toggle="modal"
                                        data-bs-target="#quickview"
                                        data-tooltip="tooltip"
                                        title="Quick View"
                                    >
                                        <i className="far fa-eye" />
                                    </a>
                                    <a
                                        href="#"
                                        data-tooltip="tooltip"
                                        title="Add To Wishlist"
                                    >
                                        <i className="far fa-heart" />
                                    </a>
                                    <a
                                        href="#"
                                        data-tooltip="tooltip"
                                        title="Add To Compare"
                                    >
                                        <i className="far fa-arrows-repeat" />
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
                            <div className="product-bottom">
                                <div className="product-price">
                                    <span>$100.00</span>
                                </div>
                                <button
                                    type="button"
                                    className="product-cart-btn"
                                    data-bs-placement="left"
                                    data-tooltip="tooltip"
                                    title="Add To Cart"
                                >
                                    <i className="far fa-shopping-bag" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-4">
                    <div className="product-item">
                        <div className="product-img">
                            <a href="shop-single.html">
                                <img src="/assets/img/product/16.png" alt="" />
                            </a>
                            <div className="product-action-wrap">
                                <div className="product-action">
                                    <a
                                        href="#"
                                        data-bs-toggle="modal"
                                        data-bs-target="#quickview"
                                        data-tooltip="tooltip"
                                        title="Quick View"
                                    >
                                        <i className="far fa-eye" />
                                    </a>
                                    <a
                                        href="#"
                                        data-tooltip="tooltip"
                                        title="Add To Wishlist"
                                    >
                                        <i className="far fa-heart" />
                                    </a>
                                    <a
                                        href="#"
                                        data-tooltip="tooltip"
                                        title="Add To Compare"
                                    >
                                        <i className="far fa-arrows-repeat" />
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
                            <div className="product-bottom">
                                <div className="product-price">
                                    <span>$100.00</span>
                                </div>
                                <button
                                    type="button"
                                    className="product-cart-btn"
                                    data-bs-placement="left"
                                    data-tooltip="tooltip"
                                    title="Add To Cart"
                                >
                                    <i className="far fa-shopping-bag" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-4">
                    <div className="product-item">
                        <div className="product-img">
                            <a href="shop-single.html">
                                <img src="/assets/img/product/17.png" alt="" />
                            </a>
                            <div className="product-action-wrap">
                                <div className="product-action">
                                    <a
                                        href="#"
                                        data-bs-toggle="modal"
                                        data-bs-target="#quickview"
                                        data-tooltip="tooltip"
                                        title="Quick View"
                                    >
                                        <i className="far fa-eye" />
                                    </a>
                                    <a
                                        href="#"
                                        data-tooltip="tooltip"
                                        title="Add To Wishlist"
                                    >
                                        <i className="far fa-heart" />
                                    </a>
                                    <a
                                        href="#"
                                        data-tooltip="tooltip"
                                        title="Add To Compare"
                                    >
                                        <i className="far fa-arrows-repeat" />
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
                            <div className="product-bottom">
                                <div className="product-price">
                                    <span>$100.00</span>
                                </div>
                                <button
                                    type="button"
                                    className="product-cart-btn"
                                    data-bs-placement="left"
                                    data-tooltip="tooltip"
                                    title="Add To Cart"
                                >
                                    <i className="far fa-shopping-bag" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-4">
                    <div className="product-item">
                        <div className="product-img">
                            <a href="shop-single.html">
                                <img src="/assets/img/product/18.png" alt="" />
                            </a>
                            <div className="product-action-wrap">
                                <div className="product-action">
                                    <a
                                        href="#"
                                        data-bs-toggle="modal"
                                        data-bs-target="#quickview"
                                        data-tooltip="tooltip"
                                        title="Quick View"
                                    >
                                        <i className="far fa-eye" />
                                    </a>
                                    <a
                                        href="#"
                                        data-tooltip="tooltip"
                                        title="Add To Wishlist"
                                    >
                                        <i className="far fa-heart" />
                                    </a>
                                    <a
                                        href="#"
                                        data-tooltip="tooltip"
                                        title="Add To Compare"
                                    >
                                        <i className="far fa-arrows-repeat" />
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
                            <div className="product-bottom">
                                <div className="product-price">
                                    <span>$100.00</span>
                                </div>
                                <button
                                    type="button"
                                    className="product-cart-btn"
                                    data-bs-placement="left"
                                    data-tooltip="tooltip"
                                    title="Add To Cart"
                                >
                                    <i className="far fa-shopping-bag" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-4">
                    <div className="product-item">
                        <div className="product-img">
                            <span className="type new">New</span>
                            <a href="shop-single.html">
                                <img src="/assets/img/product/19.png" alt="" />
                            </a>
                            <div className="product-action-wrap">
                                <div className="product-action">
                                    <a
                                        href="#"
                                        data-bs-toggle="modal"
                                        data-bs-target="#quickview"
                                        data-tooltip="tooltip"
                                        title="Quick View"
                                    >
                                        <i className="far fa-eye" />
                                    </a>
                                    <a
                                        href="#"
                                        data-tooltip="tooltip"
                                        title="Add To Wishlist"
                                    >
                                        <i className="far fa-heart" />
                                    </a>
                                    <a
                                        href="#"
                                        data-tooltip="tooltip"
                                        title="Add To Compare"
                                    >
                                        <i className="far fa-arrows-repeat" />
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
                            <div className="product-bottom">
                                <div className="product-price">
                                    <span>$100.00</span>
                                </div>
                                <button
                                    type="button"
                                    className="product-cart-btn"
                                    data-bs-placement="left"
                                    data-tooltip="tooltip"
                                    title="Add To Cart"
                                >
                                    <i className="far fa-shopping-bag" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-4">
                    <div className="product-item">
                        <div className="product-img">
                            <a href="shop-single.html">
                                <img src="/assets/img/product/20.png" alt="" />
                            </a>
                            <div className="product-action-wrap">
                                <div className="product-action">
                                    <a
                                        href="#"
                                        data-bs-toggle="modal"
                                        data-bs-target="#quickview"
                                        data-tooltip="tooltip"
                                        title="Quick View"
                                    >
                                        <i className="far fa-eye" />
                                    </a>
                                    <a
                                        href="#"
                                        data-tooltip="tooltip"
                                        title="Add To Wishlist"
                                    >
                                        <i className="far fa-heart" />
                                    </a>
                                    <a
                                        href="#"
                                        data-tooltip="tooltip"
                                        title="Add To Compare"
                                    >
                                        <i className="far fa-arrows-repeat" />
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
                            <div className="product-bottom">
                                <div className="product-price">
                                    <span>$100.00</span>
                                </div>
                                <button
                                    type="button"
                                    className="product-cart-btn"
                                    data-bs-placement="left"
                                    data-tooltip="tooltip"
                                    title="Add To Cart"
                                >
                                    <i className="far fa-shopping-bag" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-4">
                    <div className="product-item">
                        <div className="product-img">
                            <a href="shop-single.html">
                                <img src="/assets/img/product/21.png" alt="" />
                            </a>
                            <div className="product-action-wrap">
                                <div className="product-action">
                                    <a
                                        href="#"
                                        data-bs-toggle="modal"
                                        data-bs-target="#quickview"
                                        data-tooltip="tooltip"
                                        title="Quick View"
                                    >
                                        <i className="far fa-eye" />
                                    </a>
                                    <a
                                        href="#"
                                        data-tooltip="tooltip"
                                        title="Add To Wishlist"
                                    >
                                        <i className="far fa-heart" />
                                    </a>
                                    <a
                                        href="#"
                                        data-tooltip="tooltip"
                                        title="Add To Compare"
                                    >
                                        <i className="far fa-arrows-repeat" />
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
                            <div className="product-bottom">
                                <div className="product-price">
                                    <span>$100.00</span>
                                </div>
                                <button
                                    type="button"
                                    className="product-cart-btn"
                                    data-bs-placement="left"
                                    data-tooltip="tooltip"
                                    title="Add To Cart"
                                >
                                    <i className="far fa-shopping-bag" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}