"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

interface News {
    id: number;
    title: string;
    slug: string;
    description: string;
    image: string | null;
    category_id: number;
    published: boolean;
    from_date: Date;
    to_date: Date;
    tags: any;
    created_at: Date;
}

interface Category {
    id: number;
    name: string;
    _count?: { news: number };
}

interface Props {
    newsData: {
        data: News[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    };
    categories: Category[];
}

export default function NewsAndEventPage({ newsData, categories }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

    const { data: news, pagination } = newsData;

    // Recent posts — top 3 from current data
    const recentNews = [...news]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 3);

    // Update filteredNews to also filter by category
    const filteredNews = news.filter((item) => {
        const tags = item.tags as string[];
        const matchesTag = selectedTags.length === 0 || tags?.some((tag) => selectedTags.includes(tag));
        const matchesCategory = selectedCategory === null || item.category_id === selectedCategory;
        return matchesTag && matchesCategory;
    });

    // Count tag usage across current page
    const tagCount: Record<string, number> = {};
    news.forEach((item) => {
        const tags = item.tags as string[];
        if (Array.isArray(tags)) {
            tags.forEach((tag) => {
                tagCount[tag] = (tagCount[tag] || 0) + 1;
            });
        }
    });

    const popularTags = Object.entries(tagCount)
        .sort((a, b) => b[1] - a[1])
        .map(([tag]) => tag)
        .slice(0, 10);

    const toggleTag = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const handlePageChange = (page: number) => {
        setSelectedTags([]);
        router.push(`?page=${page}`);
    };

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const { page: currentPage, totalPages } = pagination;
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

    const formatDate = (date: Date) =>
        new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });

    return (
        <main className="main">
            {/* Breadcrumb */}
            <div className="site-breadcrumb">
                <div
                    className="site-breadcrumb-bg"
                    style={{ background: "url(/assets/img/breadcrumb/01.jpg)" }}
                />
                <div className="container">
                    <div className="site-breadcrumb-wrap">
                        <h4 className="breadcrumb-title">Our News</h4>
                        <ul className="breadcrumb-menu">
                            <li>
                                <a href="/">
                                    <i className="far fa-home" /> Home
                                </a>
                            </li>
                            <li className="active">Our News</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Blog Area */}
            <div className="blog-area py-100">
                <div className="container">
                    <div className="row g-4">

                        {/* News Grid */}
                        <div className="col-lg-8 col-12">
                            <div className="row g-4">
                                {filteredNews.length === 0 ? (
                                    <div className="col-12 text-center py-5">
                                        <p className="text-muted">No news found.</p>
                                    </div>
                                ) : (
                                    filteredNews.map((item) => (
                                        <div className="col-md-6" key={item.id}>
                                            <div className="blog-item wow fadeInUp" data-wow-delay=".25s">
                                                <div className="blog-item-img">
                                                    <img
                                                        src={item.image || "/assets/img/news/placeholder.jpg"}
                                                        alt={item.title}
                                                    />
                                                    <span className="blog-date">
                                                        <i className="far fa-calendar-alt" />{" "}
                                                        {formatDate(item.from_date)}
                                                    </span>
                                                </div>
                                                <div className="blog-item-info">
                                                    <h4 className="blog-title">
                                                        <a href={`/news-event/${item.slug}`}>{item.title}</a>
                                                    </h4>
                                                    <p>
                                                        {item.description?.slice(0, 100)}
                                                        {item.description?.length > 100 ? "..." : ""}
                                                    </p>
                                                    <a className="theme-btn" href={`/news-event/${item.slug}`}>
                                                        Read More <i className="fas fa-arrow-right" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Pagination */}
                            {pagination.totalPages > 1 && (
                                <div className="pagination-area mt-60">
                                    <ul className="pagination">
                                        <li className={`page-item ${pagination.page <= 1 ? "disabled" : ""}`}>
                                            <a

                                                className="page-link"
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (pagination.page > 1) handlePageChange(pagination.page - 1);
                                                }}
                                            >
                                                <i className="far fa-arrow-left" />
                                            </a>
                                        </li>

                                        {getPageNumbers().map((num, i) =>
                                            num === "..." ? (
                                                <li key={i} className="page-item">
                                                    <span className="page-link">...</span>
                                                </li>
                                            ) : (
                                                <li
                                                    key={i}
                                                    className={`page-item ${pagination.page === num ? "active" : ""}`}
                                                >

                                                    <a className="page-link"
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handlePageChange(Number(num));
                                                        }}
                                                    >
                                                        {num}
                                                    </a>
                                                </li>
                                            )
                                        )}

                                        <li className={`page-item ${pagination.page >= pagination.totalPages ? "disabled" : ""}`}>

                                            <a className="page-link"
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (pagination.page < pagination.totalPages)
                                                        handlePageChange(pagination.page + 1);
                                                }}
                                            >
                                                <i className="far fa-arrow-right" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="col-lg-4 col-12">
                            <aside className="sidebar">

                                {/* Categories */}
                                <div className="widget category">
                                    <h5 className="widget-title">Category</h5>
                                    <div className="category-list">

                                        {/* All Categories option */}
                                        <a
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setSelectedCategory(null);
                                            }}
                                            style={
                                                selectedCategory === null
                                                    ? { color: "#03a297", fontWeight: "600" }
                                                    : {}
                                            }
                                        >
                                            <i className="far fa-arrow-right" />
                                            All Categories
                                            <span> ({news.length})</span>
                                        </a>

                                        {/* Max 10 categories */}
                                        {categories.slice(0, 10).map((cat) => (

                                            <a key={cat.id}
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setSelectedCategory(
                                                        selectedCategory === cat.id ? null : cat.id
                                                    );
                                                    setSelectedTags([]); // reset tags when category changes
                                                }}
                                                style={
                                                    selectedCategory === cat.id
                                                        ? { color: "#03a297", fontWeight: "600" }
                                                        : {}
                                                }
                                            >
                                                <i className={`far ${selectedCategory === cat.id ? "fa-arrow-right" : "fa-arrow-right"}`} />
                                                {cat.name}
                                                {cat._count?.news ? (
                                                    <span> ({cat._count.news})</span>
                                                ) : ""}
                                            </a>
                                        ))}
                                    </div>
                                </div>

                                {/* Recent Posts */}
                                <div className="widget recent-post">
                                    <h5 className="widget-title">Recent Post</h5>
                                    {recentNews.map((item) => (
                                        <div key={item.id} className="recent-post-item">
                                            <div className="recent-post-img">
                                                <img
                                                    src={item.image || "/assets/img/news/placeholder.jpg"}
                                                    alt={item.title}
                                                />
                                            </div>
                                            <div className="recent-post-bio">
                                                <h6>
                                                    <a href={`/news-event/${item.slug}`}>{item.title}</a>
                                                </h6>
                                                <span>
                                                    <i className="far fa-clock" /> {formatDate(item.from_date)}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Follow Us */}
                                <div className="widget social-share">
                                    <h5 className="widget-title">Follow Us</h5>
                                    <div className="social-share-link">
                                        <a href="https://web.whatsapp.com/" target="_blank" rel="noopener noreferrer">
                                            <i className="fab fa-whatsapp" />
                                        </a>
                                        <a href="https://www.facebook.com/share/1D2Yr22Dkq/" target="_blank" rel="noopener noreferrer">
                                            <i className="fab fa-facebook-f" />
                                        </a>
                                        <a href="https://www.linkedin.com/company/unisonbizbd/" target="_blank" rel="noopener noreferrer">
                                            <i className="fab fa-linkedin-in" />
                                        </a>
                                        <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
                                            <i className="fab fa-youtube" />
                                        </a>
                                    </div>
                                </div>

                                {/* Popular Tags */}
                                {popularTags.length > 0 && (
                                    <div className="widget sidebar-tag">
                                        <h5 className="widget-title">Popular Tags</h5>
                                        <div className="tag-list">
                                            {popularTags.map((tag) => (
                                                <a
                                                    href="#"
                                                    key={tag}
                                                    style={
                                                        selectedTags.includes(tag)
                                                            ? { background: "#03a297", color: "white" }
                                                            : {}
                                                    }
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        toggleTag(tag);
                                                    }}
                                                >
                                                    {tag}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </aside>
                        </div >
                    </div >
                </div >
            </div >
        </main >
    );
}