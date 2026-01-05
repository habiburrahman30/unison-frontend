"use client";

import { Product } from "@/types/product";
import { ProductWithRelations } from "@/lib/api/products";
import Link from "next/link";
import EmptyProductsCard from "@/components/EmptyProductsCard";
interface Props {
    products: ProductWithRelations[];
}

export default function ProductGrid({ products }: Props) {

    return (
        <div className="shop-item-wrap item-4">
            <div className="row g-4">

                {products.map((product) => (
                    <div className="col-md-6 col-lg-4" key={product.id}>
                        <div className="product-item">
                            <div className="product-img">

                                {product.stock === 0 && <span className="type oos">Out Of Stock</span>}
                                {product.stock > 0 && product.is_trending && <span className="type">Trending</span>}

                                <Link href={`/products/${product.slug}`}>
                                    <img
                                        src={
                                            product.images?.length
                                                ? product.images[0]
                                                : "/assets/img/no-image-found.jpg"
                                        }
                                        alt={product.name}
                                    />
                                </Link>

                            </div>
                            <div className="product-content">
                                <h3 className="product-title">
                                    <a href={`/products/${product.slug}`}>{product.name} </a>
                                </h3>
                                <p className="price">
                                    ${Number(product.price).toFixed(2)}{" "}
                                    {product.old_price && <del>${Number(product.old_price).toFixed(2)}</del>}
                                </p>
                                {/* <div className="product-rate">
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="far fa-star" />
                                </div> */}

                            </div>
                        </div>
                    </div>
                ))}

                {products.length === 0 && (
                    <EmptyProductsCard />
                )}
                {/* <div className="col-md-6 col-lg-4">
                    <div className="product-item">
                        <div className="product-img">
                            <span className="type hot">Hot</span>
                            <a href="shop-single.html">
                                <img src="/assets/img/product/02.png" alt="" />
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
                <div className="col-md-6 col-lg-4">
                    <div className="product-item">
                        <div className="product-img">
                            <span className="type oos">Out Of Stock</span>
                            <a href="shop-single.html">
                                <img src="/assets/img/product/03.png" alt="" />
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
                <div className="col-md-6 col-lg-4">
                    <div className="product-item">
                        <div className="product-img">
                            <a href="shop-single.html">
                                <img src="/assets/img/product/04.png" alt="" />
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
                <div className="col-md-6 col-lg-4">
                    <div className="product-item">
                        <div className="product-img">
                            <span className="type discount">10% Off</span>
                            <a href="shop-single.html">
                                <img src="/assets/img/product/05.png" alt="" />
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
                <div className="col-md-6 col-lg-4">
                    <div className="product-item">
                        <div className="product-img">
                            <a href="shop-single.html">
                                <img src="/assets/img/product/06.png" alt="" />
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
                <div className="col-md-6 col-lg-4">
                    <div className="product-item">
                        <div className="product-img">
                            <span className="type new">New</span>
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
                <div className="col-md-6 col-lg-4">
                    <div className="product-item">
                        <div className="product-img">
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
                <div className="col-md-6 col-lg-4">
                    <div className="product-item">
                        <div className="product-img">
                            <a href="shop-single.html">
                                <img src="/assets/img/product/09.png" alt="" />
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
                <div className="col-md-6 col-lg-4">
                    <div className="product-item">
                        <div className="product-img">
                            <a href="shop-single.html">
                                <img src="/assets/img/product/10.png" alt="" />
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
                <div className="col-md-6 col-lg-4">
                    <div className="product-item">
                        <div className="product-img">
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
                <div className="col-md-6 col-lg-4">
                    <div className="product-item">
                        <div className="product-img">
                            <span className="type hot">Hot</span>
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
                <div className="col-md-6 col-lg-4">
                    <div className="product-item">
                        <div className="product-img">
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
                <div className="col-md-6 col-lg-4">
                    <div className="product-item">
                        <div className="product-img">
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
                <div className="col-md-6 col-lg-4">
                    <div className="product-item">
                        <div className="product-img">
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
                <div className="col-md-6 col-lg-4">
                    <div className="product-item">
                        <div className="product-img">
                            <a href="shop-single.html">
                                <img src="/assets/img/product/16.png" alt="" />
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
                <div className="col-md-6 col-lg-4">
                    <div className="product-item">
                        <div className="product-img">
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
                <div className="col-md-6 col-lg-4">
                    <div className="product-item">
                        <div className="product-img">
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
                <div className="col-md-6 col-lg-4">
                    <div className="product-item">
                        <div className="product-img">
                            <span className="type new">New</span>
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
                <div className="col-md-6 col-lg-4">
                    <div className="product-item">
                        <div className="product-img">
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
                <div className="col-md-6 col-lg-4">
                    <div className="product-item">
                        <div className="product-img">
                            <a href="shop-single.html">
                                <img src="/assets/img/product/21.png" alt="" />
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
                </div> */}
            </div>
        </div>

    );
}