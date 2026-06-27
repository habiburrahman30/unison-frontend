"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import { deleteTeamMember, TeamMember } from "@/lib/api/teams";

interface Props {
    members: TeamMember[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

const truncate = (text: string | null, length = 50) =>
    text && text.length > length ? text.slice(0, length) + "..." : text ?? "—";

export default function TeamsTable({ members, pagination }: Props) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState<number | null>(null);

    const handleDelete = async (member: TeamMember) => {
        const result = await Swal.fire({
            title: "Delete Member?",
            html: `<p>Are you sure you want to delete <strong>"${member.name}"</strong>?</p>`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc3545",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Yes, Delete",
            cancelButtonText: "Cancel",
            focusCancel: true,
        });

        if (result.isConfirmed) {
            setIsDeleting(member.id);
            try {
                await deleteTeamMember(member.id);
                Swal.fire({
                    title: "Deleted!",
                    text: `"${member.name}" has been deleted.`,
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                });
                router.refresh();
            } catch (error) {
                Swal.fire("Error!", "Failed to delete member.", "error");
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
                        <th>Image</th>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member) => (
                        <tr key={member.id}>
                            <td>
                                <img
                                    src={member.image || "/assets/img/placeholder.jpg"}
                                    alt={member.name}
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        objectFit: "cover",
                                        borderRadius: "50%",
                                    }}
                                />
                            </td>
                            <td><span className="table-list-code">{member.name}</span></td>
                            <td>{member.position != "" ? member.position : "—"}</td>
                            <td>{member.email ?? "—"}</td>
                            <td>{member.phone ?? "—"}</td>
                            <td>
                                <Link
                                    href={`/admin/teams/${member.id}/edit`}
                                    className="btn btn-outline-secondary btn-sm rounded-2 me-1"
                                >
                                    <i className="far fa-pen" />
                                </Link>
                                <button
                                    onClick={() => handleDelete(member)}
                                    disabled={isDeleting === member.id}
                                    className="btn btn-outline-danger btn-sm rounded-2"
                                    title="Delete"
                                >
                                    {isDeleting === member.id
                                        ? "Deleting..."
                                        : <i className="far fa-trash-can" />}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
                <div className="pagination-area mt-4 mb-3">
                    <ul className="pagination">
                        <li className={`page-item ${pagination.page <= 1 ? "disabled" : ""}`}>
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(pagination.page - 1)}
                                disabled={pagination.page <= 1}
                            >
                                <i className="far fa-angle-double-left" />
                            </button>
                        </li>
                        {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                            <li key={page} className={`page-item ${pagination.page === page ? "active" : ""}`}>
                                <button className="page-link" onClick={() => handlePageChange(page)}>
                                    {page}
                                </button>
                            </li>
                        ))}
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
                    <small className="text-muted">
                        Showing {(pagination.page - 1) * pagination.limit + 1}–
                        {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
                    </small>
                </div>
            )}
        </div>
    );
}