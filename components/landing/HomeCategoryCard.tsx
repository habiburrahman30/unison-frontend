"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Category {
    id: number;
    name: string;
    description: string | null;
    image: string | null;
    _count?: {
        products: number;
    };
}

// Declare jQuery and $ for TypeScript
declare global {
    interface Window {
        $: any;
        jQuery: any;
    }
}

export default function HomeCategoryCard() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchCategories() {
            try {
                setIsLoading(true);
                const response = await fetch("/api/categories?limit=100");

                if (!response.ok) {
                    throw new Error("Failed to fetch categories");
                }

                const result = await response.json();

                if (result.success && Array.isArray(result.data)) {
                    setCategories(result.data);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred");
            } finally {
                setIsLoading(false);
            }
        }

        fetchCategories();
    }, []);

    // Initialize Owl Carousel after categories are loaded
    useEffect(() => {
        if (!isLoading && categories.length > 0) {
            // Destroy existing carousel if it exists
            if (window.$ && window.$('.category-slider').hasClass('owl-loaded')) {
                window.$('.category-slider').owlCarousel('destroy');
            }

            // Small delay to ensure DOM is ready
            setTimeout(() => {
                if (window.$) {
                    window.$('.category-slider').owlCarousel({
                        loop: true,
                        margin: 10,
                        nav: false,
                        dots: true,
                        autoplay: true,
                        autoplayTimeout: 3000,
                        responsive: {
                            0: {
                                items: 1
                            },
                            600: {
                                items: 2
                            },
                            1000: {
                                items: 4
                            }
                        }
                    });
                }
            }, 100);
        }
    }, [isLoading, categories]);

    if (isLoading) {
        return (
            <div className="category-area pt-80 pb-100">
                <div className="container">
                    <div className="text-center py-5">Loading categories...</div>
                </div>
            </div>
        );
    }


    if (categories.length === 0) {
        return null;
    }
    return (
        <div className="category-area pt-80 pb-100">
            <div className="container">
                <div className="row">
                    <div className="col-12 wow fadeInDown" data-wow-delay=".25s">
                        <div className="site-heading-inline">
                            <h2 className="site-title">Top Category</h2>
                            <a href={"/category"}>
                                View More <i className="fas fa-angle-double-right" />
                            </a>
                        </div>
                    </div>
                </div>
                <div
                    className="category-slider owl-carousel owl-theme wow fadeInUp"
                    data-wow-delay=".25s"
                >
                    {categories.map((data) => (

                        <div className="category-item" key={data.id}>
                            <Link href={`/products?category_id=${data.id}`}>
                                <div className="category-info">
                                    <div className="icon">

                                        <img src={data.image && data.image !== "" ? data.image : "/assets/img/no-image-found.jpg"}
                                            alt={data.name} />

                                    </div>
                                    <div className="content">
                                        <h4>{data.name}</h4>
                                        <p>{data._count?.products || 0} Items</p>
                                    </div>
                                </div>
                            </Link>
                        </div>


                    ))}

                </div>
            </div>
        </div>
    );
}