"use client";

import { useState } from "react";
import { deleteCategory } from "@/lib/api/categories";
import { useRouter } from "next/navigation";

import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";
interface Category {
    id: number;
    name: string;
    description: string | null;
    image: string | null;
    _count?: {
        products: number;
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
                await deleteCategory(category.id);

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
                    {categories.map((data) => (
                        <tr key={data.id}>
                            {data.image && (
                                <td>
                                    <div className="table-list-img w-15">
                                        <Image
                                            src={data.image}
                                            alt={data.name}
                                            width={80}
                                            height={80}
                                            className="rounded-3"
                                        />
                                    </div>
                                </td>

                            )}
                            <td>

                                <span className="table-list-code">{data.name}</span>
                            </td>
                            <td>{data.description ?? ''}</td>
                            <td><span className="badge badge-info">{data._count?.products || 0}</span></td>
                            <td>

                                <Link
                                    href={`/admin/categories/${data.id}/edit`}
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
    );
}