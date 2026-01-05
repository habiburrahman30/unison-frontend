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
                    {brands.map((brand) => (
                        <tr key={brand.id}>
                            {brand.logo && (
                                <td>
                                    <div className="table-list-img w-15">
                                        <Image
                                            src={brand.logo}
                                            alt={brand.name}
                                            width={80}
                                            height={80}
                                            className="rounded-3"
                                        />
                                    </div>
                                </td>

                            )}
                            <td>

                                <span className="table-list-code">{brand.name}</span>
                            </td>
                            <td>{brand.description ?? ''}</td>
                            <td><span className="badge badge-info">{brand._count?.products || 0}</span></td>
                            <td>


                                <Link
                                    href={`/admin/brands/${brand.id}/edit`}
                                    className="btn btn-outline-secondary btn-sm rounded-2"
                                >
                                    <i className="far fa-pen" />

                                </Link>
                                <button
                                    onClick={() => handleDelete(brand)}
                                    disabled={isDeleting === brand.id}
                                    className="btn btn-outline-danger btn-sm rounded-2"
                                    data-tooltip="tooltip"
                                    title="Delete"
                                >
                                    {isDeleting === brand.id ? "Deleting..." : <i className="far fa-trash-can" />}
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