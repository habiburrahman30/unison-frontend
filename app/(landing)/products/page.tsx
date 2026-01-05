
import { getProducts } from "@/lib/api/products";
import ProductGrid from "../components/ProductGrid";
import ProductsPagination from "../components/ProductsPagination";
import ProductsSidebar from "../components/ProductsSidebar";

interface PageProps {
    searchParams: Promise<{
        page?: string;
        search?: string;
        category_id?: string;
        brand_id?: string;
    }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {



    const params = await searchParams;

    const page = Number(params.page) || 1;
    const search = params.search || "";
    const categoryId = params.category_id ? Number(params.category_id) : undefined;
    const brandId = params.brand_id ? Number(params.brand_id) : undefined;

    const data = await getProducts({
        page,
        limit: 20,
        search,
        category_id: categoryId,
        brand_id: brandId,
    });

    // Serialize to plain objects (alternative method)
    const serializedData = JSON.parse(JSON.stringify(data));




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
                                <ProductsSidebar products={data.products} />
                            </div>
                            <div className="col-lg-9">

                                {/* grid and list view */}


                                <ProductGrid products={data.products} />



                                {/* <ProductList /> */}
                                {/* grid and list view */}
                                {/* pagination */}

                                {/* Pagination */}
                                {data.products.length > 6 && (
                                    <ProductsPagination
                                        pagination={data.pagination}
                                        searchParams={params}
                                    />
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