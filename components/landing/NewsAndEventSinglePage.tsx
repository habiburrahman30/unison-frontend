"use client";

import { useState } from "react";

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
    category?: { id: number; name: string };
}

interface RecentNews {
    id: number;
    title: string;
    slug: string;
    image: string | null;
    from_date: Date;
}

interface Category {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
    description: string | null;
    _count?: { news: number };
}

interface Props {
    newsData: News;
    recentNews: RecentNews[];
    categories: Category[];
}



export default function NewsAndEventSinglePage({ newsData, recentNews, categories }: Props) {
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const tags = newsData.tags as string[];

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
                        <h4 className="breadcrumb-title">{newsData.title}</h4>
                        <ul className="breadcrumb-menu">
                            <li>
                                <a href="/">
                                    <i className="far fa-home" /> Home
                                </a>
                            </li>
                            <li>
                                <a href="/news-event">Our News</a>
                            </li>
                            <li className="active">{newsData.title}</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Blog Area */}
            <div className="blog-area py-90">
                <div className="container">
                    <div className="row">

                        {/* Main Content */}
                        <div className="col-lg-8">
                            <div className="blog-single-wrap">
                                <div className="blog-single-content">

                                    {/* Image */}
                                    {newsData.image && (
                                        <div className="blog-thumb-img">
                                            <img
                                                src={newsData.image}
                                                alt={newsData.title}
                                                style={{ width: "100%", objectFit: "cover" }}
                                            />
                                        </div>
                                    )}

                                    <div className="blog-info">
                                        {/* Meta */}
                                        <div className="blog-meta">
                                            <div className="blog-meta-left">
                                                <ul>
                                                    <li>
                                                        <i className="far fa-calendar-alt" />
                                                        {formatDate(newsData.from_date)}
                                                        {" — "}
                                                        {formatDate(newsData.to_date)}
                                                    </li>
                                                    {newsData.category && (
                                                        <li>
                                                            <i className="far fa-tags" />
                                                            <a href="#">{newsData.category.name}</a>
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="blog-details">
                                            <h3 className="blog-details-title mb-20">
                                                {newsData.title}
                                            </h3>
                                            <p className="mb-10">{newsData.description}</p>

                                            <hr />

                                            {/* Tags */}
                                            {tags?.length > 0 && (
                                                <div className="blog-details-tags pb-20">
                                                    <h5>Tags:</h5>
                                                    <ul>
                                                        {tags.map((tag) => (
                                                            <li key={tag}>
                                                                <a href={`/news-event?tag=${tag}`}>{tag}</a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="col-lg-4">
                            <aside className="sidebar">

                                {/* Categories */}
                                <div className="widget category">
                                    <h5 className="widget-title">Category</h5>
                                    <div className="category-list">

                                        {/* All Categories */}
                                        <a
                                            href="/news-event"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setSelectedCategory(null);
                                                window.location.href = "/news-event";
                                            }}
                                            style={
                                                selectedCategory === null
                                                    ? { color: "#03a297", fontWeight: "600" }
                                                    : {}
                                            }
                                        >
                                            <i className="far fa-arrow-right" />
                                            All Categories
                                            <span> ({categories.reduce((acc, cat) => acc + (cat._count?.news || 0), 0)})</span>
                                        </a>

                                        {/* Individual Categories */}
                                        {categories.map((cat) => (

                                            <a key={cat.id}
                                                href={`/news-event?category=${cat.id}`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setSelectedCategory(cat.id);
                                                    window.location.href = `/news-event?category=${cat.id}`;
                                                }}
                                                style={
                                                    selectedCategory === cat.id
                                                        ? { color: "#03a297", fontWeight: "600" }
                                                        : {}
                                                }
                                            >
                                                <i className="far fa-arrow-right" />
                                                {cat.name}
                                                {cat._count?.news ? <span> ({cat._count.news})</span> : ""}
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
                                                    <i className="far fa-clock" />{" "}
                                                    {formatDate(item.from_date)}
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

                            </aside>
                        </div>
                    </div>
                </div>
            </div >
        </main >
    );
}