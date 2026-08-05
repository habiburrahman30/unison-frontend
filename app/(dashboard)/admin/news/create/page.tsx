"use client";

import CreateNewsForm from "@/components/dashboard/CreateNewsForm";
import { Category } from "@/lib/api/news-categories";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function CreateNewsPage() {

    const [categories, setCategories] = useState<Category[]>([]);


    useEffect(() => {
        // Fetch categories
        fetch("/api/news-categories?limit=1000")
            .then((res) => res.json())
            .then((data) => setCategories(data.data || []));


    }, []);

    return (

        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-6 py-4">
                <h4 className="text-lg font-semibold text-slate-900">Create News</h4>
            </div>
            <div className="p-6 dash-form">
                <CreateNewsForm categories={categories} />
            </div>
        </div>


    );
}
