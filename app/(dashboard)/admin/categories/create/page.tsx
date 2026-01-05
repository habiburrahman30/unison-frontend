"use client";

import CreateCategoryForm from "@/components/dashboard/CreateCategoryForm";
import Link from "next/link";


export default function CreateCategoryPage() {
    return (

        <div className="row">
            <div className="col-lg-12">
                <div className="user-card">
                    <h4 className="user-card-title">Create Category</h4>
                    <div className="user-form">
                        <CreateCategoryForm />
                    </div>
                </div>
            </div>
        </div>


    );
}
