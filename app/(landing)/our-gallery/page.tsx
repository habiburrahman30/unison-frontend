export default function OurGalleryPage() {
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
                            <h4 className="breadcrumb-title">Our Gallery</h4>
                            <ul className="breadcrumb-menu">
                                <li>
                                    <a href={"/"}>
                                        <i className="far fa-home" /> Home
                                    </a>
                                </li>
                                <li className="active">Our Gallery</li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* breadcrumb end */}
                {/* gallery-area */}
                <div className="gallery-area py-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 mx-auto">
                                <div className="site-heading text-center">
                                    <span className="site-title-tagline">Our Gallery</span>
                                    <h2 className="site-title">
                                        Let's Check Our Photo <span>Gallery</span>
                                    </h2>
                                </div>
                            </div>
                        </div>
                        <div className="row g-4 popup-gallery">
                            <div className="col-md-12 col-lg-6">
                                <div
                                    className="gallery-item gallery-btn-active wow fadeInUp"
                                    data-wow-delay=".25s"
                                >
                                    <div className="gallery-img">
                                        <img src="/assets/img/gallery/01.jpg" alt="" />
                                        <a
                                            className="popup-img gallery-link"
                                            href="/assets/img/gallery/01.jpg"
                                        >
                                            <i className="fal fa-plus" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-lg-3">
                                <div className="gallery-item wow fadeInDown" data-wow-delay=".25s">
                                    <div className="gallery-img">
                                        <img src="/assets/img/gallery/02.jpg" alt="" />
                                        <a
                                            className="popup-img gallery-link"
                                            href="/assets/img/gallery/02.jpg"
                                        >
                                            <i className="fal fa-plus" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-lg-3">
                                <div className="gallery-item wow fadeInUp" data-wow-delay=".25s">
                                    <div className="gallery-img">
                                        <img src="/assets/img/gallery/03.jpg" alt="" />
                                        <a
                                            className="popup-img gallery-link"
                                            href="/assets/img/gallery/03.jpg"
                                        >
                                            <i className="fal fa-plus" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-lg-3">
                                <div className="gallery-item wow fadeInDown" data-wow-delay=".25s">
                                    <div className="gallery-img">
                                        <img src="/assets/img/gallery/04.jpg" alt="" />
                                        <a
                                            className="popup-img gallery-link"
                                            href="/assets/img/gallery/04.jpg"
                                        >
                                            <i className="fal fa-plus" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-lg-3">
                                <div className="gallery-item wow fadeInUp" data-wow-delay=".25s">
                                    <div className="gallery-img">
                                        <img src="/assets/img/gallery/05.jpg" alt="" />
                                        <a
                                            className="popup-img gallery-link"
                                            href="/assets/img/gallery/05.jpg"
                                        >
                                            <i className="fal fa-plus" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8 col-lg-6">
                                <div className="gallery-item wow fadeInDown" data-wow-delay=".25s">
                                    <div className="gallery-img">
                                        <img src="/assets/img/gallery/06.jpg" alt="" />
                                        <a
                                            className="popup-img gallery-link"
                                            href="/assets/img/gallery/06.jpg"
                                        >
                                            <i className="fal fa-plus" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* gallery-area end */}
            </main>
        </>
    );
}