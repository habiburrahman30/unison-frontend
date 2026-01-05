"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

export default function CreateBrandForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
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
            setImagePreview(null);
            setSelectedFile(null);
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

        toast.success("Logo selected. It will be uploaded when you create the brand.");
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

        const response = await fetch("/api/upload/brand", {
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
            await fetch("/api/upload/brand", {
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

        // Validation - only name is required
        if (!formData.name.trim()) {
            toast.error("Brand name is required");
            return;
        }

        setIsSubmitting(true);
        let uploadedImageUrl: string | null = null;

        try {
            // Step 1: Upload image if selected
            if (selectedFile) {
                const uploadToast = toast.loading("Uploading logo...");
                try {
                    uploadedImageUrl = await uploadImage(selectedFile);
                    setImageUrl(uploadedImageUrl);
                    toast.success("Logo uploaded successfully!", { id: uploadToast });
                } catch (uploadError: any) {
                    toast.error(uploadError.message || "Failed to upload logo", {
                        id: uploadToast,
                    });
                    setIsSubmitting(false);
                    return;
                }
            }

            // Step 2: Create brand
            const brandData = {
                name: formData.name.trim(),
                description: formData.description.trim() || null,
                logo: uploadedImageUrl || null,
            };

            console.log("Creating brand with data:", brandData);

            const response = await fetch("/api/brands", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(brandData),
            });

            const result = await response.json();

            if (!response.ok) {
                // If brand creation failed, delete the uploaded image
                if (uploadedImageUrl) {
                    console.log("Brand creation failed, deleting uploaded logo...");
                    await deleteUploadedImage(uploadedImageUrl);
                }
                throw new Error(result.message || "Failed to create brand");
            }

            toast.success("Brand created successfully!");

            // Redirect after short delay
            setTimeout(() => {
                router.push("/admin/brands");
                router.refresh();
            }, 1500);
        } catch (error: any) {
            console.error("Error creating brand:", error);
            toast.error(error.message || "Failed to create brand");
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
                    {/* Brand Name - REQUIRED */}
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>
                                Brand Name <span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Enter brand name"
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
                                placeholder="Enter brand description (optional)"
                                value={formData.description}
                                onChange={handleChange}
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    {/* Logo Upload - OPTIONAL */}
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Brand Logo</label>
                            <div className="mb-3">
                                <input
                                    type="file"
                                    className="form-control"
                                    accept="image/*"
                                    onChange={handleImageSelect}
                                    disabled={isSubmitting}
                                />
                                <small className="text-muted d-block mt-1">
                                    Optional. Max file size: 5MB. Logo will be uploaded when you create the brand.
                                </small>
                            </div>

                            {/* Image Preview */}
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
                                            title="Remove logo"
                                        >
                                            <i className="far fa-times"></i>
                                        </button>
                                    </div>
                                    <div className="mt-2">
                                        <small className="text-info">
                                            <i className="far fa-info-circle me-1"></i>
                                            Logo ready to upload
                                        </small>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col text-start">
                        <Link
                            href="/admin/brands"
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
                                    Creating Brand...
                                </>
                            ) : (
                                <>
                                    <span className="far fa-save" /> Create Brand
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}