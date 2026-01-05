import CategoryCard from "@/components/landing/CategoryCard";
import { getCategories } from "@/lib/api/categories";


interface PageProps {
    searchParams: Promise<{
        page?: string;
    }>;
}


export default async function CategoriesPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const page = Number(params.page) || 1;

    const data = await getCategories({
        page,
        limit: 12,
    });
    return (
        <>
            <main className="main">
                {/* breadcrumb */}
                <div className="site-breadcrumb">
                    <div
                        className="site-breadcrumb-bg"
                        style={{ background: "url(/assets/img/breadcrumb/01.jpg)" }}
                    />
                    <div className="container">
                        <div className="site-breadcrumb-wrap">
                            <h4 className="breadcrumb-title">Category One</h4>
                            <ul className="breadcrumb-menu">
                                <li>
                                    <a href="index-2.html">
                                        <i className="far fa-home" /> Home
                                    </a>
                                </li>
                                <li className="active">Category One</li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* breadcrumb end */}
                {/* category area */}
                {data.categories.length > 0 && (
                    <CategoryCard categories={data.categories} pagination={data.pagination} />
                )}

                {data.categories.length === 0 && (
                    <p className="text-center text-gray-500 mt-8">No categories found.</p>
                )}
                {/* category area end*/}
            </main>

        </>
    );
}