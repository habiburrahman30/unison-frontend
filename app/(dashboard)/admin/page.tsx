"use client";

import { useEffect, useState } from "react";

interface Stats {
    products: number;
    categories: number;
    brands: number;
    news: number;
    newsCategories: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const response = await fetch("/api/dashboard/stats");
                const result = await response.json();

                if (result.success) {
                    setStats(result.data);
                }
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchStats();
    }, []);


    return (

        <div className="user-card">
            <h4 className="user-card-title">Dashboard Summary</h4>
            {isLoading ? <div>Loading statistics...</div> :
                <div className="row">
                    <div className="col-md-6 col-lg-4">
                        <div className="dashboard-widget color-1">
                            <div className="dashboard-widget-info">
                                <h1>{stats?.products || 0}</h1>
                                <span>Products</span>
                            </div>
                            <div className="dashboard-widget-icon">
                                <i className="fal fa-box" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <div className="dashboard-widget color-2">
                            <div className="dashboard-widget-info">
                                <h1>{stats?.categories || 0}</h1>
                                <span>Categories</span>
                            </div>
                            <div className="dashboard-widget-icon">
                                <i className="fal fa-tags" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <div className="dashboard-widget color-3">
                            <div className="dashboard-widget-info">
                                <h1>{stats?.brands || 0}</h1>
                                <span>Brands</span>
                            </div>
                            <div className="dashboard-widget-icon">
                                <i className="fal fa-copyright" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <div className="dashboard-widget color-2">
                            <div className="dashboard-widget-info">
                                <h1>{stats?.news || 0}</h1>
                                <span>News</span>
                            </div>
                            <div className="dashboard-widget-icon">
                                <i className="fal fa-newspaper" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <div className="dashboard-widget color-1">
                            <div className="dashboard-widget-info">
                                <h1>{stats?.newsCategories || 0}</h1>
                                <span>News Categories</span>
                            </div>
                            <div className="dashboard-widget-icon">
                                <i className="fal fa-folder" />
                            </div>
                        </div>
                    </div>

                </div>
            }
        </div>


    );
}