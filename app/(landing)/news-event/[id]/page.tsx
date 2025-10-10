

export default function NewsAndEventSinglePage() {
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
                                            <img src="/assets/img/blog/single.jpg" alt="thumb" />
                                        </div>
                                        <div className="blog-info">
                                            <div className="blog-meta">
                                                <div className="blog-meta-left">
                                                    <ul>
                                                        <li>
                                                            <i className="far fa-user" />
                                                            <a href="#">Jean R Gunter</a>
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
                                                    It is a long established fact that a reader
                                                </h3>
                                                <p className="mb-10">
                                                    Sed ut perspiciatis unde omnis iste natus error sit
                                                    voluptatem accusantium doloremque laudantium, totam rem
                                                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                                                    quasi architecto beatae vitae dicta sunt explicabo. Nemo
                                                    enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                                                    aut fugit, sed quia consequuntur magni dolores eos qui
                                                    ratione voluptatem sequi nesciunt. Neque porro quisquam est,
                                                    qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
                                                    velit, sed quia non numquam eius modi tempora incidunt ut
                                                    labore et dolore magnam aliquam quaerat voluptatem.
                                                </p>
                                                <p className="mb-10">
                                                    But I must explain to you how all this mistaken idea of
                                                    denouncing pleasure and praising pain was born and I will
                                                    give you a complete account of the system, and expound the
                                                    actual teachings of the great explorer of the truth, the
                                                    master-builder of human happiness. No one rejects, dislikes,
                                                    or avoids pleasure itself, because it is pleasure, but
                                                    because those who do not know how to pursue pleasure
                                                    rationally encounter consequences that are extremely
                                                    painful.
                                                </p>
                                                <blockquote className="blockqoute">
                                                    It is a long established fact that a reader will be
                                                    distracted by the readable content of a page when looking at
                                                    its layout. The point of using Lorem Ipsum is that it has a
                                                    more-or-less normal distribution.
                                                    <h6 className="blockqoute-author">Mark Crawford</h6>
                                                    <i className="far fa-quote-right" />
                                                </blockquote>
                                                <p className="mb-20">
                                                    In a free hour when our power of choice is untrammelled and
                                                    when nothing prevents our being able to do what we like
                                                    best, every pleasure is to be welcomed and every pain
                                                    avoided. But in certain circumstances and owing to the
                                                    claims of duty or the obligations of business it will
                                                    frequently occur that pleasures have to be repudiated and
                                                    annoyances accepted. The wise man therefore always holds in
                                                    these matters to this principle of selection.
                                                </p>
                                                <div className="row">
                                                    <div className="col-md-6 mb-20">
                                                        <img src="/assets/img/blog/01.jpg" alt="" />
                                                    </div>
                                                    <div className="col-md-6 mb-20">
                                                        <img src="/assets/img/blog/02.jpg" alt="" />
                                                    </div>
                                                </div>
                                                <p className="mb-20">
                                                    Power of choice is untrammelled and when nothing prevents
                                                    our being able to do what we like best, every pleasure is to
                                                    be welcomed and every pain avoided. But in certain
                                                    circumstances and owing to the claims of duty or the
                                                    obligations of business it will frequently occur that
                                                    pleasures have to be repudiated and annoyances accepted. The
                                                    wise man therefore always holds in these matters to this
                                                    principle of selection.
                                                </p>
                                                <hr />
                                                <div className="blog-details-tags pb-20">
                                                    <h5>Tags : </h5>
                                                    <ul>
                                                        <li>
                                                            <a href="#">Shop</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">Online</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">Medicine</a>
                                                        </li>
                                                    </ul>
                                                </div>
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
                                            <a href="#">
                                                <i className="far fa-arrow-right" />
                                                Medicine<span>(10)</span>
                                            </a>
                                            <a href="#">
                                                <i className="far fa-arrow-right" />
                                                Medical Equipments<span>(15)</span>
                                            </a>
                                            <a href="#">
                                                <i className="far fa-arrow-right" />
                                                Beauty Care<span>(20)</span>
                                            </a>
                                            <a href="#">
                                                <i className="far fa-arrow-right" />
                                                Baby &amp; Mom Care<span>(30)</span>
                                            </a>
                                            <a href="#">
                                                <i className="far fa-arrow-right" />
                                                Healthcare<span>(25)</span>
                                            </a>
                                            <a href="#">
                                                <i className="far fa-arrow-right" />
                                                Food &amp; Nutrition<span>(29)</span>
                                            </a>
                                        </div>
                                    </div>
                                    {/* recent post */}
                                    <div className="widget recent-post">
                                        <h5 className="widget-title">Recent Post</h5>
                                        <div className="recent-post-item">
                                            <div className="recent-post-img">
                                                <img src="/assets/img/blog/bs-1.jpg" alt="thumb" />
                                            </div>
                                            <div className="recent-post-bio">
                                                <h6>
                                                    <a href="#">How to Enjoy Your Favorite Things Every Day</a>
                                                </h6>
                                                <span>
                                                    <i className="far fa-clock" />
                                                    August 20, 2024
                                                </span>
                                            </div>
                                        </div>
                                        <div className="recent-post-item">
                                            <div className="recent-post-img">
                                                <img src="/assets/img/blog/bs-2.jpg" alt="thumb" />
                                            </div>
                                            <div className="recent-post-bio">
                                                <h6>
                                                    <a href="#">How to Enjoy Your Favorite Things Every Day</a>
                                                </h6>
                                                <span>
                                                    <i className="far fa-clock" />
                                                    August 20, 2024
                                                </span>
                                            </div>
                                        </div>
                                        <div className="recent-post-item">
                                            <div className="recent-post-img">
                                                <img src="/assets/img/blog/bs-3.jpg" alt="thumb" />
                                            </div>
                                            <div className="recent-post-bio">
                                                <h6>
                                                    <a href="#">How to Enjoy Your Favorite Things Every Day</a>
                                                </h6>
                                                <span>
                                                    <i className="far fa-clock" />
                                                    August 20, 2024
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* social share */}
                                    <div className="widget social-share">
                                        <h5 className="widget-title">Follow Us</h5>
                                        <div className="social-share-link">
                                            <a href="#">
                                                <i className="fab fa-facebook-f" />
                                            </a>
                                            <a href="#">
                                                <i className="fab fa-x-twitter" />
                                            </a>
                                            <a href="#">
                                                <i className="fab fa-dribbble" />
                                            </a>
                                            <a href="#">
                                                <i className="fab fa-whatsapp" />
                                            </a>
                                            <a href="#">
                                                <i className="fab fa-youtube" />
                                            </a>
                                        </div>
                                    </div>
                                    {/* Recent Post */}
                                    <div className="widget sidebar-tag">
                                        <h5 className="widget-title">Popular Tags</h5>
                                        <div className="tag-list">
                                            <a href="#">Shop</a>
                                            <a href="#">Deal</a>
                                            <a href="#">Online</a>
                                            <a href="#">Buy</a>
                                            <a href="#">Medicine</a>
                                            <a href="#">Offer</a>
                                            <a href="#">Tips</a>
                                            <a href="#">Fitness</a>
                                            <a href="#">Equipment</a>
                                            <a href="#">Baby Care</a>
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