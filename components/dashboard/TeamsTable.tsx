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
        <div>
            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-slate-100 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                            <th className="px-5 py-3">Image</th>
                            <th className="px-5 py-3">Name</th>
                            <th className="px-5 py-3">Position</th>
                            <th className="px-5 py-3">Email</th>
                            <th className="px-5 py-3">Phone</th>
                            <th className="px-5 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {members.map((member) => (
                            <tr key={member.id} className="transition-colors hover:bg-slate-50/70">
                                <td className="px-5 py-3">
                                    <img
                                        src={member.image || "/assets/img/placeholder.jpg"}
                                        alt={member.name}
                                        className="h-10 w-10 rounded-full border border-slate-100 object-cover"
                                    />
                                </td>
                                <td className="px-5 py-3 font-medium text-slate-900">{member.name}</td>
                                <td className="px-5 py-3 text-slate-500">{member.position != "" ? member.position : "—"}</td>
                                <td className="px-5 py-3 text-slate-500">{member.email ?? "—"}</td>
                                <td className="px-5 py-3 text-slate-500">{member.phone ?? "—"}</td>
                                <td className="px-5 py-3">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={`/admin/teams/${member.id}/edit`}
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
                                            title="Edit"
                                        >
                                            <i className="far fa-pen" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(member)}
                                            disabled={isDeleting === member.id}
                                            className="inline-flex h-8 min-w-8 items-center justify-center rounded-lg border border-red-200 px-2 text-red-500 transition-colors hover:bg-red-50 disabled:opacity-50"
                                            title="Delete"
                                        >
                                            {isDeleting === member.id ? <span className="text-xs">…</span> : <i className="far fa-trash-can" />}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
                <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-slate-500">
                        Showing {(pagination.page - 1) * pagination.limit + 1}–
                        {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
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
            )}
        </div>
    );
}