"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

interface Category {
    id: number;
    name: string;
    description: string | null;
    image: string | null;
}

interface Props {
    category: Category;
}

export default function EditCategoryForm({ category }: Props) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(
        category.image
    );
    const [imageUrl, setImageUrl] = useState<string | null>(category.image);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [oldImageUrl, setOldImageUrl] = useState<string | null>(category.image);
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

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) {
            return;
        }

        // Validate file type
        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            e.target.value = "";
            return;
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size should be less than 5MB");
            e.target.value = "";
            return;
        }

        // Store file for later upload
        setSelectedFile(file);

        // Show preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        toast.success("New image selected. It will be uploaded when you save.");
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
        setImageUrl(null);
        setSelectedFile(null);
        const fileInput = document.querySelector(
            'input[type="file"]'
        ) as HTMLInputElement;
        if (fileInput) fileInput.value = "";
    };

    const uploadImage = async (file: File): Promise<string> => {
        const uploadFormData = new FormData();
        uploadFormData.append("file", file);

        const response = await fetch("/api/upload/category", {
            method: "POST",
            body: uploadFormData,
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Failed to upload image");
        }

        return result.data.url;
    };

    const deleteUploadedImage = async (imageUrl: string) => {
        try {
            await fetch("/api/upload/category", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ imageUrl }),
            });
        } catch (error) {
            console.error("Failed to delete uploaded image:", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.name.trim()) {
            toast.error("Category name is required");
            return;
        }

        setIsSubmitting(true);
        let newImageUrl: string | null = imageUrl;

        try {
            // Step 1: Upload new image if selected
            if (selectedFile) {
                const uploadToast = toast.loading("Uploading new image...");
                try {
                    newImageUrl = await uploadImage(selectedFile);
                    setImageUrl(newImageUrl);
                    toast.success("Image uploaded successfully!", { id: uploadToast });
                } catch (uploadError: any) {
                    toast.error(uploadError.message || "Failed to upload image", {
                        id: uploadToast,
                    });
                    setIsSubmitting(false);
                    return;
                }
            }

            // Step 2: Update category
            const categoryData = {
                name: formData.name.trim(),
                description: formData.description.trim() || null,
                image: newImageUrl || null,
            };

            console.log("Updating category with data:", categoryData);

            const response = await fetch(`/api/categories/${category.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(categoryData),
            });

            const result = await response.json();

            if (!response.ok) {
                // If update failed and we uploaded a new image, delete it
                if (selectedFile && newImageUrl) {
                    console.log("Update failed, deleting newly uploaded image...");
                    await deleteUploadedImage(newImageUrl);
                }
                throw new Error(result.message || "Failed to update category");
            }

            // Step 3: Delete old image if a new one was uploaded
            if (selectedFile && oldImageUrl && oldImageUrl !== newImageUrl) {
                console.log("Deleting old image:", oldImageUrl);
                await deleteUploadedImage(oldImageUrl);
            }

            toast.success("Category updated successfully!");

            // Redirect after short delay
            setTimeout(() => {
                router.push("/admin/categories");
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

                    {/* Image Upload - OPTIONAL */}
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Category Image</label>
                            <div className="mb-3">
                                <input
                                    type="file"
                                    className="form-control"
                                    accept="image/*"
                                    onChange={handleImageSelect}
                                    disabled={isSubmitting}
                                />
                                <small className="text-muted d-block mt-1">
                                    Optional. Max file size: 5MB. Select a new image to replace
                                    the current one.
                                </small>
                            </div>

                            {/* Current/Preview Image */}
                            {imagePreview && (
                                <div className="mt-3">
                                    <div className="position-relative d-inline-block">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="img-thumbnail"
                                            style={{
                                                maxWidth: "200px",
                                                maxHeight: "200px",
                                                objectFit: "cover",
                                            }}
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm position-absolute"
                                            style={{ top: "5px", right: "5px" }}
                                            onClick={handleRemoveImage}
                                            disabled={isSubmitting}
                                            title="Remove image"
                                        >
                                            <i className="far fa-times"></i>
                                        </button>
                                    </div>
                                    <div className="mt-2">
                                        {selectedFile ? (
                                            <small className="text-info">
                                                <i className="far fa-info-circle me-1"></i>
                                                New image ready to upload
                                            </small>
                                        ) : (
                                            <small className="text-muted">
                                                <i className="far fa-image me-1"></i>
                                                Current image
                                            </small>
                                        )}
                                    </div>
                                </div>
                            )}

                            {!imagePreview && (
                                <div className="mt-2">
                                    <small className="text-muted">No image uploaded</small>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col text-start">
                        <Link
                            href="/admin/categories"
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