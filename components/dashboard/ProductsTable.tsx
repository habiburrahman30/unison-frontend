"use client";

import { useState } from "react";
import { ProductWithRelations } from "@/lib/api/products";
import { deleteProduct } from "@/lib/api/products";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";

interface Props {
    products: ProductWithRelations[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export default function ProductsTable({ products, pagination }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isDeleting, setIsDeleting] = useState<number | null>(null);



    const handleDelete = async (products: ProductWithRelations) => {
        const result = await Swal.fire({
            title: "Delete Product?",
            html: `
            <p>Are you sure you want to delete <strong>"${products.name}"</strong>?</p>
            <p class="text-muted">This action cannot be undone.</p>
          `,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc3545",
            cancelButtonColor: "#6c757d",
            confirmButtonText: '<i class="far fa-trash-alt me-2"></i>Yes, Delete',
            cancelButtonText: '<i class="far fa-times me-2"></i>Cancel',
            focusCancel: true,
            customClass: {
                popup: "animated fadeIn",
            },
        });

        if (result.isConfirmed) {
            setIsDeleting(products.id);

            try {
                await deleteProduct(products.id);

                Swal.fire({
                    title: "Deleted!",
                    text: `"${products.name}" has been deleted successfully.`,
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                });

                router.refresh();
            } catch (error) {
                console.error("Failed to delete product:", error);

                Swal.fire({
                    title: "Error!",
                    text: "Failed to delete product. Please try again.",
                    icon: "error",
                    confirmButtonColor: "#dc3545",
                });
            } finally {
                setIsDeleting(null);
            }
        }
    };


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
        <div className="table-responsive">
            <table className="table table-borderless text-nowrap">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th>Origin</th>
                        <th>Stock</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((data) => (
                        <tr key={data.id}>

                            <td>
                                <div className="" style={{ "padding": "3px" }}>
                                    {data.images[0] ? (<Image
                                        src={data.images[0]}
                                        alt={data.name}
                                        width={80}
                                        height={80}
                                        className="rounded-2"
                                    />
                                    ) : (
                                        <Image
                                            src="/assets/img/no-image-found.jpg"
                                            alt="Default Testimonial"
                                            width={80}
                                            height={80}
                                            className="rounded-2"
                                        />
                                    )}

                                </div>
                            </td>

                            <td>
                                <span className="table-list-code"> {data.name}</span>
                            </td>
                            <td><span className="badge badge-info">{data.category.name}</span></td>
                            <td> <span className="badge badge-info">{data.brand.name}</span></td>
                            <td><span className="badge badge-info">{data.manufacturer}</span></td>

                            <td>
                                {data.stock > 0
                                    ? <span className="badge badge-success text-success">Available</span>
                                    : <span className="badge badge-danger text-danger">Not Available</span>
                                }
                            </td>

                            <td>
                                <Link
                                    href={`/admin/products/${data.id}/edit`}
                                    className="btn btn-outline-secondary btn-sm rounded-2"
                                >
                                    <i className="far fa-pen" />

                                </Link>

                                <button
                                    onClick={() => handleDelete(data)}
                                    disabled={isDeleting === data.id}
                                    className="btn btn-outline-danger btn-sm rounded-2"
                                    data-tooltip="tooltip"
                                    title="Delete"
                                >
                                    {isDeleting === data.id ? "Deleting..." : <i className="far fa-trash-can" />}
                                </button>
                            </td>
                        </tr>
                    ))}
                    {/* <tr>
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
                                href="/admin/products/edit"
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
                    </tr> */}
                </tbody>
            </table>

            {/* pagination */}

            {pagination.totalPages > 1 && (
                <div className="pagination-area mt-4 mb-3">
                    <div aria-label="Page navigation example">
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
                    </div>
                </div>
            )}
            {/* pagination end */}
        </div >
    );
}