"use client";

import Link from "next/link";
import { logoutAction } from "@/app/actions/auth";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") router.push("/login");
    }, [status, router]);

    if (status === "loading") return <div>Loading...</div>;

    let pathname = usePathname();
    // normalize: remove trailing slash
    if (pathname.endsWith("/") && pathname !== "/") {
        pathname = pathname.slice(0, -1);
    }



    const menu = [
        { label: "Dashboard", href: "/admin", exact: true, icon: "fa-gauge-high" },
        { label: "Products", href: "/admin/products", icon: "fa-box" },
        { label: "Categories", href: "/admin/categories", icon: "fa-tags" },
        { label: "Brands", href: "/admin/brands", icon: "fa-copyright" },
        // { label: "News", href: "/admin/news", icon: "fa-newspaper" },
        // { label: "News Categories", href: "/admin/news-categories", icon: "fa-folder" },
        { label: "Testimonials", href: "/admin/testimonials", icon: "fa-comment" },
        // { label: "Gallery", href: "/admin/gallery", icon: "fa-images" },
        // { label: "Teams", href: "/admin/teams", icon: "fa-users" },
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


    return (
        <main className="main">


            {/* admin area */}
            <div className="user-area bg pt-100 pb-80">
                <div className="container">
                    <div className="row">

                        {/* Sidebar */}
                        <div className="col-lg-3">
                            <div className="sidebar">
                                <div className="sidebar-top">
                                    <Link href="/"><div className="sidebar-profile-img">
                                        <img src="/assets/img/logo/dashboard-logo.png" alt="" />

                                    </div>
                                    </Link>
                                    <h5>{session?.user?.name}</h5>
                                    <p>{session?.user?.email}</p>
                                </div>

                                <ul className="sidebar-list">
                                    {menu.map(item => (
                                        <li key={item.href}>
                                            <Link
                                                href={item.href}
                                                className={isActive(item) ? "active" : ""}
                                            >
                                                <i className={`far ${item.icon}`} /> {item.label}
                                            </Link>
                                        </li>
                                    ))}

                                    {/* <li>
                                        <Link href="/">
                                            <i className="far fa-sign-out" /> Logout
                                        </Link>
                                    </li> */}
                                </ul>
                                <form action={logoutAction}>
                                    <button
                                        type="submit"
                                        className="bg-red-500 mt-5 hover:bg-red-600 text-white w-full text-center py-2 px-4 rounded cursor-pointer border-0"
                                    >
                                        <i className="far fa-sign-out" /> Logout
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Dynamic Content */}
                        <div className="col-lg-9">
                            <div className="user-wrapper">
                                {children}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </main >
    );
}
