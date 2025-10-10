export default function AdminPage() {
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
                            <h4 className="breadcrumb-title">Dashboard</h4>
                            <ul className="breadcrumb-menu">
                                <li>
                                    <a href="index-2.html">
                                        <i className="far fa-home" /> Home
                                    </a>
                                </li>
                                <li className="active">Dashboard</li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* breadcrumb end */}
                {/* user dashboard */}
                <div className="user-area bg pt-100 pb-80">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3">
                                <div className="sidebar">
                                    <div className="sidebar-top">
                                        <div className="sidebar-profile-img">
                                            <img src="/assets/img/account/03.jpg" alt="" />
                                            <button type="button" className="profile-img-btn">
                                                <i className="far fa-camera" />
                                            </button>
                                            <input type="file" className="profile-img-file" />
                                        </div>
                                        <h5>Antoni Jonson</h5>
                                        <p>
                                            <a
                                                href="https://live.themewild.com/cdn-cgi/l/email-protection"
                                                className="__cf_email__"
                                                data-cfemail="bfded1cbd0d1d6ffdac7ded2cfd3da91dcd0d2"
                                            >
                                                [email&nbsp;protected]
                                            </a>
                                        </p>
                                    </div>
                                    <ul className="sidebar-list">
                                        <li>
                                            <a className="active" href="user-dashboard.html">
                                                <i className="far fa-gauge-high" /> Dashboard
                                            </a>
                                        </li>
                                        <li>
                                            <a href="user-profile.html">
                                                <i className="far fa-user" /> My Profile
                                            </a>
                                        </li>
                                        <li>
                                            <a href="order-list.html">
                                                <i className="far fa-shopping-bag" /> My Order List{" "}
                                                <span className="badge badge-danger">02</span>
                                            </a>
                                        </li>

                                        <li>
                                            <a href="address-list.html">
                                                <i className="far fa-location-dot" /> Address List
                                            </a>
                                        </li>
                                        <li>
                                            <a href="support-ticket.html">
                                                <i className="far fa-headset" /> Support Tickets{" "}
                                                <span className="badge badge-danger">02</span>
                                            </a>
                                        </li>

                                        <li>
                                            <a href="user-setting.html">
                                                <i className="far fa-gear" /> Settings
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="far fa-sign-out" /> Logout
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <div className="user-wrapper">
                                    <div className="user-card">
                                        <h4 className="user-card-title">Summary</h4>
                                        <div className="row">
                                            <div className="col-md-6 col-lg-4">
                                                <div className="dashboard-widget color-1">
                                                    <div className="dashboard-widget-info">
                                                        <h1>50</h1>
                                                        <span>Pending Orders</span>
                                                    </div>
                                                    <div className="dashboard-widget-icon">
                                                        <i className="fal fa-list" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-lg-4">
                                                <div className="dashboard-widget color-2">
                                                    <div className="dashboard-widget-info">
                                                        <h1>250</h1>
                                                        <span>Completed Orders</span>
                                                    </div>
                                                    <div className="dashboard-widget-icon">
                                                        <i className="fal fa-layer-group" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-lg-4">
                                                <div className="dashboard-widget color-3">
                                                    <div className="dashboard-widget-info">
                                                        <h1>$15.80k</h1>
                                                        <span>My Balance</span>
                                                    </div>
                                                    <div className="dashboard-widget-icon">
                                                        <i className="fal fa-wallet" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="user-card">
                                                <div className="user-card-header">
                                                    <h4 className="user-card-title">Recent Orders</h4>
                                                    <div className="user-card-header-right">
                                                        <a href="order-list.html" className="theme-btn">
                                                            View All Orders
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="table-responsive">
                                                    <table className="table table-borderless text-nowrap">
                                                        <thead>
                                                            <tr>
                                                                <th>#Order No</th>
                                                                <th>Purchased Date</th>
                                                                <th>Total</th>
                                                                <th>Status</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <span className="table-list-code">#28VR5K59</span>
                                                                </td>
                                                                <td>August 20, 2024</td>
                                                                <td>$3,650</td>
                                                                <td>
                                                                    <span className="badge badge-info">Pending</span>
                                                                </td>
                                                                <td>
                                                                    <a
                                                                        href="order-detail.html"
                                                                        className="btn btn-outline-secondary btn-sm rounded-2"
                                                                        data-tooltip="tooltip"
                                                                        title="Details"
                                                                    >
                                                                        <i className="far fa-eye" />
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <span className="table-list-code">#28VR5K59</span>
                                                                </td>
                                                                <td>August 20, 2024</td>
                                                                <td>$3,650</td>
                                                                <td>
                                                                    <span className="badge badge-primary">
                                                                        Processing
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <a
                                                                        href="order-detail.html"
                                                                        className="btn btn-outline-secondary btn-sm rounded-2"
                                                                        data-tooltip="tooltip"
                                                                        title="Details"
                                                                    >
                                                                        <i className="far fa-eye" />
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <span className="table-list-code">#28VR5K59</span>
                                                                </td>
                                                                <td>August 20, 2024</td>
                                                                <td>$3,650</td>
                                                                <td>
                                                                    <span className="badge badge-success">
                                                                        Completed
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <a
                                                                        href="order-detail.html"
                                                                        className="btn btn-outline-secondary btn-sm rounded-2"
                                                                        data-tooltip="tooltip"
                                                                        title="Details"
                                                                    >
                                                                        <i className="far fa-eye" />
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <span className="table-list-code">#28VR5K59</span>
                                                                </td>
                                                                <td>August 20, 2024</td>
                                                                <td>$3,650</td>
                                                                <td>
                                                                    <span className="badge badge-danger">
                                                                        Cancelled
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <a
                                                                        href="order-detail.html"
                                                                        className="btn btn-outline-secondary btn-sm rounded-2"
                                                                        data-tooltip="tooltip"
                                                                        title="Details"
                                                                    >
                                                                        <i className="far fa-eye" />
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <span className="table-list-code">#28VR5K59</span>
                                                                </td>
                                                                <td>August 20, 2024</td>
                                                                <td>$3,650</td>
                                                                <td>
                                                                    <span className="badge badge-success">
                                                                        Completed
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <a
                                                                        href="order-detail.html"
                                                                        className="btn btn-outline-secondary btn-sm rounded-2"
                                                                        data-tooltip="tooltip"
                                                                        title="Details"
                                                                    >
                                                                        <i className="far fa-eye" />
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <span className="table-list-code">#28VR5K59</span>
                                                                </td>
                                                                <td>August 20, 2024</td>
                                                                <td>$3,650</td>
                                                                <td>
                                                                    <span className="badge badge-success">
                                                                        Completed
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <a
                                                                        href="order-detail.html"
                                                                        className="btn btn-outline-secondary btn-sm rounded-2"
                                                                        data-tooltip="tooltip"
                                                                        title="Details"
                                                                    >
                                                                        <i className="far fa-eye" />
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <span className="table-list-code">#28VR5K59</span>
                                                                </td>
                                                                <td>August 20, 2024</td>
                                                                <td>$3,650</td>
                                                                <td>
                                                                    <span className="badge badge-success">
                                                                        Completed
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <a
                                                                        href="order-detail.html"
                                                                        className="btn btn-outline-secondary btn-sm rounded-2"
                                                                        data-tooltip="tooltip"
                                                                        title="Details"
                                                                    >
                                                                        <i className="far fa-eye" />
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* user dashboard end */}
            </main>

        </>
    );
}
