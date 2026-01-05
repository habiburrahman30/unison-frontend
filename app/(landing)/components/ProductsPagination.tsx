"use client";

import Link from "next/link";

interface Props {
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
    searchParams: {
        page?: string;
        search?: string;
        category_id?: string;
        brandId?: string;
    };
}

export default function ProductsPagination({ pagination, searchParams }: Props) {
    // Function to build pagination URL
    const buildPageUrl = (pageNum: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", pageNum.toString());
        return `?${params.toString()}`;
    };

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;
        const { page, totalPages } = pagination;

        let startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        if (endPage - startPage + 1 < maxPagesToShow) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };


    return (
        <div className="pagination-area mt-4 mb-3">
            <div aria-label="Page navigation">
                <ul className="pagination">
                    {/* Previous Button */}
                    <li className={`page-item ${pagination.page === 1 ? "disabled" : ""}`}>
                        <a className="page-link"
                            href={pagination.page > 1 ? buildPageUrl(pagination.page - 1) : "#"}
                            aria-label="Previous"
                            onClick={(e) => {
                                if (pagination.page === 1) {
                                    e.preventDefault();
                                }
                            }}>
                            <span aria-hidden="true">
                                <i className="far fa-angle-double-left" />
                            </span>
                        </a>
                    </li>

                    {/* First page if not visible */}
                    {getPageNumbers()[0] > 1 && (
                        <>
                            <li className="page-item">
                                <a className="page-link" href={buildPageUrl(1)}>
                                    1
                                </a>
                            </li>
                            {getPageNumbers()[0] > 2 && (
                                <li className="page-item disabled">
                                    <span className="page-link">...</span>
                                </li>
                            )}

                        </>
                    )}

                    {/* Page Numbers */}
                    {getPageNumbers().map((pageNum) => (
                        <li
                            key={pageNum}
                            className={`page-item ${pagination.page === pageNum ? "active" : ""
                                }`}
                        >
                            <a className="page-link" href={buildPageUrl(pageNum)}>
                                {pageNum}
                            </a>
                        </li>
                    ))}

                    {/* Last page if not visible */}
                    {getPageNumbers()[getPageNumbers().length - 1] < pagination.totalPages && (
                        <>

                            {getPageNumbers()[getPageNumbers().length - 1] < pagination.totalPages - 1 && (
                                <li className="page-item disabled">
                                    <span className="page-link">...</span>
                                </li>
                            )}

                            <li className="page-item">
                                <a className="page-link" href={buildPageUrl(pagination.totalPages)}>
                                    {pagination.totalPages}
                                </a>
                            </li>
                        </>
                    )}
                    {/* Next Button */}
                    <li
                        className={`page-item ${pagination.page === pagination.totalPages ? "disabled" : ""
                            }`}
                    >
                        <a className="page-link"
                            href={
                                pagination.page < pagination.totalPages
                                    ? buildPageUrl(pagination.page + 1)
                                    : "#"
                            }
                            aria-label="Next"
                            onClick={(e) => {
                                if (pagination.page === pagination.totalPages) {
                                    e.preventDefault();
                                }
                            }}>
                            <span aria-hidden="true">
                                <i className="far fa-angle-double-right" />
                            </span>
                        </a>
                    </li>
                </ul>
                {/* Info */}
            </div >
            <div className="text-sm text-gray-600 text-center mt-2">
                Showing page {pagination.page} of {pagination.totalPages} ({pagination.total} total products)
            </div>
        </div >
    );
}