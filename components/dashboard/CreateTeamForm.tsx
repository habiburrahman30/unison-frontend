"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

export default function CreateTeamForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [formData, setFormData] = useState({
        name: "",
        position: "",
        bio: "",
        email: "",
        phone: "",
        facebook: "",
        linkedin: "",
        twitter: "",
        instagram: "",
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
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result as string);
        reader.readAsDataURL(file);
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
        setSelectedFile(null);
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) fileInput.value = "";
    };

    const uploadImage = async (file: File): Promise<string> => {
        const uploadFormData = new FormData();
        uploadFormData.append("file", file);

        const response = await fetch("/api/upload/teams", {
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
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!selectedFile) newErrors.image = "Profile image is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const isFormValid = formData.name.trim().length > 0 && !!selectedFile;;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        let uploadedImageUrl: string | null = null;

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
                name: formData.name.trim(),
                position: formData.position.trim(),
                bio: formData.bio.trim() || null,
                image: uploadedImageUrl,
                email: formData.email.trim() || null,
                phone: formData.phone.trim() || null,
                social_links: {
                    facebook: formData.facebook.trim() || null,
                    linkedin: formData.linkedin.trim() || null,
                    twitter: formData.twitter.trim() || null,
                    instagram: formData.instagram.trim() || null,
                },
            };

            const response = await fetch("/api/teams", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Failed to create member");

            toast.success("Team member created successfully!");
            setTimeout(() => {
                router.push("/admin/teams");
                router.refresh();
            }, 1500);
        } catch (error: any) {
            toast.error(error.message || "Failed to create team member");
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Toaster position="top-right" />
            <form onSubmit={handleSubmit}>
                <div className="row">

                    {/* Name */}
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Name <span className="text-danger">*</span></label>
                            <input
                                type="text"
                                name="name"
                                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                placeholder="Enter full name"
                                value={formData.name}
                                onChange={handleChange}
                                disabled={isSubmitting}
                            />
                            {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
                        </div>
                    </div>

                    {/* Position */}
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Position</label>
                            <input
                                type="text"
                                name="position"
                                className="form-control"
                                placeholder="Enter position/role"
                                value={formData.position}
                                onChange={handleChange}
                                disabled={isSubmitting}
                            />
                            {errors.position && <div className="invalid-feedback d-block">{errors.position}</div>}
                        </div>
                    </div>

                    {/* Email */}
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="Enter email (optional)"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Phone</label>
                            <input
                                type="text"
                                name="phone"
                                className="form-control"
                                placeholder="Enter phone (optional)"
                                value={formData.phone}
                                onChange={handleChange}
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    {/* Bio */}
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Bio</label>
                            <textarea
                                name="bio"
                                className="form-control"
                                placeholder="Enter bio (optional)"
                                rows={3}
                                value={formData.bio}
                                onChange={handleChange}
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="col-md-6">
                        <div className="form-group">
                            <label><i className="fab fa-facebook me-1" /> Facebook</label>
                            <input
                                type="url"
                                name="facebook"
                                className="form-control"
                                placeholder="https://facebook.com/..."
                                value={formData.facebook}
                                onChange={handleChange}
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <label><i className="fab fa-linkedin me-1" /> LinkedIn</label>
                            <input
                                type="url"
                                name="linkedin"
                                className="form-control"
                                placeholder="https://linkedin.com/in/..."
                                value={formData.linkedin}
                                onChange={handleChange}
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <label><i className="fab fa-x me-1" /> x.com</label>
                            <input
                                type="url"
                                name="twitter"
                                className="form-control"
                                placeholder="https://x.com/..."
                                value={formData.twitter}
                                onChange={handleChange}
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <label><i className="fab fa-instagram me-1" /> Instagram</label>
                            <input
                                type="url"
                                name="instagram"
                                className="form-control"
                                placeholder="https://instagram.com/..."
                                value={formData.instagram}
                                onChange={handleChange}
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    {/* Image */}
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>
                                Profile Image <span className="text-danger">*</span>
                                <small className="text-muted ms-1">(Max 5MB)</small>
                            </label>
                            <input
                                type="file"
                                className={`form-control ${errors.image ? "is-invalid" : ""}`}
                                accept="image/*"
                                onChange={(e) => {
                                    handleImageSelect(e);
                                    if (errors.image) setErrors((prev) => ({ ...prev, image: "" }));
                                }}
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
                                            style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "50%" }}
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm position-absolute"
                                            style={{ top: "0", right: "0" }}
                                            onClick={() => {
                                                handleRemoveImage();
                                                setErrors((prev) => ({ ...prev, image: "Profile image is required" }));
                                            }}
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
                            href="/admin/teams"
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
                                <><span className="spinner-border spinner-border-sm me-2" />Creating...</>
                            ) : (
                                <><span className="far fa-save" /> Add Member</>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}