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
            <div className="px-5 py-14 text-center">
                <i className="far fa-newspaper mb-3 text-3xl text-slate-300" />
                <p className="text-sm text-slate-500">No news found.</p>
            </div>
        );
    }

    return (


        <div>
            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-slate-100 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                            <th className="px-5 py-3">Image</th>
                            <th className="px-5 py-3">Name</th>
                            <th className="px-5 py-3">Description</th>
                            <th className="px-5 py-3">From Date</th>
                            <th className="px-5 py-3">To Date</th>
                            <th className="px-5 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {news.map((data) => (
                            <tr key={data.id} className="transition-colors hover:bg-slate-50/70">
                                <td className="px-5 py-3">
                                    <Image
                                        src={data.image || "/assets/img/no-image-found.jpg"}
                                        alt={data.title}
                                        width={56}
                                        height={56}
                                        className="h-14 w-14 rounded-lg border border-slate-100 object-cover"
                                    />
                                </td>
                                <td className="px-5 py-3 font-medium text-slate-900">{data.title}</td>
                                <td className="px-5 py-3 max-w-xs truncate text-slate-500">{truncate(data.description)}</td>
                                <td className="px-5 py-3">
                                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                                        {data.from_date ? formatDate(data.from_date) : ''}
                                    </span>
                                </td>
                                <td className="px-5 py-3">
                                    <span className="inline-flex items-center rounded-full bg-brand-light px-2.5 py-0.5 text-xs font-medium text-brand-dark">
                                        {data.to_date ? formatDate(data.to_date) : ''}
                                    </span>
                                </td>
                                <td className="px-5 py-3">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={`/admin/news/${data.id}/edit`}
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
                                            title="Edit"
                                        >
                                            <i className="far fa-pen" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(data)}
                                            disabled={isDeleting === data.id}
                                            className="inline-flex h-8 min-w-8 items-center justify-center rounded-lg border border-red-200 px-2 text-red-500 transition-colors hover:bg-red-50 disabled:opacity-50"
                                            title="Delete"
                                        >
                                            {isDeleting === data.id ? <span className="text-xs">…</span> : <i className="far fa-trash-can" />}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Dynamic Pagination */}
            <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-slate-500">
                    Showing {(pagination.page - 1) * pagination.limit + 1}–{Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} results
                </p>
                <nav aria-label="Page navigation" className="flex items-center gap-1">
                    <button
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={pagination.page <= 1}
                    >
                        <i className="far fa-angle-double-left" />
                    </button>
                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            className={`inline-flex h-8 min-w-8 items-center justify-center rounded-lg border px-2 text-sm font-medium transition-colors ${pagination.page === page
                                ? "border-brand bg-brand text-white"
                                : "border-slate-200 text-slate-600 hover:bg-slate-100"
                                }`}
                            onClick={() => handlePageChange(page)}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={pagination.page >= pagination.totalPages}
                    >
                        <i className="far fa-angle-double-right" />
                    </button>
                </nav>
            </div>
        </div>
    );
}