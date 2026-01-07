"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {

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
        { label: "News", href: "/admin/news", icon: "fa-newspaper" },
        { label: "News Categories", href: "/admin/news-categories", icon: "fa-folder" },
        { label: "Testimonials", href: "/admin/testimonials", icon: "fa-comment" },
        { label: "Gallery", href: "/admin/gallery", icon: "fa-images" },
        { label: "Teams", href: "/admin/teams", icon: "fa-users" },
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
                                    <div className="sidebar-profile-img">
                                        <img src="/assets/img/account/04.jpg" alt="" />

                                    </div>
                                    <h5>Habibur Rahman</h5>
                                    <p>hmhabib999@gmail.com</p>
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

                                    <li>
                                        <Link href="/">
                                            <i className="far fa-sign-out" /> Logout
                                        </Link>
                                    </li>
                                </ul>
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
