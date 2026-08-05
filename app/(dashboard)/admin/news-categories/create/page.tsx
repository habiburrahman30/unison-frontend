"use client";

import CreateNewsCategoryForm from "@/components/dashboard/CreateNewsCategoryForm";
import Link from "next/link";


export default function CreateCategoryPage() {

    return (

        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-6 py-4">
                <h4 className="text-lg font-semibold text-slate-900">Create News Category</h4>
            </div>
            <div className="p-6 dash-form">
                <CreateNewsCategoryForm />
            </div>
        </div>


    );
}
