export default function CategoryPage() {

    const categoryData = [
        {
            name: "MGPS",
            icon: "/assets/img/icon/gas_pipeline.png",
            item: "10",
        },
        {
            name: "Oxygen Generator",
            icon: "/assets/img/icon/02_genarator.png",
            item: "5",
        },
        {
            name: "MOT",
            icon: "/assets/img/icon/mot.png",
            item: "4",
        },
        {
            name: "OT",
            icon: "/assets/img/icon/ot.png",
            item: "14",
        },
        {
            name: "ICU",
            icon: "/assets/img/icon/icu.png",
            item: "8",
        },
        {
            name: "NICU",
            icon: "/assets/img/icon/nicu.png",
            item: "19",
        },
        {
            name: "Hospital Furniture",
            icon: "/assets/img/icon/hospital_furniture.png",
            item: "11",
        },
        {
            name: "CSSD",
            icon: "/assets/img/icon/safe.png",
            item: "2",
        },
        {
            name: "Water Management",
            icon: "/assets/img/icon/water_management.png",
            item: "16",
        },
        {
            name: "Disposable",
            icon: "/assets/img/icon/disposable.png",
            item: "20",
        },

    ];
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
                            <h4 className="breadcrumb-title">Category One</h4>
                            <ul className="breadcrumb-menu">
                                <li>
                                    <a href="index-2.html">
                                        <i className="far fa-home" /> Home
                                    </a>
                                </li>
                                <li className="active">Category One</li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* breadcrumb end */}
                {/* category area */}
                <div className="category-area py-120">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 mx-auto">
                                <div className="site-heading text-center">
                                    <span className="site-title-tagline">Our Category</span>
                                    <h2 className="site-title">
                                        Our Popular <span>Category</span>
                                    </h2>
                                </div>
                            </div>
                        </div>
                        <div className="row g-3">

                            {categoryData.map((data, index) => (
                                <div className="col-6 col-md-4 col-lg-2">
                                    <div className="category-item">
                                        <a href="#">
                                            <div className="category-info">
                                                <div className="icon">
                                                    <img src={data.icon && data.icon !== "" ? data.icon : "/assets/img/no-image-found.jpg"}
                                                        alt={data.name} />

                                                </div>
                                                <div className="content">
                                                    <h4>{data.name}</h4>
                                                    <p>{data.item} Items</p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>

                            ))}
                            {/* <div className="col-6 col-md-4 col-lg-2">
                                <div className="category-item">
                                    <a href="#">
                                        <div className="category-info">
                                            <div className="icon">
                                                <img src="/assets/img/icon/health-care.svg" alt="" />
                                            </div>
                                            <div className="content">
                                                <h4>Oxgen Generator</h4>
                                                <p>25 Items</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="col-6 col-md-4 col-lg-2">
                                <div className="category-item">
                                    <a href="#">
                                        <div className="category-info">
                                            <div className="icon">
                                                <img src="/assets/img/icon/beauty-care.svg" alt="" />
                                            </div>
                                            <div className="content">
                                                <h4>MOT</h4>
                                                <p>15 Items</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="col-6 col-md-4 col-lg-2">
                                <div className="category-item">
                                    <a href="#">
                                        <div className="category-info">
                                            <div className="icon">
                                                <img src="/assets/img/icon/sexual.svg" alt="" />
                                            </div>
                                            <div className="content">
                                                <h4>OT</h4>
                                                <p>05 Items</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="col-6 col-md-4 col-lg-2">
                                <div className="category-item">
                                    <a href="#">
                                        <div className="category-info">
                                            <div className="icon">
                                                <img src="/assets/img/icon/fitness.svg" alt="" />
                                            </div>
                                            <div className="content">
                                                <h4>ICU</h4>
                                                <p>30 Items</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="col-6 col-md-4 col-lg-2">
                                <div className="category-item">
                                    <a href="#">
                                        <div className="category-info">
                                            <div className="icon">
                                                <img src="/assets/img/icon/lab-test.svg" alt="" />
                                            </div>
                                            <div className="content">
                                                <h4>NICU</h4>
                                                <p>12 Items</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="col-6 col-md-4 col-lg-2">
                                <div className="category-item">
                                    <a href="#">
                                        <div className="category-info">
                                            <div className="icon">
                                                <img src="/assets/img/icon/baby-mom-care.svg" alt="" />
                                            </div>
                                            <div className="content">
                                                <h4>Hospital Furniture</h4>
                                                <p>08 Items</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="col-6 col-md-4 col-lg-2">
                                <div className="category-item">
                                    <a href="#">
                                        <div className="category-info">
                                            <div className="icon">
                                                <img src="/assets/img/icon/supplements.svg" alt="" />
                                            </div>
                                            <div className="content">
                                                <h4>CSSD</h4>
                                                <p>14 Items</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="col-6 col-md-4 col-lg-2">
                                <div className="category-item">
                                    <a href="#">
                                        <div className="category-info">
                                            <div className="icon">
                                                <img src="/assets/img/icon/food-nutrition.svg" alt="" />
                                            </div>
                                            <div className="content">
                                                <h4>Water Management</h4>
                                                <p>19 Items</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="col-6 col-md-4 col-lg-2">
                                <div className="category-item">
                                    <a href="#">
                                        <div className="category-info">
                                            <div className="icon">
                                                <img src="/assets/img/icon/medical-equipements.svg" alt="" />
                                            </div>
                                            <div className="content">
                                                <h4>Disposable</h4>
                                                <p>24 Items</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div> */}
                            {/* <div className="col-6 col-md-4 col-lg-2">
                                <div className="category-item">
                                    <a href="#">
                                        <div className="category-info">
                                            <div className="icon">
                                                <img src="/assets/img/icon/medical-supplies.svg" alt="" />
                                            </div>
                                            <div className="content">
                                                <h4>Medical Supplies</h4>
                                                <p>09 Items</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="col-6 col-md-4 col-lg-2">
                                <div className="category-item">
                                    <a href="#">
                                        <div className="category-info">
                                            <div className="icon">
                                                <img src="/assets/img/icon/pet-care.svg" alt="" />
                                            </div>
                                            <div className="content">
                                                <h4>Pet Care</h4>
                                                <p>16 Items</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
                {/* category area end*/}
            </main>

        </>
    );
}