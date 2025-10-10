
import Link from "next/link";

export default function NotFound() {
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
                            <h4 className="breadcrumb-title">404 Error</h4>
                            <ul className="breadcrumb-menu">
                                <li>
                                    <a href={"/"}>
                                        <i className="far fa-home" /> Home
                                    </a>
                                </li>
                                <li className="active">404 Error</li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* breadcrumb end */}
                {/* error area */}
                <div className="error-area py-100">
                    <div className="container">
                        <div className="col-md-6 mx-auto">
                            <div className="error-wrapper">
                                <div className="error-img">
                                    <img src="/assets/img/error/01.png" alt="" />
                                </div>
                                <h2>Opos... Page Not Found!</h2>
                                <p>
                                    The page you looking for not found may be it not exist or removed.
                                </p>
                                <a href={"/"} className="theme-btn">
                                    Go Back Home <i className="far fa-home" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* error area end */}
            </main>

        </>
    );
}
