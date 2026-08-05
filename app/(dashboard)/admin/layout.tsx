"use client";

import Link from "next/link";
import { logoutAction } from "@/app/actions/auth";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FALLBACK_IMG = "/assets/img/no-image-found.jpg";

// Swap to the not-found image if the source fails to load
const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (!img.dataset.fallback) {
        img.dataset.fallback = "1";
        img.src = FALLBACK_IMG;
    }
};

const prettyRole = (role?: string) =>
    role
        ? role.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())
        : "Admin";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const { data: session, status } = useSession();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        if (status === "unauthenticated") router.push("/login");
    }, [status, router]);

    // Initialise theme from storage
    useEffect(() => {
        const dark = localStorage.getItem("dash-theme") === "dark";
        setIsDark(dark);
        document.documentElement.classList.toggle("dark", dark);
    }, []);

    const toggleTheme = () => {
        setIsDark((prev) => {
            const next = !prev;
            document.documentElement.classList.toggle("dark", next);
            localStorage.setItem("dash-theme", next ? "dark" : "light");
            return next;
        });
    };

    if (status === "loading")
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <div className="flex items-center gap-3 text-slate-500">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-brand" />
                    <span className="text-sm font-medium">Loading…</span>
                </div>
            </div>
        );

    let pathname = usePathname();
    // normalize: remove trailing slash
    if (pathname.endsWith("/") && pathname !== "/") {
        pathname = pathname.slice(0, -1);
    }

    const menuGroups = [
        {
            title: "Main",
            items: [
                { label: "Dashboard", href: "/admin", exact: true, icon: "fa-gauge-high" },
            ],
        },
        {
            title: "Catalog",
            items: [
                { label: "Brands", href: "/admin/brands", icon: "fa-copyright" },
                { label: "Categories", href: "/admin/categories", icon: "fa-tags" },
                { label: "Products", href: "/admin/products", icon: "fa-box" },
            ],
        },
        {
            title: "Content",
            items: [
                { label: "News Categories", href: "/admin/news-categories", icon: "fa-folder" },
                { label: "News", href: "/admin/news", icon: "fa-newspaper" },
                { label: "Gallery", href: "/admin/gallery", icon: "fa-images" },
            ],
        },
        {
            title: "People",
            items: [
                { label: "Customers", href: "/admin/testimonials", icon: "fa-users" },
                { label: "Teams", href: "/admin/teams", icon: "fa-user-group" },
            ],
        },
    ];

    const isActive = (item: any) => {
        if (item.exact) {
            return pathname === item.href;
        }

        return (
            pathname === item.href ||
            pathname.startsWith(item.href + "/")
        );
    };

    const userName = session?.user?.name || "";
    const userEmail = session?.user?.email || "";
    const roleLabel = prettyRole(session?.user?.role);
    const initials =
        userName
            .split(" ")
            .map((w) => w[0])
            .filter(Boolean)
            .slice(0, 2)
            .join("")
            .toUpperCase() || "A";

    const Avatar = ({ size = "h-9 w-9" }: { size?: string }) => (
        <span className={`flex ${size} shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-900 text-xs font-semibold text-white`}>
            {session?.user?.image ? (
                <img
                    src={session.user.image}
                    alt={userName}
                    onError={handleImgError}
                    className="h-full w-full object-cover"
                />
            ) : (
                initials
            )}
        </span>
    );

    return (
        <div className="dash-root min-h-screen bg-slate-50 text-slate-800">

            {/* Mobile top bar */}
            <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4 lg:hidden">
                <button
                    type="button"
                    onClick={() => setSidebarOpen((v) => !v)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-100"
                    aria-label="Toggle sidebar"
                >
                    <i className="far fa-bars" />
                </button>
                <img
                    src="/assets/img/logo/dashboard-logo.png"
                    alt="Logo"
                    onError={handleImgError}
                    className="h-8 w-auto object-contain"
                />
                <Avatar />
            </header>

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-200 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Logo */}
                <div className="flex h-20 items-center border-b border-slate-100 px-6">
                    <Link href="/" className="flex items-center">
                        <img
                            src="/assets/img/logo/dashboard-logo.png"
                            alt="Logo"
                            onError={handleImgError}
                            className="h-10 w-auto object-contain"
                        />
                    </Link>
                </div>

                {/* Grouped navigation */}
                <nav className="flex-1 overflow-y-auto px-3 py-4">
                    {menuGroups.map((group) => (
                        <div key={group.title} className="mb-5">
                            <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                                {group.title}
                            </p>
                            <ul className="flex flex-col gap-1">
                                {group.items.map((item) => {
                                    const active = isActive(item);
                                    return (
                                        <li key={item.href}>
                                            <Link
                                                href={item.href}
                                                onClick={() => setSidebarOpen(false)}
                                                className={`group flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${active
                                                    ? "bg-slate-900 text-white shadow-sm"
                                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                                    }`}
                                            >
                                                <i
                                                    className={`far ${item.icon} w-5 text-center ${active ? "text-white" : "text-slate-400 group-hover:text-slate-600"
                                                        }`}
                                                />
                                                {item.label}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </nav>

                {/* User profile + Sign Out (bottom) */}
                <div className="border-t border-slate-100 p-4">
                    <div className="mb-3 flex items-center gap-3">
                        <Avatar size="h-10 w-10" />
                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-900">{userName}</p>
                            <p className="truncate text-xs text-slate-500">{userEmail}</p>
                        </div>
                    </div>
                    <form action={logoutAction}>
                        <button
                            type="submit"
                            className="flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                        >
                            <i className="far fa-sign-out" /> Sign Out
                        </button>
                    </form>
                </div>
            </aside>

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Dashboard content */}
            <main className="pt-14 lg:pl-64 lg:pt-0">

                {/* Top navbar (desktop) */}
                <header className="sticky top-0 z-30 hidden h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-6 backdrop-blur lg:flex">
                    {/* Left: title + role badge */}
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-slate-500">Admin Dashboard</span>
                        <span className="inline-flex items-center rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-500">
                            {roleLabel}
                        </span>
                    </div>

                    {/* Right: theme toggle + profile dropdown */}
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={toggleTheme}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
                            aria-label="Toggle theme"
                            title={isDark ? "Switch to light" : "Switch to dark"}
                        >
                            <i className={`far ${isDark ? "fa-sun" : "fa-moon"}`} />
                        </button>

                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setProfileOpen((v) => !v)}
                                className="flex items-center gap-2.5 rounded-full py-1 pl-1 pr-2 transition-colors hover:bg-slate-100"
                            >
                                <Avatar />
                                <span className="text-sm font-semibold text-slate-800">{userName || "Admin"}</span>
                                <i className={`far fa-chevron-down text-xs text-slate-400 transition-transform ${profileOpen ? "rotate-180" : ""}`} />
                            </button>

                            {profileOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setProfileOpen(false)}
                                    />
                                    <div className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
                                        <div className="border-b border-slate-100 px-4 py-3">
                                            <p className="truncate text-sm font-semibold text-slate-900">{userName || "Admin"}</p>
                                            <p className="truncate text-xs text-slate-500">{userEmail}</p>
                                        </div>
                                        <div className="p-1.5">
                                            <Link
                                                href="/admin/profile"
                                                onClick={() => setProfileOpen(false)}
                                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
                                            >
                                                <i className="far fa-user w-4 text-center text-slate-400" /> Profile
                                            </Link>
                                            <form action={logoutAction}>
                                                <button
                                                    type="submit"
                                                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                                                >
                                                    <i className="far fa-sign-out w-4 text-center" /> Sign out
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                <div className="p-4 sm:p-6 lg:p-8">{children}</div>
            </main>
        </div>
    );
}
