"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

interface News {
    id: number;
    title: string;
    slug: string;
    description: string;
    image: string | null;
    category_id: number;
    published: boolean;
    from_date: Date;
    to_date: Date;
    tags: string[];
    created_at: Date;
    updated_at: Date;
}
interface NewsCategory {
    id: number;
    name: string;
    description: string | null;
    created_at: Date;
    updated_at: Date;
}

interface Props {
    news: News;
    categories: { id: number; name: string }[];
}

export default function EditNewsForm({ news, categories }: Props) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(news.image);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [formData, setFormData] = useState({
        title: news.title,
        description: news.description,
        image: news.image,
        category_id: news.category_id,
        published: news.published,
        from_date: news.from_date
            ? new Date(news.from_date).toISOString().split("T")[0]
            : "",
        to_date: news.to_date
            ? new Date(news.to_date).toISOString().split("T")[0]
            : "",
        tags: news.tags as string[],
        tagInput: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
        }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            const tag = formData.tagInput.trim();
            if (tag && !formData.tags.includes(tag)) {
                setFormData((prev) => ({
                    ...prev,
                    tags: [...prev.tags, tag],
                    tagInput: "",
                }));
            }
        }
    };

    const handleRemoveTag = (tag: string) => {
        setFormData((prev) => ({
            ...prev,
            tags: prev.tags.filter((t) => t !== tag),
        }));
    };

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            e.target.value = "";
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size should be less than 5MB");
            e.target.value = "";
            return;
        }

        setSelectedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result as string);
        reader.readAsDataURL(file);
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
        setSelectedFile(null);
        setFormData((prev) => ({ ...prev, image: null }));
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) fileInput.value = "";
    };

    const uploadImage = async (file: File): Promise<string> => {
        const uploadFormData = new FormData();
        uploadFormData.append("file", file);

        const response = await fetch("/api/upload/news", {
            method: "POST",
            body: uploadFormData,
        });

        const contentType = response.headers.get("content-type");
        if (!contentType?.includes("application/json")) {
            throw new Error(`Server error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Failed to upload image");
        return result.data.url;
    };

    const deleteUploadedImage = async (url: string) => {
        try {
            await fetch("/api/upload/news", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ imageUrl: url }),
            });
        } catch (error) {
            console.error("Failed to delete uploaded image:", error);
        }
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.title.trim()) newErrors.title = "News title is required";
        if (!formData.description.trim()) newErrors.description = "Description is required";
        if (!formData.category_id || formData.category_id === 0) newErrors.category_id = "Please select a category";
        if (!formData.from_date) newErrors.from_date = "From date is required";
        if (!formData.to_date) newErrors.to_date = "To date is required";
        if (
            formData.from_date &&
            formData.to_date &&
            new Date(formData.from_date) > new Date(formData.to_date)
        ) {
            newErrors.to_date = "To date cannot be before From date";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const isFormValid =
        formData.title.trim().length > 0 &&
        formData.description.trim().length > 0 &&
        formData.category_id > 0 &&
        formData.from_date !== "" &&
        formData.to_date !== "";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        let uploadedImageUrl: string | null = formData.image;

        try {
            if (selectedFile) {
                try {
                    uploadedImageUrl = await uploadImage(selectedFile);
                } catch (uploadError: any) {
                    toast.error(uploadError.message || "Failed to upload image");
                    setIsSubmitting(false);
                    return;
                }
            }

            const newsData = {
                title: formData.title.trim(),
                description: formData.description.trim(),
                image: uploadedImageUrl || null,
                category_id: Number(formData.category_id),
                published: formData.published,
                from_date: formData.from_date,
                to_date: formData.to_date,
                tags: formData.tags,
            };

            const response = await fetch(`/api/news/${news.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newsData),
            });

            const result = await response.json();

            if (!response.ok) {
                if (selectedFile && uploadedImageUrl) await deleteUploadedImage(uploadedImageUrl);
                throw new Error(result.message || "Failed to update news");
            }

            toast.success("News updated successfully!");
            setTimeout(() => {
                router.push("/admin/news");
                router.refresh();
            }, 1500);
        } catch (error: any) {
            toast.error(error.message || "Failed to update news");
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Toaster position="top-right" />
            <form onSubmit={handleSubmit}>
                <div className="row">

                    {/* Title - REQUIRED */}
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>News Title <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                name="title"
                                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                                placeholder="Enter news title"
                                value={formData.title}
                                onChange={handleChange}
                                disabled={isSubmitting}
                            />
                            {errors.title && <div className="invalid-feedback d-block">{errors.title}</div>}
                        </div>
                    </div>

                    {/* Category - REQUIRED */}
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Category <span className="text-danger">*</span></label>
                            <select
                                name="category_id"
                                className={`form-control ${errors.category_id ? "is-invalid" : ""}`}
                                value={formData.category_id}
                                onChange={handleChange}
                                disabled={isSubmitting}
                            >
                                <option value={0}>-- Select a category --</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                            {errors.category_id && <div className="invalid-feedback d-block">{errors.category_id}</div>}
                        </div>
                    </div>

                    {/* Description - REQUIRED */}
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Description <span className="text-danger">*</span></label>
                            <textarea
                                name="description"
                                className={`form-control ${errors.description ? "is-invalid" : ""}`}
                                placeholder="Enter news description"
                                rows={4}
                                value={formData.description}
                                onChange={handleChange}
                                disabled={isSubmitting}
                            />
                            {errors.description && <div className="invalid-feedback d-block">{errors.description}</div>}
                        </div>
                    </div>

                    {/* From Date - REQUIRED */}
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>From Date <span className="text-danger">*</span></label>
                            <input
                                type="date"
                                name="from_date"
                                className={`form-control ${errors.from_date ? "is-invalid" : ""}`}
                                value={formData.from_date}
                                onChange={handleChange}
                                disabled={isSubmitting}
                            />
                            {errors.from_date && <div className="invalid-feedback d-block">{errors.from_date}</div>}
                        </div>
                    </div>

                    {/* To Date - REQUIRED */}
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>To Date <span className="text-danger">*</span></label>
                            <input
                                type="date"
                                name="to_date"
                                className={`form-control ${errors.to_date ? "is-invalid" : ""}`}
                                value={formData.to_date}
                                min={formData.from_date || undefined}
                                onChange={handleChange}
                                disabled={isSubmitting || !formData.from_date}
                            />
                            {!formData.from_date && (
                                <small className="text-muted">Select From Date first</small>
                            )}
                            {errors.to_date && <div className="invalid-feedback d-block">{errors.to_date}</div>}
                        </div>
                    </div>

                    {/* Tags - OPTIONAL */}
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Tags <small className="text-muted">(Press Enter or comma to add)</small></label>
                            <input
                                type="text"
                                name="tagInput"
                                className="form-control"
                                placeholder="Type a tag and press Enter"
                                value={formData.tagInput}
                                onChange={handleChange}
                                onKeyDown={handleTagKeyDown}
                                disabled={isSubmitting}
                            />
                            {formData.tags.length > 0 && (
                                <div className="mt-2 d-flex flex-wrap gap-2">
                                    {formData.tags.map((tag) => (
                                        <span key={tag} className="badge bg-secondary d-flex align-items-center gap-1">
                                            {tag}
                                            <button
                                                type="button"
                                                className="btn-close btn-close-white"
                                                style={{ fontSize: "0.6rem" }}
                                                onClick={() => handleRemoveTag(tag)}
                                            />
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Image - OPTIONAL */}
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Image <small className="text-muted">(Optional, max 5MB)</small></label>
                            <input
                                type="file"
                                className="form-control"
                                accept="image/*"
                                onChange={handleImageSelect}
                                disabled={isSubmitting}
                            />
                            {imagePreview && (
                                <div className="mt-3">
                                    <div className="position-relative d-inline-block">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="img-thumbnail"
                                            style={{ maxWidth: "200px", maxHeight: "200px", objectFit: "cover" }}
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm position-absolute"
                                            style={{ top: "5px", right: "5px" }}
                                            onClick={handleRemoveImage}
                                            disabled={isSubmitting}
                                        >
                                            <i className="far fa-times" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Published - OPTIONAL */}
                    <div className="col-md-12">
                        <div className="form-group">
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    name="published"
                                    className="form-check-input"
                                    id="published"
                                    checked={formData.published}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                />
                                <label className="form-check-label" htmlFor="published">
                                    Publish immediately
                                </label>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="row mt-4">
                    <div className="col text-start">
                        <Link
                            href="/admin/news"
                            className="theme-btn"
                            style={{ opacity: isSubmitting ? 0.5 : 1 }}
                            onClick={(e) => {
                                if (isSubmitting) {
                                    e.preventDefault();
                                    toast.error("Please wait for the current operation to complete");
                                }
                            }}
                        >
                            <span className="far fa-arrow-left" /> Back
                        </Link>
                    </div>

                    <div className="col text-end">
                        <button
                            type="submit"
                            className="theme-btn"
                            disabled={isSubmitting || !isFormValid}
                            style={{
                                opacity: !isFormValid || isSubmitting ? 0.65 : 1,
                                cursor: !isFormValid || isSubmitting ? "not-allowed" : "pointer",
                            }}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" />
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <span className="far fa-save" /> Update News
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}