import Link from "next/link";

export default function ProductNotFound() {
    return (
        <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Product Not Found
            </h1>
            <p className="text-gray-600 mb-8">
                Sorry, we couldn't find the product you're looking for.
            </p>
            <Link
                href="/products"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
                Browse All Products
            </Link>
        </div>
    );
}