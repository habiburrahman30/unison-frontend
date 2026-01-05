
"use client";
import Image from "next/image";

import Link from "next/link";

export default function NewsPage() {
    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="user-card">
                    <div className="user-card-header">
                        <h4 className="user-card-title">News</h4>
                        <div className="user-card-header-right">
                            <Link
                                href="/admin/news/create"
                                className="theme-btn"
                            >
                                <span className="far fa-plus-circle" />
                                Add News
                            </Link>

                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-borderless text-nowrap">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Brand</th>
                                    <th>Origin</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className="table-list-img w-15">
                                            <Image
                                                src="/assets/img/product/02.png"
                                                alt="Product"
                                                width={80}
                                                height={80}
                                                className="rounded-3"
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <span className="table-list-code">High-quality degreased copper tube suitable for medical gas applications.</span>
                                    </td>
                                    <td>MGPS</td>
                                    <td>CPX</td>
                                    <td><span className="badge badge-success">Available</span></td>
                                    <td>UK</td>
                                    <td>
                                        <Link
                                            href="/admin/news/edit"
                                            className="btn btn-outline-secondary btn-sm rounded-2"
                                        >
                                            <i className="far fa-pen" />

                                        </Link>
                                        <a
                                            href="#"
                                            className="btn btn-outline-danger btn-sm rounded-2"
                                            data-tooltip="tooltip"
                                            title="Delete"
                                        >
                                            <i className="far fa-trash-can" />
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        {/* pagination */}
                        <div className="pagination-area mt-4 mb-3">
                            <div aria-label="Page navigation example">
                                <ul className="pagination">
                                    <li className="page-item">
                                        <a className="page-link" href="#" aria-label="Previous">
                                            <span aria-hidden="true">
                                                <i className="far fa-angle-double-left" />
                                            </span>
                                        </a>
                                    </li>
                                    <li className="page-item active">
                                        <a className="page-link" href="#">
                                            1
                                        </a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="#">
                                            2
                                        </a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="#">
                                            3
                                        </a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="#" aria-label="Next">
                                            <span aria-hidden="true">
                                                <i className="far fa-angle-double-right" />
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/* pagination end */}
                    </div>
                </div>
            </div>
        </div>
    );
}
