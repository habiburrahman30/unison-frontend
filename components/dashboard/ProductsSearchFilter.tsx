"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProductsSearchFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [value, setValue] = useState(searchParams.get("search") || "");

    const applySearch = (search: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (search.trim()) {
            params.set("search", search.trim());
        } else {
            params.delete("search");
        }
        params.set("page", "1");
        router.push(`/admin/products?${params.toString()}`);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        applySearch(value);
    };

    const handleClear = () => {
        setValue("");
        applySearch("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
                type="text"
                className="form-control"
                placeholder="Search by product name..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                style={{ minWidth: "220px" }}
            />
            <button
                type="submit"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
                title="Search"
            >
                <i className="far fa-search" />
            </button>
            {searchParams.get("search") && (
                <button
                    type="button"
                    onClick={handleClear}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
                    title="Clear search"
                >
                    <i className="far fa-times" />
                </button>
            )}
        </form>
    );
}
