"use client";

import { ProductWithRelations } from "@/lib/api/products";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Props {
    products: ProductWithRelations[];
}

interface Category {
    id: number;
    name: string;
    description: string | null;
    image: string | null;
    _count?: {
        products: number;
    };
}
interface Brand {
    id: number;
    name: string;
    description: string | null;
    logo: string | null;
    _count?: {
        products: number;
    };
}

export default function ProductsSidebar({ products }: Props) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);




    useEffect(() => {
        // Fetch categories
        fetch("/api/categories")
            .then((res) => res.json())
            .then((data) => setCategories(data.data || []));

        // Fetch brands
        fetch("/api/brands")
            .then((res) => res.json())
            .then((data) => setBrands(data.data.brands || []));
    }, []);

    return (
        <div className="shop-sidebar">
            <div className="shop-widget">
                <div className="shop-search-form">
                    <h4 className="shop-widget-title">Search</h4>
                    <form action="#" >
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
                        <a href='/products' >
                            All Categories<span>({categories.length})</span>
                        </a>
                    </li>
                    {Array.isArray(categories) && categories.map((data) => {
                        return (
                            <li key={data.id}>
                                <Link
                                    className=""
                                    href={`/products?category_id=${data.id}`}
                                >
                                    {data.name}
                                    {data._count?.products
                                        ? <span> ({data._count.products})</span>
                                        : null}
                                </Link>
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

                            />
                            <label className="form-check-label" htmlFor="brand2">
                                All Brands<span>({brands.length})</span>
                            </label>
                        </div>
                    </li>

                    {Array.isArray(brands) && brands.map((data) => {
                        return (
                            <li key={data.id}>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`brand-${data.id}`}
                                    />
                                    <label className="form-check-label" htmlFor={`brand-${data.id}`}>
                                        {data.name}  {data._count?.products
                                            ? <span> ({data._count.products})</span>
                                            : null}
                                    </label>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    );
}