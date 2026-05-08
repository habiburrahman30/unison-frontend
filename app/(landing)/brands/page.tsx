"use client";

import { Brand } from "@/lib/api/brands";
import { useEffect, useState } from "react";

export default function BrandsPage() {
    const [brands, setBrands] = useState<Brand[]>([]);
    useEffect(() => {

        // Fetch Brands
        fetch("/api/brands?is_active=true&limit=100")
            .then((res) => res.json())
            .then((data) => setBrands(data.data.brands || []));


    }, []);
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
                            <h4 className="breadcrumb-title">Brands</h4>
                            <ul className="breadcrumb-menu">
                                <li>
                                    <a href={"/"}>
                                        <i className="far fa-home" /> Home
                                    </a>
                                </li>
                                <li className="active">Brands</li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* breadcrumb end */}
                {/* brand area */}
                {brands.length > 0 && (
                    <div className="brand-area2 py-90">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 mx-auto">
                                    <div className="site-heading text-center">
                                        <span className="site-title-tagline">Brands</span>
                                        <h2 className="site-title">
                                            Our Channel <span>Partner</span>
                                        </h2>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-4">
                                {brands.map((item) => (

                                    <div className="col-md-6 col-lg-2">
                                        <div className="brand-item">
                                            <a href="#" key={item.id}>
                                                <img
                                                    src={item.logo || "/assets/img/no-image-found.jpg"}
                                                    alt={item.name}
                                                />
                                            </a>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                )}

                {/* brand area end */}
            </main>


        </>
    );
}