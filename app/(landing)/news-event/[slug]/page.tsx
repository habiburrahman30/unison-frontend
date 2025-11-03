"use client"
import news from "@/app/data/news.ts";
import newsCategories from "@/app/data/news-categories";

export default async function NewsAndEventSinglePage({ params }: { params: Promise<{ slug: string }> }) {

    const { slug } = await params; // ✅ Must await
    const newsData = news.find((item) => item.slug === slug);


    // Sort news by date descending (newest first)
    const sortedNews = news.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    // Optional: show only the 5 most recent news
    const recentNews = sortedNews.slice(0, 3);





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
                            <h4 className="breadcrumb-title">Blog Single Sidebar</h4>
                            <ul className="breadcrumb-menu">
                                <li>
                                    <a href={"/"}>
                                        <i className="far fa-home" /> Home
                                    </a>
                                </li>
                                <li className="active">Blog Single Sidebar</li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* breadcrumb end */}
                {/* blog area */}
                <div className="blog-area py-90">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="blog-single-wrap">
                                    <div className="blog-single-content">
                                        <div className="blog-thumb-img">
                                            <img src={newsData?.image} alt={newsData?.title} />
                                        </div>
                                        <div className="blog-info">
                                            <div className="blog-meta">
                                                <div className="blog-meta-left">
                                                    <ul>
                                                        <li>
                                                            <i className="far fa-user" />
                                                            <a href="#">{newsData?.author}</a>
                                                        </li>
                                                        {/* <li>
                                                            <i className="far fa-comments" />
                                                            3.2k Comments
                                                        </li>
                                                        <li>
                                                            <i className="far fa-thumbs-up" />
                                                            1.4k Like
                                                        </li> */}
                                                    </ul>
                                                </div>
                                                {/* <div className="blog-meta-right">
                                                    <a href="#" className="share-link">
                                                        <i className="far fa-share-alt" />
                                                        Share
                                                    </a>
                                                </div> */}
                                            </div>
                                            <div className="blog-details">
                                                <h3 className="blog-details-title mb-20">
                                                    {newsData?.title}
                                                </h3>
                                                <p className="mb-10">
                                                    {newsData?.short_description}
                                                </p>
                                                <p className="mb-10">
                                                    {newsData?.short_description}
                                                </p>
                                                {/* <blockquote className="blockqoute">
                                                    It is a long established fact that a reader will be
                                                    distracted by the readable content of a page when looking at
                                                    its layout. The point of using Lorem Ipsum is that it has a
                                                    more-or-less normal distribution.
                                                    <h6 className="blockqoute-author">Mark Crawford</h6>
                                                    <i className="far fa-quote-right" />
                                                </blockquote> */}


                                                <hr />
                                                {(newsData?.tags ?? []).length > 0 && (
                                                    <div className="blog-details-tags pb-20">
                                                        <h5>Tags : </h5>
                                                        <ul>
                                                            {newsData?.tags.map((tag) => (
                                                                <li>
                                                                    <a href={tag}>{tag}</a>
                                                                </li>
                                                            ))}

                                                        </ul>
                                                    </div>
                                                )
                                                }

                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <aside className="sidebar">
                                    {/* search*/}
                                    {/* <div className="widget search">
                                        <h5 className="widget-title">Search</h5>
                                        <form className="search-form">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Search Here..."
                                            />
                                            <button type="submit">
                                                <i className="far fa-search" />
                                            </button>
                                        </form>
                                    </div> */}
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