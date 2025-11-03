
"use client"
import news from "@/app/data/news.ts";
import newsCategories from "@/app/data/news-categories";
import { useEffect, useState } from "react";



export default function NewsAndEventPage() {

    const [selectedTags, setSelectedTags] = useState<string[]>([]);


    // Sort news by date descending (newest first)
    const sortedNews = news.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    // Optional: show only the 5 most recent news
    const recentNews = sortedNews.slice(0, 3);

    //**** For Pagination ****/
    const NEWS_PER_PAGE = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(news.length / NEWS_PER_PAGE);

    const paginatedNees = news.slice(
        (currentPage - 1) * NEWS_PER_PAGE,
        currentPage * NEWS_PER_PAGE
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


    // Filter by Multiple Tags
    const filteredNews =
        selectedTags.length === 0
            ? paginatedNees
            : paginatedNees.filter((item) =>
                item.tags.some((tag) => selectedTags.includes(tag))
            );

    // Count tag usage
    const tagCount: Record<string, number> = {};

    news.forEach((item) => {
        if (Array.isArray(item.tags)) {
            item.tags.forEach((tag) => {
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
            prev.includes(tag)
                ? prev.filter((t) => t !== tag) // remove tag
                : [...prev, tag] // add tag
        );
    };



    useEffect(() => {
        setCurrentPage(1);
    }, [selectedTags]);

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
                            <h4 className="breadcrumb-title">Our News</h4>
                            <ul className="breadcrumb-menu">
                                <li>
                                    <a href={"/"}>
                                        <i className="far fa-home" /> Home
                                    </a>
                                </li>
                                <li className="active">Our News</li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* breadcrumb end */}
                {/* blog area */}
                <div className="blog-area py-100">
                    <div className="container">
                        <div className="row g-4">
                            <div className="col-lg-8 col-12">
                                <div className="row g-4">
                                    {filteredNews.map((item, index) => (
                                        <div className="col-md-6">
                                            <div className="blog-item wow fadeInUp" data-wow-delay=".25s">
                                                <div className="blog-item-img">
                                                    <img src={item.image} alt={item.title} />
                                                    <span className="blog-date">
                                                        <i className="far fa-calendar-alt" /> {item.date}
                                                    </span>
                                                </div>
                                                <div className="blog-item-info">
                                                    <div className="blog-item-meta">
                                                        <ul>
                                                            <li>
                                                                <a href="#">
                                                                    <i className="far fa-user-circle" /> By {item.author}
                                                                </a>
                                                            </li>

                                                        </ul>
                                                    </div>
                                                    <h4 className="blog-title">
                                                        <a href={`/news-event/${item.slug}`}>
                                                            {item.title}
                                                        </a>
                                                    </h4>
                                                    <p>
                                                        {item.short_description}
                                                    </p>
                                                    <a className="theme-btn" href={`/news-event/${item.slug}`}>
                                                        Read More
                                                        <i className="fas fa-arrow-right" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                    ))}

                                </div>
                                {/* pagination */}

                                {news.length > 0 && (
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
                            <div className="col-lg-4 col-12">
                                <aside className="sidebar">
                                    {/* search*/}

                                    {/* category */}
                                    <div className="widget category">
                                        <h5 className="widget-title">Category</h5>
                                        <div className="category-list">

                                            {newsCategories.map((cat, index) => {
                                                // Count news in this category
                                                const count = news.filter(n => n.category_id === cat.id).length;
                                                return (
                                                    <a href="#">
                                                        <i className="far fa-arrow-right" />
                                                        {cat.name} {count > 0 ? <span>({count})</span> : ''}
                                                    </a>
                                                )
                                            })}

                                        </div>
                                    </div>
                                    {/* recent post */}
                                    <div className="widget recent-post">
                                        <h5 className="widget-title">Recent Post</h5>
                                        {recentNews.map((item) => (

                                            <div className="recent-post-item">
                                                <div className="recent-post-img">
                                                    <img src={item.image} alt={item.title} />
                                                </div>
                                                <div className="recent-post-bio">
                                                    <h6>
                                                        <a href={`/news-event/${item.slug}`}>{item.title}</a>
                                                    </h6>
                                                    <span>
                                                        <i className="far fa-clock" />
                                                        {item.date}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {/* social share */}
                                    <div className="widget social-share">
                                        <h5 className="widget-title">Follow Us</h5>
                                        <div className="social-share-link">
                                            <a href="https://web.whatsapp.com/" target="_blank"
                                                rel="noopener noreferrer">
                                                <i className="fab fa-whatsapp" />
                                            </a>
                                            <a href="https://www.facebook.com/share/1D2Yr22Dkq/" target="_blank"
                                                rel="noopener noreferrer">
                                                <i className="fab fa-facebook-f" />
                                            </a>
                                            <a href="https://www.linkedin.com/company/unisonbizbd/" target="_blank"
                                                rel="noopener noreferrer">
                                                <i className="fab fa-linkedin-in" />
                                            </a>
                                            <a href="https://www.youtube.com/" target="_blank"
                                                rel="noopener noreferrer">
                                                <i className="fab fa-youtube" />
                                            </a>
                                        </div>
                                    </div>
                                    {/* Recent Post */}
                                    {popularTags.length > 0 && (
                                        < div className="widget sidebar-tag">
                                            <h5 className="widget-title">Popular Tags</h5>
                                            <div className="tag-list">
                                                {popularTags.map((tag) => (
                                                    <a href="#" key={tag}
                                                        // className={selectedTag === tag ? "active" : ""}
                                                        // className="active"
                                                        style={selectedTags.includes(tag) ? { background: "#03a297", color: "white" } : {}}
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
                            </div>
                        </div>
                    </div>
                </div>
                {/* blog area end */}
            </main>


        </>
    );
}
