import Link from "next/link";

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
export default function CategoryCard({ categories, pagination }: Props) {
    return (
        <div className="category-area py-120">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 mx-auto">
                        <div className="site-heading text-center">
                            <span className="site-title-tagline">Our Category</span>
                            <h2 className="site-title">
                                Our Popular <span>Category</span>
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="row g-3">

                    {categories.map((data) => (
                        <div className="col-6 col-md-4 col-lg-2" key={data.id}>
                            <div className="category-item">
                                <Link href={`/products?category_id=${data.id}`}>
                                    <div className="category-info">
                                        <div className="icon">
                                            <img src={data.image && data.image !== "" ? data.image : "/assets/img/no-image-found.jpg"}
                                                alt={data.name} />

                                        </div>
                                        <div className="content">
                                            <h4>{data.name}</h4>
                                            <p>{data._count?.products || 0} Items</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>

                    ))}

                </div>
            </div>
        </div>
    );
}