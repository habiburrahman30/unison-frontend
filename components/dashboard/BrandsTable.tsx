"use client";

import { useState } from "react";
import { deleteBrand } from "@/lib/api/brands";
import { useRouter } from "next/navigation";

import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";
interface Brand {
    id: number;
    name: string;
    description: string | null;
    logo: string | null;
    _count?: {
        products: number;
    };
}
interface Props {
    brands: Brand[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export default function BrandsTable({ brands, pagination }: Props) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState<number | null>(null);

    const handleDelete = async (brand: Brand) => {
        const result = await Swal.fire({
            title: "Delete Brand?",
            html: `
            <p>Are you sure you want to delete <strong>"${brand.name}"</strong>?</p>
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
            setIsDeleting(brand.id);

            try {
                await deleteBrand(brand.id);

                Swal.fire({
                    title: "Deleted!",
                    text: `"${brand.name}" has been deleted successfully.`,
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                });

                router.refresh();
            } catch (error) {
                console.error("Failed to delete brand:", error);

                Swal.fire({
                    title: "Error!",
                    text: "Failed to delete brand. Please try again.",
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

                        <th>Logo</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Products</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {brands.map((data) => (
                        <tr key={data.id}>
                            <td>
                                <div className="" style={{ "padding": "3px" }}>
                                    {data.logo ? (<Image
                                        src={data.logo}
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

                                <span className="table-list-code">{data.name}</span>
                            </td>
                            <td>{data.description ?? ''}</td>
                            <td><span className="badge badge-info">{data._count?.products || 0}</span></td>
                            <td>


                                <Link
                                    href={`/admin/brands/${data.id}/edit`}
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