"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface Stats {
    products: number;
    categories: number;
    brands: number;
    news: number;
    newsCategories: number;
    testimonials: number;
}

export default function AdminDashboard() {
    const { data: session } = useSession();

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

    const today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const firstName = (session?.user?.name || "Admin").split(" ")[0];

    const cards = [
        { label: "Products", value: stats?.products, icon: "fa-box", tint: "bg-emerald-50 text-emerald-500", href: "/admin/products", sub: "In catalog" },
        { label: "Categories", value: stats?.categories, icon: "fa-tags", tint: "bg-sky-50 text-sky-500", href: "/admin/categories", sub: "Product groups" },
        { label: "Brands", value: stats?.brands, icon: "fa-copyright", tint: "bg-amber-50 text-amber-500", href: "/admin/brands", sub: "Partner brands" },
        { label: "News", value: stats?.news, icon: "fa-newspaper", tint: "bg-rose-50 text-rose-500", href: "/admin/news", sub: "Published articles" },
        { label: "News Categories", value: stats?.newsCategories, icon: "fa-folder", tint: "bg-violet-50 text-violet-500", href: "/admin/news-categories", sub: "Article groups" },
        { label: "Customers", value: stats?.testimonials, icon: "fa-users", tint: "bg-brand-light text-brand-dark", href: "/admin/testimonials", sub: "Testimonials" },
    ];

    const quickLinks = [
        { label: "Add Product", href: "/admin/products/create", icon: "fa-box", tint: "bg-emerald-50 text-emerald-500" },
        { label: "Add Brand", href: "/admin/brands/create", icon: "fa-copyright", tint: "bg-amber-50 text-amber-500" },
        { label: "Write News", href: "/admin/news/create", icon: "fa-newspaper", tint: "bg-rose-50 text-rose-500" },
        { label: "Add Customer", href: "/admin/testimonials/create", icon: "fa-users", tint: "bg-brand-light text-brand-dark" },
        { label: "Add Team Member", href: "/admin/teams/create", icon: "fa-user-group", tint: "bg-sky-50 text-sky-500" },
        { label: "Upload to Gallery", href: "/admin/gallery/create", icon: "fa-images", tint: "bg-violet-50 text-violet-500" },
    ];

    return (
        <div className="flex flex-col gap-8">

            {/* Welcome header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                        Welcome back, {firstName}!
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">{today}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-brand/20 bg-brand-light px-3 py-1.5 text-sm font-medium text-brand-dark">
                        <i className="far fa-user-shield" /> Admin
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-600">
                        <i className="far fa-circle-check" /> All systems operational
                    </span>
                </div>
            </div>

            {/* KPI cards */}
            <section>
                {isLoading ? (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="h-40 animate-pulse rounded-2xl border border-slate-200 bg-white" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                        {cards.map((card) => (
                            <Link
                                key={card.label}
                                href={card.href}
                                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                            >
                                <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl text-lg ${card.tint}`}>
                                    <i className={`fal far ${card.icon}`} />
                                </div>
                                <p className="text-sm font-medium text-slate-500">{card.label}</p>
                                <p className="mt-1 text-3xl font-bold text-slate-900">{card.value ?? 0}</p>
                                <p className="mt-2 text-xs text-slate-400">{card.sub}</p>
                            </Link>
                        ))}
                    </div>
                )}
            </section>

            {/* Quick actions section */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-5">
                    <h2 className="text-lg font-semibold text-slate-900">Quick Actions</h2>
                    <p className="mt-1 text-sm text-slate-500">Jump straight into creating content.</p>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {quickLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50/60 p-4 transition-colors hover:border-brand/30 hover:bg-brand-soft"
                        >
                            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg ${link.tint}`}>
                                <i className={`fal far ${link.icon}`} />
                            </div>
                            <span className="flex-1 text-sm font-medium text-slate-700 group-hover:text-brand-dark">
                                {link.label}
                            </span>
                            <i className="far fa-arrow-right text-slate-300 transition-colors group-hover:text-brand" />
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
