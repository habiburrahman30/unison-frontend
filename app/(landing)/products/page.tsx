"use client"
import ProductGrid from "../components/ProductGrid";
import ProductList from "../components/ProductList";
import products from "@/app/data/products";
import brands from "@/app/data/brands";
import categoryes from "@/app/data/categoryes";
import { useEffect, useState } from "react";

export default function ProductsPage() {

    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [sortOption, setSortOption] = useState("default");


    //*** For Filter */
    const filteredProducts = products.filter((product) => {
        const brandMatch =
            selectedBrands.length === 0 || selectedBrands.includes(product.brand_id);

        const categoryMatch =
            selectedCategory === null || product.category_id === selectedCategory;

        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm.toLowerCase());

        return brandMatch && categoryMatch && matchesSearch;
    });




    // Sort Products
    let sortedProducts = [...filteredProducts];

    switch (sortOption) {
        case "latest":
            sortedProducts.sort((a, b) => b.id - a.id);
            break;

        case "bestseller":
            sortedProducts.sort((a, b) => (b.stock ?? 0) - (a.stock ?? 0));
            break;

        case "price-asc":
            sortedProducts.sort((a, b) => Number(a.price) - Number(b.price));
            break;

        case "price-desc":
            sortedProducts.sort((a, b) => Number(b.price) - Number(a.price));
            break;

        default:
            sortedProducts.sort((a, b) => a.id - b.id);
    }


    //*** For Pagination */
    const PRODUCTS_PER_PAGE = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);

    const paginatedProducts = sortedProducts.slice(
        (currentPage - 1) * PRODUCTS_PER_PAGE,
        currentPage * PRODUCTS_PER_PAGE
    );

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 1;

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);

            if (currentPage > maxVisible + 2) pages.push("...");

            for (
                let i = Math.max(2, currentPage - maxVisible);
                i <= Math.min(totalPages - 1, currentPage + maxVisible);
                i++
            ) {
                pages.push(i);
            }

            if (currentPage < totalPages - (maxVisible + 1)) pages.push("...");

            pages.push(totalPages);
        }

        return pages;
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [sortOption, selectedCategory, selectedBrands, searchTerm]);

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
                                            <form action="#" onSubmit={(e) => e.preventDefault()}>
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Search"
                                                        value={searchTerm}
                                                        onChange={(e) => setSearchTerm(e.target.value)}
                                                    />
                                                    <button >
                                                        <i className="far fa-search" />
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    {/* <div className="shop-widget">
                                        <div className="shop-search-form">
                                            <h4 className="shop-widget-title">Search</h4>
                                            <form
                                                onSubmit={(e) => e.preventDefault()} // prevent page reload
                                            >
                                                <div className="form-group d-flex">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Search"
                                                        value={searchTerm}
                                                        onChange={(e) => setSearchTerm(e.target.value)}
                                                    />
                                                    <button type="submit" className="btn btn-primary">
                                                        <i className="far fa-search" />
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div> */}
                                    <div className="shop-widget">
                                        <h4 className="shop-widget-title">Category</h4>
                                        <ul className="shop-category-list">
                                            <li>
                                                <a href="#" onClick={(e) => { e.preventDefault(); setSelectedCategory(null); }}>
                                                    All Categories
                                                </a>
                                            </li>
                                            {categoryes.map((cat, index) => {
                                                // Count products in this category
                                                const count = products.filter(n => n.category_id === cat.id).length;
                                                return (
                                                    <li key={cat.id}>
                                                        <a href="#"

                                                            className={selectedCategory === cat.id ? "active" : ""}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                setSelectedCategory(cat.id);
                                                            }}
                                                        >
                                                            {cat.name} {count > 0 ? <span>({count})</span> : ''}
                                                        </a>
                                                    </li>
                                                )
                                            })}
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
                                                        id="brand-all"
                                                        checked={selectedBrands.length === 0}
                                                        onChange={() => setSelectedBrands([])}
                                                    />
                                                    <label className="form-check-label" htmlFor="brand2">
                                                        All Brands<span>({products.length})</span>
                                                    </label>
                                                </div>
                                            </li>

                                            {brands.map((brand) => {
                                                // Count products in this category
                                                const count = products.filter(n => n.category_id === brand.id).length;
                                                return (
                                                    <li key={brand.id}>
                                                        <div className="form-check">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                id={`brand-${brand.id}`}
                                                                checked={selectedBrands.includes(brand.id)}
                                                                onChange={() => {
                                                                    if (selectedBrands.includes(brand.id)) {
                                                                        // remove from selection
                                                                        setSelectedBrands(selectedBrands.filter((id) => id !== brand.id));
                                                                    } else {
                                                                        // add to selection
                                                                        setSelectedBrands([...selectedBrands, brand.id]);
                                                                    }
                                                                }}
                                                            />
                                                            <label className="form-check-label" htmlFor={`brand-${brand.id}`}>
                                                                {brand.name} {count > 0 ? <span>({count})</span> : ''}
                                                            </label>
                                                        </div>
                                                    </li>
                                                )
                                            })}
                                            {/* <li>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="brand1"
                                                    />
                                                    <label className="form-check-label" htmlFor="brand1">
                                                        Advanced Sterilization Products (ASP)<span>(12)</span>
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
                                                        Pardo<span>(15)</span>
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
                                                        Mindray<span>(20)</span>
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
                                                        Mentice (The logo is very similar to Mentice)<span>(05)</span>
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
                                                        MEISSA (MEYSA TIBBİ CİHAZLAR)<span>(09)</span>
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
                                                        CPX (Brand of Precision UK for Medical Gas Pipeline Systems)<span>(25)</span>
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
                                                        Olidef Medical<span>(19)</span>
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
                                                        Medifa (Member of Reinsberg Group)<span>(23)</span>
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
                                                        Sterilmed Medical<span>(13)</span>
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
                                                        OXYMAT<span>(14)</span>
                                                    </label>
                                                </div>
                                            </li>   */}

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


                                </div>
                            </div>
                            <div className="col-lg-9">
                                <div className="col-md-12">
                                    <div className="shop-sort">
                                        <div className="shop-sort-box">
                                            <div className="shop-sorty-label">Sort By:</div>
                                            <select className="select"
                                                value={sortOption}
                                                onChange={(e) => setSortOption(e.target.value)}
                                            >
                                                <option value="default">Default Sorting</option>
                                                <option value="latest">Latest Items</option>
                                                <option value="bestseller">Best Seller Items</option>
                                                <option value="price-asc">Price - Low To High</option>
                                                <option value="price-desc">Price - High To Low</option>

                                            </select>
                                            <div className="shop-sort-show">Showing 1{paginatedProducts.length} of {filteredProducts.length} Results</div>
                                        </div>
                                        {/* <div className="shop-sort-gl">
                                            <a href="shop-grid.html" className="shop-sort-grid active">
                                                <i className="far fa-grid-round-2" />
                                            </a>
                                            <a href="shop-list.html" className="shop-sort-list">
                                                <i className="far fa-list-ul" />
                                            </a>
                                        </div> */}
                                    </div>
                                </div>
                                {/* grid and list view */}
                                {/* ✅ PASS FILTERED PRODUCTS */}
                                <ProductGrid products={paginatedProducts} />
                                {/* <ProductList /> */}
                                {/* grid and list view */}
                                {/* pagination */}

                                {products.length > 0 && (
                                    <div className="pagination-area mt-60">
                                        <div aria-label="Page navigation example">
                                            <ul className="pagination">
                                                <li className="page-item">
                                                    <a className="page-link" href="#" aria-label="Previous"

                                                        //  disabled={currentPage === 1}
                                                        onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                                                    >
                                                        <span aria-hidden="true">
                                                            <i className="far fa-arrow-left" />
                                                        </span>
                                                    </a>
                                                </li>
                                                {getPageNumbers().map((num, i) =>
                                                    num === "..." ? (
                                                        <li key={i} className="page-item">
                                                            <span className="page-link">...</span>
                                                        </li>
                                                    ) : (

                                                        <li key={i} className={`page-item ${currentPage === num ? "active" : ""}`}>
                                                            <a className="page-link" href="#" onClick={() => setCurrentPage(Number(num))}>
                                                                {num}
                                                            </a>
                                                        </li>
                                                    )
                                                )}

                                                <li className="page-item">
                                                    <a className="page-link" href="#" aria-label="Next"
                                                        //  disabled={currentPage === totalPages}
                                                        onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                                                    >
                                                        <span aria-hidden="true">
                                                            <i className="far fa-arrow-right" />
                                                        </span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                )}
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