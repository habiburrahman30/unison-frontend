"use client";

import CreateCategoryForm from "@/components/dashboard/CreateCategoryForm";
import Link from "next/link";


export default function CreateCategoryPage() {
    return (

        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-6 py-4">
                <h4 className="text-lg font-semibold text-slate-900">Create Category</h4>
            </div>
            <div className="p-6 dash-form">
                <CreateCategoryForm />
            </div>
        </div>


    );
}
