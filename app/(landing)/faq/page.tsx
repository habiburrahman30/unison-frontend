import ProductGrid from "../components/ProductGrid";
import ProductList from "../components/ProductList";

export default function FaqPage() {
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
                            <h4 className="breadcrumb-title">Faq's</h4>
                            <ul className="breadcrumb-menu">
                                <li>
                                    <a href={"/"}>
                                        <i className="far fa-home" /> Home
                                    </a>
                                </li>
                                <li className="active">Faq's</li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* breadcrumb end */}
                {/* faq area */}
                <div className="faq-area py-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 mb-4">
                                <div className="list-group">
                                    <a
                                        href="#"
                                        className="list-group-item list-group-item-action active"
                                        aria-current="true"
                                    >
                                        Most Popular Questions
                                    </a>
                                    <a href="#" className="list-group-item list-group-item-action">
                                        Managing Account
                                    </a>
                                    <a href="#" className="list-group-item list-group-item-action">
                                        Working With Dashboard
                                    </a>
                                    <a href="#" className="list-group-item list-group-item-action">
                                        Available Payment Methods
                                    </a>
                                    <a href="#" className="list-group-item list-group-item-action">
                                        Delivery Information
                                    </a>
                                    <a href="#" className="list-group-item list-group-item-action">
                                        Order Tracking Instructions
                                    </a>
                                    <a href="#" className="list-group-item list-group-item-action">
                                        Refund Policy
                                    </a>
                                    <a href="#" className="list-group-item list-group-item-action">
                                        Offers And Discounts
                                    </a>
                                    <a href="#" className="list-group-item list-group-item-action">
                                        Affiliate Program
                                    </a>
                                    <a href="#" className="list-group-item list-group-item-action">
                                        Service Terms &amp; Conditions
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <div className="accordion" id="accordionExample">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingOne">
                                            <button
                                                className="accordion-button"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseOne"
                                                aria-expanded="true"
                                                aria-controls="collapseOne"
                                            >
                                                <span>
                                                    <i className="far fa-question" />
                                                </span>{" "}
                                                Do I need an account to place an order ?
                                            </button>
                                        </h2>
                                        <div
                                            id="collapseOne"
                                            className="accordion-collapse collapse show"
                                            aria-labelledby="headingOne"
                                            data-bs-parent="#accordionExample"
                                        >
                                            <div className="accordion-body">
                                                We denounce with righteous indignation and dislike men who are
                                                so beguiled and demoralized by the charms of pleasure of the
                                                moment, so blinded by desire. Ante odio dignissim quam, vitae
                                                pulvinar turpis erat ac elit eu orci id odio facilisis
                                                pharetra.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingTwo">
                                            <button
                                                className="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseTwo"
                                                aria-expanded="false"
                                                aria-controls="collapseTwo"
                                            >
                                                <span>
                                                    <i className="far fa-question" />
                                                </span>{" "}
                                                What payment methods do you accept ?
                                            </button>
                                        </h2>
                                        <div
                                            id="collapseTwo"
                                            className="accordion-collapse collapse"
                                            aria-labelledby="headingTwo"
                                            data-bs-parent="#accordionExample"
                                        >
                                            <div className="accordion-body">
                                                We denounce with righteous indignation and dislike men who are
                                                so beguiled and demoralized by the charms of pleasure of the
                                                moment, so blinded by desire. Ante odio dignissim quam, vitae
                                                pulvinar turpis erat ac elit eu orci id odio facilisis
                                                pharetra.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingThree">
                                            <button
                                                className="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseThree"
                                                aria-expanded="false"
                                                aria-controls="collapseThree"
                                            >
                                                <span>
                                                    <i className="far fa-question" />
                                                </span>{" "}
                                                How long will delivery take ?
                                            </button>
                                        </h2>
                                        <div
                                            id="collapseThree"
                                            className="accordion-collapse collapse"
                                            aria-labelledby="headingThree"
                                            data-bs-parent="#accordionExample"
                                        >
                                            <div className="accordion-body">
                                                We denounce with righteous indignation and dislike men who are
                                                so beguiled and demoralized by the charms of pleasure of the
                                                moment, so blinded by desire. Ante odio dignissim quam, vitae
                                                pulvinar turpis erat ac elit eu orci id odio facilisis
                                                pharetra.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingFour">
                                            <button
                                                className="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseFour"
                                                aria-expanded="false"
                                                aria-controls="collapseFour"
                                            >
                                                <span>
                                                    <i className="far fa-question" />
                                                </span>{" "}
                                                Do you have discounts for returning customers ?
                                            </button>
                                        </h2>
                                        <div
                                            id="collapseFour"
                                            className="accordion-collapse collapse"
                                            aria-labelledby="headingFour"
                                            data-bs-parent="#accordionExample"
                                        >
                                            <div className="accordion-body">
                                                We denounce with righteous indignation and dislike men who are
                                                so beguiled and demoralized by the charms of pleasure of the
                                                moment, so blinded by desire. Ante odio dignissim quam, vitae
                                                pulvinar turpis erat ac elit eu orci id odio facilisis
                                                pharetra.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingFive">
                                            <button
                                                className="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseFive"
                                                aria-expanded="false"
                                                aria-controls="collapseFive"
                                            >
                                                <span>
                                                    <i className="far fa-question" />
                                                </span>{" "}
                                                How can I track my order ?
                                            </button>
                                        </h2>
                                        <div
                                            id="collapseFive"
                                            className="accordion-collapse collapse"
                                            aria-labelledby="headingFive"
                                            data-bs-parent="#accordionExample"
                                        >
                                            <div className="accordion-body">
                                                We denounce with righteous indignation and dislike men who are
                                                so beguiled and demoralized by the charms of pleasure of the
                                                moment, so blinded by desire. Ante odio dignissim quam, vitae
                                                pulvinar turpis erat ac elit eu orci id odio facilisis
                                                pharetra.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingSix">
                                            <button
                                                className="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseSix"
                                                aria-expanded="false"
                                                aria-controls="collapseSix"
                                            >
                                                <span>
                                                    <i className="far fa-question" />
                                                </span>{" "}
                                                What are the product refund conditions ?
                                            </button>
                                        </h2>
                                        <div
                                            id="collapseSix"
                                            className="accordion-collapse collapse"
                                            aria-labelledby="headingSix"
                                            data-bs-parent="#accordionExample"
                                        >
                                            <div className="accordion-body">
                                                We denounce with righteous indignation and dislike men who are
                                                so beguiled and demoralized by the charms of pleasure of the
                                                moment, so blinded by desire. Ante odio dignissim quam, vitae
                                                pulvinar turpis erat ac elit eu orci id odio facilisis
                                                pharetra.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* faq area end */}
            </main>



        </>
    );
}