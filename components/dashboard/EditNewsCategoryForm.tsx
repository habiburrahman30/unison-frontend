"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

interface Category {
    id: number;
    name: string;
    description: string | null;
}

interface Props {
    category: Category;
}

export default function EditNewsCategoryForm({ category }: Props) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: category.name,
        description: category.description || "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.name.trim()) {
            toast.error("Category name is required");
            return;
        }

        setIsSubmitting(true);


        try {


            // Step 2: Update category
            const categoryData = {
                name: formData.name.trim(),
                description: formData.description.trim() || null,
            };

            console.log("Updating category with data:", categoryData);

            const response = await fetch(`/api/news-categories/${category.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(categoryData),
            });

            const result = await response.json();

            if (!response.ok) {

                throw new Error(result.message || "Failed to update category");
            }



            toast.success("Category updated successfully!");

            // Redirect after short delay
            setTimeout(() => {
                router.push("/admin/news-categories");
                router.refresh();
            }, 1500);
        } catch (error: any) {
            console.error("Error updating category:", error);
            toast.error(error.message || "Failed to update category");
            setIsSubmitting(false);
        }
    };

    // Check if form is valid
    const isFormValid = formData.name.trim().length > 0;

    return (
        <>
            <Toaster position="top-right" />
            <form onSubmit={handleSubmit}>
                <div className="row">
                    {/* Category Name - REQUIRED */}
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>
                                Category Name <span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Enter category name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    {/* Description - OPTIONAL */}
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Description</label>
                            <input
                                type="text"
                                name="description"
                                className="form-control"
                                placeholder="Enter category description (optional)"
                                value={formData.description}
                                onChange={handleChange}
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>


                </div>

                <div className="row mt-4">
                    <div className="col text-start">
                        <Link
                            href="/admin/news-categories"
                            className="theme-btn"
                            style={{ opacity: isSubmitting ? 0.5 : 1 }}
                            onClick={(e) => {
                                if (isSubmitting) {
                                    e.preventDefault();
                                    toast.error(
                                        "Please wait for the current operation to complete"
                                    );
                                }
                            }}
                        >
                            <span className="far fa-arrow-left" /> Back
                        </Link>
                    </div>

                    <div className="col text-end">
                        <button
                            type="submit"
                            className={`theme-btn ${!isFormValid ? "btn-secondary" : ""}`}
                            disabled={isSubmitting || !isFormValid}
                            style={{
                                backgroundColor: !isFormValid
                                    ? "#6c757d"
                                    : isSubmitting
                                        ? "#0d6efd"
                                        : "",
                                borderColor: !isFormValid ? "#6c757d" : "",
                                cursor:
                                    !isFormValid || isSubmitting ? "not-allowed" : "pointer",
                                opacity: !isFormValid ? 0.65 : 1,
                            }}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" />
                                    Updating Category...
                                </>
                            ) : (
                                <>
                                    <span className="far fa-save" /> Update Category
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}