"use client";

import CreateNewsCategoryForm from "@/components/dashboard/CreateNewsCategoryForm";
import Link from "next/link";


export default function CreateCategoryPage() {

    return (

        <div className="row">
            <div className="col-lg-12">
                <div className="user-card">
                    <h4 className="user-card-title">Create News Category</h4>
                    <div className="user-form">
                        <CreateNewsCategoryForm />
                    </div>
                </div>
            </div>
        </div>


    );
}
