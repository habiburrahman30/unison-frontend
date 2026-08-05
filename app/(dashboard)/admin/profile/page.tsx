"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { updateProfileAction, changePasswordAction } from "@/app/actions/profile";

const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400";
const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";

const prettyRole = (role?: string) =>
    role
        ? role.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())
        : "Admin";

export default function ProfilePage() {
    const { data: session, update } = useSession();
    const router = useRouter();

    const [name, setName] = useState("");
    const [savingProfile, setSavingProfile] = useState(false);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [changingPw, setChangingPw] = useState(false);

    useEffect(() => {
        if (session?.user?.name) setName(session.user.name);
    }, [session?.user?.name]);

    const email = session?.user?.email || "";
    const roleLabel = prettyRole(session?.user?.role);
    const displayName = session?.user?.name || "Admin";
    const initials =
        displayName
            .split(" ")
            .map((w) => w[0])
            .filter(Boolean)
            .slice(0, 2)
            .join("")
            .toUpperCase() || "A";

    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            toast.error("Name is required");
            return;
        }
        setSavingProfile(true);
        const res = await updateProfileAction({ name: name.trim() });
        setSavingProfile(false);

        if (res.error) {
            toast.error(res.error);
            return;
        }
        toast.success("Profile updated successfully");
        await update({ name: name.trim() });
        router.refresh();
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword.length < 6) {
            toast.error("New password must be at least 6 characters");
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error("New passwords do not match");
            return;
        }
        setChangingPw(true);
        const res = await changePasswordAction({ currentPassword, newPassword });
        setChangingPw(false);

        if (res.error) {
            toast.error(res.error);
            return;
        }
        toast.success("Password changed successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    return (
        <div className="mx-auto flex max-w-4xl flex-col gap-6">
            <Toaster position="top-right" />

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Profile</h1>
                <p className="mt-1 text-sm text-slate-500">Manage your account details.</p>
            </div>

            {/* Summary card */}
            <div className="flex flex-col items-center gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row">
                <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand to-emerald-600 text-2xl font-bold text-white">
                    {initials}
                </span>
                <div className="text-center sm:text-left">
                    <h2 className="text-xl font-bold text-slate-900">{displayName}</h2>
                    <p className="mt-1 flex items-center justify-center gap-2 text-sm text-slate-500 sm:justify-start">
                        <i className="far fa-envelope" /> {email}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-brand-light px-3 py-1 text-xs font-semibold text-brand-dark">
                        <i className="far fa-user-shield" /> {roleLabel}
                    </span>
                </div>
            </div>

            {/* Account details */}
            <form
                onSubmit={handleProfileSubmit}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
                <div className="mb-5 flex items-center gap-2">
                    <i className="far fa-user text-brand" />
                    <h3 className="text-lg font-semibold text-slate-900">Account details</h3>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                        <label className={labelClass} htmlFor="name">Full Name</label>
                        <input
                            id="name"
                            type="text"
                            className={inputClass}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your full name"
                            disabled={savingProfile}
                        />
                    </div>
                    <div>
                        <label className={labelClass} htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            className={inputClass}
                            value={email}
                            disabled
                        />
                        <p className="mt-1 text-xs text-slate-400">Email cannot be changed.</p>
                    </div>
                    <div>
                        <label className={labelClass} htmlFor="role">Role</label>
                        <input id="role" type="text" className={inputClass} value={roleLabel} disabled />
                    </div>
                </div>

                <div className="mt-6">
                    <button
                        type="submit"
                        disabled={savingProfile}
                        className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark disabled:opacity-60"
                    >
                        {savingProfile ? (
                            <>
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                                Saving…
                            </>
                        ) : (
                            <>
                                <i className="far fa-floppy-disk" /> Save changes
                            </>
                        )}
                    </button>
                </div>
            </form>

            {/* Change password */}
            <form
                onSubmit={handlePasswordSubmit}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
                <div className="mb-1 flex items-center gap-2">
                    <i className="far fa-key text-brand" />
                    <h3 className="text-lg font-semibold text-slate-900">Change password</h3>
                </div>
                <p className="mb-5 text-sm text-slate-500">
                    Enter your current password, then choose a new one.
                </p>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <label className={labelClass} htmlFor="currentPassword">Current Password</label>
                        <input
                            id="currentPassword"
                            type="password"
                            className={inputClass}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="••••••••"
                            disabled={changingPw}
                            autoComplete="current-password"
                        />
                    </div>
                    <div>
                        <label className={labelClass} htmlFor="newPassword">New Password</label>
                        <input
                            id="newPassword"
                            type="password"
                            className={inputClass}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="At least 6 characters"
                            disabled={changingPw}
                            autoComplete="new-password"
                        />
                    </div>
                    <div>
                        <label className={labelClass} htmlFor="confirmPassword">Confirm New Password</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            className={inputClass}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Re-enter new password"
                            disabled={changingPw}
                            autoComplete="new-password"
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <button
                        type="submit"
                        disabled={changingPw}
                        className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800 disabled:opacity-60"
                    >
                        {changingPw ? (
                            <>
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                                Updating…
                            </>
                        ) : (
                            <>
                                <i className="far fa-key" /> Change password
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
