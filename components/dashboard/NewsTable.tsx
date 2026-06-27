"use client";

import { useState } from "react";
import { deleteCategory } from "@/lib/api/categories";
import { useRouter } from "next/navigation";

import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";
import { deleteNews } from "@/lib/api/news";

interface News {
    id: number;
    title: string;
    slug: string;
    description: string;
    image: string | null;
    category_id: number;
    published: boolean;
    from_date: Date;
    to_date: Date;
    tags: string[];
    created_at: Date;
    updated_at: Date;

}

interface Props {
    news: News[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export default function NewsTable({ news, pagination }: Props) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState<number | null>(null);

    const handleDelete = async (newsItem: News) => {
        const result = await Swal.fire({
            title: "Delete News?",
            html: `
        <p>Are you sure you want to delete <strong>"${newsItem.title}"</strong>?</p>
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
            setIsDeleting(newsItem.id);

            try {
                await deleteNews(newsItem.id);

                Swal.fire({
                    title: "Deleted!",
                    text: `"${newsItem.title}" has been deleted successfully.`,
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                });

                router.refresh();
            } catch (error) {
                console.error("Failed to delete news:", error);

                Swal.fire({
                    title: "Error!",
                    text: "Failed to delete news. Please try again.",
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

    const formatDate = (date: Date) =>
        new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });


    // Add this helper function at the top of the file
    const truncate = (text: string, length = 50) =>
        text?.length > length ? text.slice(0, length) + "..." : text ?? "—";

    // Show a message if there are no news items
    if (news.length === 0) {
        return (
            <div className="text-center">
                <p>No news found.</p>
            </div>
        );
    }

    return (


        <div className="table-responsive">
            <table className="table table-borderless text-nowrap">
                <thead>
                    <tr>

                        <th>Image</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>From Date</th>
                        <th>To Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {news.map((data) => (
                        <tr key={data.id}>
                            <td>
                                <div className="" style={{ "padding": "3px" }}>
                                    {data.image ? (<Image
                                        src={data.image}
                                        alt={data.title}
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

                                <span className="table-list-code">{data.title}</span>
                            </td>
                            <td>{truncate(data.description)}</td>
                            <td ><span className="badge badge-info"> {data.from_date ? formatDate(data.from_date) : ''}</span> </td>
                            <td><span className="badge badge-success">{data.to_date ? formatDate(data.to_date) : ''}</span></td>
                            <td>

                                <Link
                                    href={`/admin/news/${data.id}/edit`}
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
            {/* pagination end */}
        </div>
    );
}