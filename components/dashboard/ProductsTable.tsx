"use client";

import { useState } from "react";
import { ProductWithRelations } from "@/lib/api/products";
import { deleteProduct } from "@/lib/api/products";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";
import { getSafeImageSrc } from "@/lib/imageUrl";

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


    const handlePageChange = (page: number) => {
        router.push(`?page=${page}&limit=${pagination.limit}`);
    };


    return (
        <div>
            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-slate-100 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                            <th className="px-5 py-3">Seq</th>
                            <th className="px-5 py-3">Image</th>
                            <th className="px-5 py-3">Name</th>
                            <th className="px-5 py-3">Category</th>
                            <th className="px-5 py-3">Brand</th>
                            <th className="px-5 py-3">Origin</th>
                            {/* <th className="px-5 py-3">Stock</th> */}
                            <th className="px-5 py-3">Visibility</th>
                            <th className="px-5 py-3 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {products.map((data) => (
                            <tr key={data.id} className="transition-colors hover:bg-slate-50/70">
                                <td className="px-5 py-3 font-medium text-slate-500">
                                    {data.category.sequence * 10 + data.sequence}
                                </td>
                                <td className="px-5 py-3">
                                    <Image
                                        src={getSafeImageSrc(data.images[0], "/assets/img/no-image-found.jpg")}
                                        alt={data.name}
                                        width={56}
                                        height={56}
                                        className="h-14 w-14 rounded-lg border border-slate-100 object-cover"
                                    />
                                </td>
                                <td className="px-5 py-3 font-medium text-slate-900">{data.name}</td>
                                <td className="px-5 py-3">
                                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">{data.category.name}</span>
                                </td>
                                <td className="px-5 py-3">
                                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">{data.brand.name}</span>
                                </td>
                                <td className="px-5 py-3 text-slate-500">{data.manufacturer}</td>
                                {/* <td className="px-5 py-3">
                                    {data.stock > 0 ? (
                                        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-600">Available</span>
                                    ) : (
                                        <span className="inline-flex items-center rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-600">Not Available</span>
                                    )}
                                </td> */}
                                <td className="px-5 py-3">
                                    {data.is_active ? (
                                        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-600">Visible</span>
                                    ) : (
                                        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500">Hidden</span>
                                    )}
                                </td>
                                <td className="px-5 py-3">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={`/admin/products/${data.id}/edit`}
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