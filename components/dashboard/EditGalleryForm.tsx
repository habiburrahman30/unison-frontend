"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { GalleryItem } from "@/lib/api/gallery";

interface Props {
    item: GalleryItem;
}

export default function EditGalleryForm({ item }: Props) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(item.image);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [formData, setFormData] = useState({
        title: item.title,
        description: item.description || "",
        image: item.image,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
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
        if (errors.image) setErrors((prev) => ({ ...prev, image: "" }));
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result as string);
        reader.readAsDataURL(file);
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
        setSelectedFile(null);
        setFormData((prev) => ({ ...prev, image: "" }));
        setErrors((prev) => ({ ...prev, image: "Image is required" }));
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) fileInput.value = "";
    };

    const uploadImage = async (file: File): Promise<string> => {
        const uploadFormData = new FormData();
        uploadFormData.append("file", file);

        const response = await fetch("/api/upload/gallery", {
            method: "POST",
            body: uploadFormData,
        });

        const contentType = response.headers.get("content-type");
        if (!contentType?.includes("application/json")) {
            throw new Error(`Server error: ${response.status}`);
        }

        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Failed to upload image");
        return result.data.url;
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.title.trim()) newErrors.title = "Title is required";
        if (!formData.image && !selectedFile) newErrors.image = "Image is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const isFormValid = formData.title.trim().length > 0 && (!!formData.image || !!selectedFile);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        let uploadedImageUrl = formData.image;

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

            const payload = {
                title: formData.title.trim(),
                description: formData.description.trim() || null,
                image: uploadedImageUrl,
            };

            const response = await fetch(`/api/gallery/${item.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Failed to update gallery item");

            toast.success("Gallery image updated successfully!");
            setTimeout(() => {
                router.push("/admin/gallery");
                router.refresh();
            }, 1500);
        } catch (error: any) {
            toast.error(error.message || "Failed to update gallery image");
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Toaster position="top-right" />
            <form onSubmit={handleSubmit}>
                <div className="row">

                    {/* Title */}
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Title <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                name="title"
                                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                                placeholder="Enter image title"
                                value={formData.title}
                                onChange={handleChange}
                                disabled={isSubmitting}
                            />
                            {errors.title && <div className="invalid-feedback d-block">{errors.title}</div>}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Description <small className="text-muted">(Optional)</small></label>
                            <textarea
                                name="description"
                                className="form-control"
                                placeholder="Enter description (optional)"
                                rows={3}
                                value={formData.description}
                                onChange={handleChange}
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    {/* Image */}
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>
                                Image <span className="text-danger">*</span>
                                <small className="text-muted ms-1">(Max 5MB)</small>
                            </label>
                            <input
                                type="file"
                                className={`form-control ${errors.image ? "is-invalid" : ""}`}
                                accept="image/*"
                                onChange={handleImageSelect}
                                disabled={isSubmitting}
                            />
                            {errors.image && <div className="invalid-feedback d-block">{errors.image}</div>}

                            {imagePreview && (
                                <div className="mt-3">
                                    <div className="position-relative d-inline-block">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="img-thumbnail"
                                            style={{
                                                width: "150px",
                                                height: "120px",
                                                objectFit: "cover",
                                                borderRadius: "4px",
                                            }}
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

                </div>

                <div className="row mt-4">
                    <div className="col text-start">
                        <Link
                            href="/admin/gallery"
                            className="theme-btn"
                            style={{ opacity: isSubmitting ? 0.5 : 1 }}
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
                                <><span className="spinner-border spinner-border-sm me-2" />Updating...</>
                            ) : (
                                <><span className="far fa-save" /> Update Image</>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}