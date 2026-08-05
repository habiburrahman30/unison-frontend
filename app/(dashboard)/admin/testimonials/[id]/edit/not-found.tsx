import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <h1 className="text-6xl font-bold text-brand">404</h1>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">Customer Not Found</h2>
            <p className="mt-1 text-sm text-slate-500">
                The Customer you're looking for doesn't exist.
            </p>
            <Link
                href="/admin/testimonials"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
            >
                <i className="far fa-arrow-left"></i>
                Back to Customers
            </Link>
        </div>
    );
}