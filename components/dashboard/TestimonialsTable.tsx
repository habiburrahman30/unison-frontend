"use client";


import { useState } from "react";
import { deleteTestimonial } from "@/lib/api/testimonials";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Testimonial } from "@/lib/api/testimonials";
import Swal from "sweetalert2";

interface Props {
    testimonials: Testimonial[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export default function TestimonialsTable({ testimonials, pagination }: Props) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState<number | null>(null);

    const handleDelete = async (testimonial: Testimonial) => {
        const result = await Swal.fire({
            title: "Delete Testimonial?",
            html: `
        <p>Are you sure you want to delete testimonial by <strong>"${testimonial.name}"</strong>?</p>
        <p class="text-muted">This action cannot be undone.</p>
      `,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc3545",
            cancelButtonColor: "#6c757d",
            confirmButtonText: '<i class="far fa-trash-alt me-2"></i>Yes, Delete',
            cancelButtonText: '<i class="far fa-times me-2"></i>Cancel',
            focusCancel: true,
        });

        if (result.isConfirmed) {
            setIsDeleting(testimonial.id);

            try {
                await deleteTestimonial(testimonial.id);

                Swal.fire({
                    title: "Deleted!",
                    text: `Testimonial by "${testimonial.name}" has been deleted successfully.`,
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                });

                router.refresh();
            } catch (error) {
                console.error("Failed to delete testimonial:", error);

                Swal.fire({
                    title: "Error!",
                    text: "Failed to delete testimonial. Please try again.",
                    icon: "error",
                    confirmButtonColor: "#dc3545",
                });
            } finally {
                setIsDeleting(null);
            }
        }
    };

    const renderStars = (rating: number) => {
        return (
            <div className="text-warning">
                {[...Array(5)].map((_, i) => (
                    <i
                        key={i}
                        className={`fa${i < rating ? "s" : "r"} fa-star`}
                    ></i>
                ))}
            </div>
        );
    };

    return (


        <div className="table-responsive">
            <table className="table table-borderless text-nowrap">
                <thead>
                    <tr>

                        <th>Image</th>
                        <th>Name</th>
                        <th>Company</th>
                        <th>Designation</th>
                        <th>Message</th>
                        <th>Rating</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {testimonials.map((data) => (
                        <tr key={data.id}>

                            <td>
                                <div className="" style={{ "padding": "3px" }}>
                                    {data.image ? (<Image
                                        src={data.image}
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



                            <td>{data.name}</td>
                            <td>
                                {data.company && (

                                    <span className="badge badge-info">{data.company}</span>

                                )}
                            </td>
                            <td>
                                {data.designation ? (
                                    <span className="badge badge-info me-1">{data.designation}</span>
                                ) : (
                                    <span>---</span>
                                )}
                            </td>
                            <td>
                                <div
                                    className="text-sm text-gray-900 line-clamp-3 max-w-md"
                                    title={data.message}
                                >
                                    {data.message}
                                </div>
                            </td>
                            <td><span className="badge badge-info">{renderStars(data.rating)}</span></td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                    className={`inline-flex px-2 py-1 text-xs rounded-full ${data.is_active
                                        ? "badge badge-success"
                                        : "badge badge-danger"
                                        }`}
                                >
                                    {data.is_active ? "Active" : "Inactive"}
                                </span>
                            </td>
                            <td>

                                <Link
                                    href={`/admin/testimonials/${data.id}/edit`}
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