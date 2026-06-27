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

        <div className="row">
            <div className="col-lg-12">
                <div className="user-card">
                    <h4 className="user-card-title">Create News</h4>
                    <div className="user-form">
                        <CreateNewsForm categories={categories} />
                    </div>
                </div>
            </div>
        </div>


    );
}
