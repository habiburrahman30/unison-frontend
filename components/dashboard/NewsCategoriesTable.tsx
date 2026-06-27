"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import { deleteNewsCategory } from "@/lib/api/news-categories";
interface Category {
    id: number;
    name: string;
    description: string | null;

    _count?: {
        news: number;
    };
}
interface Props {
    categories: Category[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export default function CategoriesTable({ categories, pagination }: Props) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState<number | null>(null);

    const handleDelete = async (category: Category) => {
        const result = await Swal.fire({
            title: "Delete Category?",
            html: `
        <p>Are you sure you want to delete <strong>"${category.name}"</strong>?</p>
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
            setIsDeleting(category.id);

            try {
                await deleteNewsCategory(category.id);

                Swal.fire({
                    title: "Deleted!",
                    text: `"${category.name}" has been deleted successfully.`,
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                });

                router.refresh();
            } catch (error) {
                console.error("Failed to delete category:", error);

                Swal.fire({
                    title: "Error!",
                    text: "Failed to delete category. Please try again.",
                    icon: "error",
                    confirmButtonColor: "#dc3545",
                });
            } finally {
                setIsDeleting(null);
            }
        }
    };

    const handlePageChange = (page: number) => {
        router.push(`?page=${page}&limit=${pagination.limit}`);
    };


    return (


        <div className="table-responsive">
            <table className="table table-borderless text-nowrap">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>News</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((data) => (
                        <tr key={data.id}>

                            <td>

                                <span className="table-list-code">{data.name}</span>
                            </td>
                            <td>{data.description ?? '--'}</td>
                            <td><span className="badge badge-info">{data._count?.news || 0}</span></td>

                            <td>

                                <Link
                                    href={`/admin/news-categories/${data.id}/edit`}
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
                </tbody>
            </table>

            {/* pagination */}
            {/* <div className="pagination-area mt-4 mb-3">
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
            </div> */}

            {/* pagination end */}
            {/* Dynamic Pagination */}
            <div className="pagination-area mt-4 mb-3">
                <div aria-label="Page navigation">
                    <ul className="pagination">

                        {/* Previous Button */}
                        <li className={`page-item ${pagination.page <= 1 ? "disabled" : ""}`}>
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(pagination.page - 1)}
                                disabled={pagination.page <= 1}
                            >
                                <i className="far fa-angle-double-left" />
                            </button>
                        </li>

                        {/* Page Numbers */}
                        {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                            <li key={page} className={`page-item ${pagination.page === page ? "active" : ""}`}>
                                <button
                                    className="page-link"
                                    onClick={() => handlePageChange(page)}
                                >
                                    {page}
                                </button>
                            </li>
                        ))}

                        {/* Next Button */}
                        <li className={`page-item ${pagination.page >= pagination.totalPages ? "disabled" : ""}`}>
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(pagination.page + 1)}
                                disabled={pagination.page >= pagination.totalPages}
                            >
                                <i className="far fa-angle-double-right" />
                            </button>
                        </li>

                    </ul>
                </div>

                {/* Optional: Show total info */}
                <small className="text-muted">
                    Showing {(pagination.page - 1) * pagination.limit + 1}–{Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} results
                </small>
            </div>
        </div>
    );
}