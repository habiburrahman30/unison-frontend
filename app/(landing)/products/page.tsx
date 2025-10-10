import ProductGrid from "../components/ProductGrid";
import ProductList from "../components/ProductList";

export default function ProductsPage() {
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
                            <h4 className="breadcrumb-title">Shop Grid One</h4>
                            <ul className="breadcrumb-menu">
                                <li>
                                    <a href={"/"}>
                                        <i className="far fa-home" /> Home
                                    </a>
                                </li>
                                <li className="active">Shop Grid One</li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* breadcrumb end */}
                {/* shop-area */}
                <div className="shop-area bg py-90">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3">
                                <div className="shop-sidebar">
                                    <div className="shop-widget">
                                        <div className="shop-search-form">
                                            <h4 className="shop-widget-title">Search</h4>
                                            <form action="#">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Search"
                                                    />
                                                    <button >
                                                        <i className="far fa-search" />
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="shop-widget">
                                        <h4 className="shop-widget-title">Category</h4>
                                        <ul className="shop-category-list">
                                            <li>
                                                <a href="#">
                                                    Medicine<span>(15)</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    Healthcare<span>(23)</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    Beauty Care<span>(35)</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    Sexual Wellness<span>(46)</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    Fitness<span>(39)</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    Lab Test<span>(79)</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    Baby &amp; Mom Care<span>(28)</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    Supplement<span>(17)</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    Food &amp; Nutrition<span>(12)</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    Equipments<span>(74)</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    Medical Supplies<span>(38)</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    Pet Care<span>(22)</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    Others<span>(25)</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="shop-widget">
                                        <h4 className="shop-widget-title">Brands</h4>
                                        <ul className="shop-checkbox-list">
                                            <li>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="brand1"
                                                    />
                                                    <label className="form-check-label" htmlFor="brand1">
                                                        Tovol<span>(12)</span>
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="brand2"
                                                    />
                                                    <label className="form-check-label" htmlFor="brand2">
                                                        Sundoy<span>(15)</span>
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="brand3"
                                                    />
                                                    <label className="form-check-label" htmlFor="brand3">
                                                        Sahoo Medoc<span>(20)</span>
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="brand4"
                                                    />
                                                    <label className="form-check-label" htmlFor="brand4">
                                                        Casterly<span>(05)</span>
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="brand5"
                                                    />
                                                    <label className="form-check-label" htmlFor="brand5">
                                                        Maindeno<span>(09)</span>
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="brand6"
                                                    />
                                                    <label className="form-check-label" htmlFor="brand6">
                                                        Knroll Seproll<span>(25)</span>
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="brand7"
                                                    />
                                                    <label className="form-check-label" htmlFor="brand7">
                                                        Neo Enternity<span>(19)</span>
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="brand8"
                                                    />
                                                    <label className="form-check-label" htmlFor="brand8">
                                                        Charisha<span>(23)</span>
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="brand9"
                                                    />
                                                    <label className="form-check-label" htmlFor="brand9">
                                                        Audou<span>(13)</span>
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="brand10"
                                                    />
                                                    <label className="form-check-label" htmlFor="brand10">
                                                        Desioreck<span>(14)</span>
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="brand11"
                                                    />
                                                    <label className="form-check-label" htmlFor="brand11">
                                                        Rochel Brek<span>(16)</span>
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="brand12"
                                                    />
                                                    <label className="form-check-label" htmlFor="brand12">
                                                        Mordani<span>(17)</span>
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="brand13"
                                                    />
                                                    <label className="form-check-label" htmlFor="brand13">
                                                        Others<span>(18)</span>
                                                    </label>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="shop-widget">
                                        <h4 className="shop-widget-title">Price Range</h4>
                                        <div className="price-range-box">
                                            <div className="price-range-input">
                                                <input type="text" id="price-amount" readOnly={true} />
                                            </div>
                                            <div className="price-range" />
                                        </div>
                                    </div>
                                    <div className="shop-widget">
                                        <h4 className="shop-widget-title">Sales</h4>
                                        <ul className="shop-checkbox-list">
                                            <li>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="sale1"
                                                    />
                                                    <label className="form-check-label" htmlFor="sale1">
                                                        On Sale
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="sale2"
                                                    />
                                                    <label className="form-check-label" htmlFor="sale2">
                                                        In Stock
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="sale3"
                                                    />
                                                    <label className="form-check-label" htmlFor="sale3">
                                                        Out Of Stock
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="sale4"
                                                    />
                                                    <label className="form-check-label" htmlFor="sale4">
                                                        Discount
                                                    </label>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    {/* <div className="shop-widget">
                                        <h4 className="shop-widget-title">Ratings</h4>
                                        <ul className="shop-checkbox-list rating">
                                            <li>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="rate1"
                                                    />
                                                    <label className="form-check-label" htmlFor="rate1">
                                                        <i className="fas fa-star" />
                                                        <i className="fas fa-star" />
                                                        <i className="fas fa-star" />
                                                        <i className="fas fa-star" />
                                                        <i className="fas fa-star" />
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="rate2"
                                                    />
                                                    <label className="form-check-label" htmlFor="rate2">
                                                        <i className="fas fa-star" />
                                                        <i className="fas fa-star" />
                                                        <i className="fas fa-star" />
                                                        <i className="fas fa-star" />
                                                        <i className="fal fa-star" />
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="rate3"
                                                    />
                                                    <label className="form-check-label" htmlFor="rate3">
                                                        <i className="fas fa-star" />
                                                        <i className="fas fa-star" />
                                                        <i className="fas fa-star" />
                                                        <i className="fal fa-star" />
                                                        <i className="fal fa-star" />
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="rate4"
                                                    />
                                                    <label className="form-check-label" htmlFor="rate4">
                                                        <i className="fas fa-star" />
                                                        <i className="fas fa-star" />
                                                        <i className="fal fa-star" />
                                                        <i className="fal fa-star" />
                                                        <i className="fal fa-star" />
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="rate5"
                                                    />
                                                    <label className="form-check-label" htmlFor="rate5">
                                                        <i className="fas fa-star" />
                                                        <i className="fal fa-star" />
                                                        <i className="fal fa-star" />
                                                        <i className="fal fa-star" />
                                                        <i className="fal fa-star" />
                                                    </label>
                                                </div>
                                            </li>
                                        </ul>
                                    </div> */}
                                    <div className="shop-widget">
                                        <h4 className="shop-widget-title">Colors</h4>
                                        <ul className="shop-checkbox-list color">
                                            <li>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="color1"
                                                    />
                                                    <label className="form-check-label" htmlFor="color1">
                                                        <span style={{ backgroundColor: "#606ddd" }} />
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="color2"
                                                    />
                                                    <label className="form-check-label" htmlFor="color2">
                                                        <span style={{ backgroundColor: "#4caf50" }} />
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="color3"
                                                    />
                                                    <label className="form-check-label" htmlFor="color3">
                                                        <span style={{ backgroundColor: "#17a2b8" }} />
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="color4"
                                                    />
                                                    <label className="form-check-label" htmlFor="color4">
                                                        <span style={{ backgroundColor: "#ffc107" }} />
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="color5"
                                                    />
                                                    <label className="form-check-label" htmlFor="color5">
                                                        <span style={{ backgroundColor: "#f44336" }} />
                                                    </label>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="shop-widget">
                                        <h4 className="shop-widget-title">Sizes</h4>
                                        <ul className="shop-checkbox-list">
                                            <li>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="size1"
                                                    />
                                                    <label className="form-check-label" htmlFor="size1">
                                                        Extra Small
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="size2"
                                                    />
                                                    <label className="form-check-label" htmlFor="size2">
                                                        Small
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="size3"
                                                    />
                                                    <label className="form-check-label" htmlFor="size3">
                                                        Medium
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="size4"
                                                    />
                                                    <label className="form-check-label" htmlFor="size4">
                                                        Large
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="size5"
                                                    />
                                                    <label className="form-check-label" htmlFor="size5">
                                                        Extra Large
                                                    </label>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="shop-widget-banner mt-30 mb-50">
                                        <div
                                            className="banner-img"
                                            style={{
                                                backgroundImage: "url(/assets/img/banner/shop-banner.jpg)"
                                            }}
                                        />
                                        <div className="banner-content">
                                            <h6>
                                                Get <span>35% Off</span>
                                            </h6>
                                            <h4>New Collection of Medicine</h4>
                                            <a href="#" className="theme-btn">
                                                Shop Now
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <div className="col-md-12">
                                    <div className="shop-sort">
                                        <div className="shop-sort-box">
                                            <div className="shop-sorty-label">Sort By:</div>
                                            <select className="select">
                                                <option value={1}>Default Sorting</option>
                                                <option value={5}>Latest Items</option>
                                                <option value={2}>Best Seller Items</option>
                                                <option value={3}>Price - Low To High</option>
                                                <option value={4}>Price - High To Low</option>
                                            </select>
                                            <div className="shop-sort-show">Showing 1-10 of 50 Results</div>
                                        </div>
                                        <div className="shop-sort-gl">
                                            <a href="shop-grid.html" className="shop-sort-grid active">
                                                <i className="far fa-grid-round-2" />
                                            </a>
                                            <a href="shop-list.html" className="shop-sort-list">
                                                <i className="far fa-list-ul" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                {/* grid and list view */}
                                <ProductGrid />
                                {/* <ProductList /> */}
                                {/* grid and list view */}
                                {/* pagination */}
                                <div className="pagination-area mt-50">
                                    <div aria-label="Page navigation example">
                                        <ul className="pagination">
                                            <li className="page-item">
                                                <a className="page-link" href="#" aria-label="Previous">
                                                    <span aria-hidden="true">
                                                        <i className="far fa-arrow-left" />
                                                    </span>
                                                </a>
                                            </li>
                                            <li className="page-item active">
                                                <a className="page-link" href="#">
                                                    1
                                                </a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" href="#">
                                                    2
                                                </a>
                                            </li>
                                            <li className="page-item">
                                                <span className="page-link">...</span>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" href="#">
                                                    10
                                                </a>
                                            </li>
                                            <li className="page-item">
                                                <a className="page-link" href="#" aria-label="Next">
                                                    <span aria-hidden="true">
                                                        <i className="far fa-arrow-right" />
                                                    </span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {/* pagination end */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* shop-area end */}
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