"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

interface Testimonial {
    id: number;
    name: string;
    designation: string | null;
    company: string | null;
    rating: number;
    message: string;
    image: string | null;
    is_active: boolean;
}

interface Props {
    testimonial: Testimonial;
}

export default function EditTestimonialForm({ testimonial }: Props) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(testimonial.image);
    const [imageUrl, setImageUrl] = useState<string | null>(testimonial.image);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [oldImageUrl, setOldImageUrl] = useState<string | null>(testimonial.image);
    const [formData, setFormData] = useState({
        name: testimonial.name,
        designation: testimonial.designation || "",
        company: testimonial.company || "",
        rating: testimonial.rating.toString(),
        message: testimonial.message,
        is_active: testimonial.is_active,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;

        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData((prev) => ({ ...prev, [name]: checked }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) {
            return;
        }

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
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) fileInput.value = "";
    };

    const uploadImage = async (file: File): Promise<string> => {
        const uploadFormData = new FormData();
        uploadFormData.append("file", file);

        const response = await fetch("/api/upload/testimonial", {
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
            await fetch("/api/upload/testimonial", {
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

        if (!formData.name.trim() || !formData.message.trim()) {
            toast.error("Name and message are required");
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

            // Step 2: Update testimonial
            const testimonialData = {
                name: formData.name.trim(),
                designation: formData.designation.trim() || null,
                company: formData.company.trim() || null,
                rating: parseInt(formData.rating),
                message: formData.message.trim(),
                image: newImageUrl || null,
                is_active: formData.is_active,
            };

            console.log("Updating testimonial with data:", testimonialData);

            const response = await fetch(`/api/testimonials/${testimonial.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(testimonialData),
            });

            const result = await response.json();

            if (!response.ok) {
                // If update failed and we uploaded a new image, delete it
                if (selectedFile && newImageUrl) {
                    console.log("Update failed, deleting newly uploaded image...");
                    await deleteUploadedImage(newImageUrl);
                }
                throw new Error(result.message || "Failed to update testimonial");
            }

            // Step 3: Delete old image if a new one was uploaded
            if (selectedFile && oldImageUrl && oldImageUrl !== newImageUrl) {
                console.log("Deleting old image:", oldImageUrl);
                await deleteUploadedImage(oldImageUrl);
            }

            toast.success("Testimonial updated successfully!");

            setTimeout(() => {
                router.push("/admin/testimonials");
                router.refresh();
            }, 1500);
        } catch (error: any) {
            console.error("Error updating testimonial:", error);
            toast.error(error.message || "Failed to update testimonial");
            setIsSubmitting(false);
        }
    };

    const isFormValid = formData.name.trim().length > 0 && formData.message.trim().length > 0;

    return (
        <>
            <Toaster position="top-right" />
            <form onSubmit={handleSubmit}>
                <div className="row">
                    {/* Name */}
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>
                                Name <span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Enter client name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    {/* Designation */}
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Designation</label>
                            <input
                                type="text"
                                name="designation"
                                className="form-control"
                                placeholder="Enter designation (optional)"
                                value={formData.designation}
                                onChange={handleChange}
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    {/* Company */}
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Company</label>
                            <input
                                type="text"
                                name="company"
                                className="form-control"
                                placeholder="Enter company name (optional)"
                                value={formData.company}
                                onChange={handleChange}
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    {/* Rating */}
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Rating</label>
                            <select
                                name="rating"
                                className="form-control"
                                value={formData.rating}
                                onChange={handleChange}
                                disabled={isSubmitting}
                            >
                                <option value="5">5 Stars</option>
                                <option value="4">4 Stars</option>
                                <option value="3">3 Stars</option>
                                <option value="2">2 Stars</option>
                                <option value="1">1 Star</option>
                            </select>
                        </div>
                    </div>

                    {/* Message */}
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>
                                Testimonial Message <span className="text-danger">*</span>
                            </label>
                            <textarea
                                name="message"
                                className="form-control"
                                rows={5}
                                placeholder="Enter testimonial message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    {/* Image */}
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Client Photo</label>
                            <div className="mb-3">
                                <input
                                    type="file"
                                    className="form-control"
                                    accept="image/*"
                                    onChange={handleImageSelect}
                                    disabled={isSubmitting}
                                />
                                <small className="text-muted d-block mt-1">
                                    Optional. Max file size: 5MB. Select a new image to replace the current one.
                                </small>
                            </div>

                            {/* Current/Preview Image */}
                            {imagePreview && (
                                <div className="mt-3">
                                    <div className="position-relative d-inline-block">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="img-thumbnail rounded-circle"
                                            style={{
                                                width: "100px",
                                                height: "100px",
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

                    {/* Is Active */}
                    <div className="col-md-12">
                        <div className="form-group">
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    name="is_active"
                                    className="form-check-input"
                                    id="is_active"
                                    checked={formData.is_active}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                />
                                <label className="form-check-label" htmlFor="is_active">
                                    Active (Show on website)
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col text-start">
                        <Link
                            href="/admin/testimonials"
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
                            className={`theme-btn ${!isFormValid ? "btn-secondary" : ""}`}
                            disabled={isSubmitting || !isFormValid}
                            style={{
                                backgroundColor: !isFormValid
                                    ? "#6c757d"
                                    : isSubmitting
                                        ? "#0d6efd"
                                        : "",
                                borderColor: !isFormValid ? "#6c757d" : "",
                                cursor: !isFormValid || isSubmitting ? "not-allowed" : "pointer",
                                opacity: !isFormValid ? 0.65 : 1,
                            }}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" />
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <span className="far fa-save" /> Update Testimonial
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}