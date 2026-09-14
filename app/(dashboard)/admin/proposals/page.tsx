import Link from "next/link";

export default function AdminProposalsPage() {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <h4 className="text-lg font-semibold text-slate-900">Price Proposals</h4>
                <Link
                    href="/admin/proposals/create"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
                >
                    <span className="far fa-plus-circle" />
                    Create Proposal
                </Link>
            </div>

            <div className="flex flex-col items-center justify-center gap-3 px-5 py-16 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                    <i className="far fa-file-invoice text-xl" />
                </span>
                <p className="text-sm font-medium text-slate-600">No saved proposals yet</p>
                <p className="max-w-sm text-xs text-slate-400">
                    Create a price proposal to generate a formal medical equipment &amp; gas pipeline offer letter for a client.
                </p>
            </div>
        </div>
    );
}
