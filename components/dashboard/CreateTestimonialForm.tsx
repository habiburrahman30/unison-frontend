"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";
import { deleteTestimonial, Testimonial } from "@/lib/api/testimonials";
import toast, { Toaster } from "react-hot-toast";

export default function CreateTestimonialForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        designation: "",
        company: "",
        rating: "5",
        message: "",
        isActive: true,
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
            setImagePreview(null);
            setSelectedFile(null);
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

        toast.success("Image selected. It will be uploaded when you create the testimonial.");
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
        setSelectedFile(null);
        setImageUrl(null);
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
        let uploadedImageUrl: string | null = null;

        try {
            // Step 1: Upload image if selected
            if (selectedFile) {
                const uploadToast = toast.loading("Uploading image...");
                try {
                    uploadedImageUrl = await uploadImage(selectedFile);
                    setImageUrl(uploadedImageUrl);
                    toast.success("Image uploaded successfully!", { id: uploadToast });
                } catch (uploadError: any) {
                    toast.error(uploadError.message || "Failed to upload image", {
                        id: uploadToast,
                    });
                    setIsSubmitting(false);
                    return;
                }
            }

            // Step 2: Create testimonial
            const testimonialData = {
                name: formData.name.trim(),
                designation: formData.designation.trim() || null,
                company: formData.company.trim() || null,
                rating: parseInt(formData.rating),
                message: formData.message.trim(),
                image: uploadedImageUrl || null,
                isActive: formData.isActive,
            };

            const response = await fetch("/api/testimonials", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(testimonialData),
            });

            const result = await response.json();

            if (!response.ok) {
                if (uploadedImageUrl) {
                    await deleteUploadedImage(uploadedImageUrl);
                }
                throw new Error(result.message || "Failed to create testimonial");
            }

            toast.success("Testimonial created successfully!");

            setTimeout(() => {
                router.push("/admin/testimonials");
                router.refresh();
            }, 1500);
        } catch (error: any) {
            console.error("Error creating testimonial:", error);
            toast.error(error.message || "Failed to create testimonial");
            setIsSubmitting(false);
        }
    };

    const isFormValid = formData.name.trim().length > 0 && formData.message.trim().length > 0;


    const renderStars = (rating: number) => {
        return (
            <div className="text-warning">
                {[...Array(5)].map((_, i) => (
                    <i
                        key={i}
                        className={`fa${i < rating ? "s" : "r"} fa-star`}
                    ></i>
                ))}
            </div>
        );
    };

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
                                    Optional. Max file size: 5MB.
                                </small>
                            </div>

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
                                        <small className="text-info">
                                            <i className="far fa-info-circle me-1"></i>
                                            Image ready to upload
                                        </small>
                                    </div>
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
                                    name="isActive"
                                    className="form-check-input"
                                    id="isActive"
                                    checked={formData.isActive}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                />
                                <label className="form-check-label" htmlFor="isActive">
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
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <span className="far fa-save" /> Create Testimonial
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}