"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createProduct } from "@/lib/api/products";
import toast, { Toaster } from "react-hot-toast";
import { slugify } from "@/lib/slugify";

export default function CreateProductPage() {
    const router = useRouter();
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        manufacturer: "",
        country_of_origin: "",
        product_url: "",
        product_description: "",
        technical_description: "",
        price: "",
        old_price: "",
        stock: "0",
        is_trending: false,
        images: [""],
        category_id: "",
        brand_id: "",
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

    const handleImageChange = (index: number, value: string) => {
        const newImages = [...formData.images];
        newImages[index] = value;
        setFormData((prev) => ({ ...prev, images: newImages }));
    };

    const addImageField = () => {
        setFormData((prev) => ({
            ...prev,
            images: [...prev.images, ""],
        }));
    };

    const removeImageField = (index: number) => {
        const newImages = formData.images.filter((_, i) => i !== index);
        setFormData((prev) => ({
            ...prev,
            images: newImages.length > 0 ? newImages : [""],
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Validate required fields
            if (
                !formData.name ||
                !formData.manufacturer ||
                !formData.country_of_origin ||
                !formData.product_url ||
                !formData.product_description ||
                !formData.price ||
                !formData.category_id ||
                !formData.brand_id
            ) {
                toast.error("Please fill in all required fields");
                setIsSubmitting(false);
                return;
            }

            // Prepare data
            const productData = {
                name: formData.name,
                slug: slugify(formData.name),
                manufacturer: formData.manufacturer,
                country_of_origin: formData.country_of_origin,
                product_url: formData.product_url,
                product_description: formData.product_description,
                technical_description: formData.technical_description || undefined,
                price: parseFloat(formData.price),
                old_price: formData.old_price ? parseFloat(formData.old_price) : undefined,
                stock: parseInt(formData.stock),
                is_trending: formData.is_trending,
                images: formData.images.filter((img) => img.trim() !== ""),
                category_id: parseInt(formData.category_id),
                brand_id: parseInt(formData.brand_id),
            };

            await createProduct(productData);

            toast.success("Product created successfully!");

            // Redirect after short delay
            setTimeout(() => {
                router.push("/admin/products");
                router.refresh();
            }, 1500);
        } catch (error: any) {
            console.error("Error creating product:", error);
            toast.error(error.message || "Failed to create product");
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        // Fetch categories
        fetch("/api/categories")
            .then((res) => res.json())
            .then((data) => setCategories(data.data || []));

        // Fetch brands
        fetch("/api/brands")
            .then((res) => res.json())
            .then((data) => setBrands(data.data || []));
    }, []);
    return (

        <>
            <div className="row">
                <div className="col-lg-12">
                    <div className="user-card">
                        <h4 className="user-card-title">Add Product</h4>
                        <div className="user-form">
                            <Toaster position="top-right" />
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    {/* Product Name */}
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>
                                                Product Name <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                placeholder="Enter product name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Slug */}
                                    {/* <div className="col-md-6">
                        <div className="form-group">
                            <label>Slug (optional)</label>
                            <input
                                type="text"
                                name="slug"
                                className="form-control"
                                placeholder="product-slug (auto-generated if empty)"
                                value={formData.slug}
                                onChange={handleChange}
                            />
                            <small className="text-muted">
                                Leave empty to auto-generate from product name
                            </small>
                        </div>
                    </div> */}

                                    {/* Manufacturer */}
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>
                                                Manufacturer <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="manufacturer"
                                                className="form-control"
                                                placeholder="Enter manufacturer name"
                                                value={formData.manufacturer}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Country of Origin */}
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>
                                                Country of Origin <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="country_of_origin"
                                                className="form-control"
                                                placeholder="e.g., USA, China, Germany"
                                                value={formData.country_of_origin}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Product URL */}
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>
                                                Product URL <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="url"
                                                name="product_url"
                                                className="form-control"
                                                placeholder="https://example.com/product"
                                                value={formData.product_url}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Product Description */}
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>
                                                Product Description <span className="text-danger">*</span>
                                            </label>
                                            <textarea
                                                name="product_description"
                                                className="form-control"
                                                rows={4}
                                                placeholder="Enter product description"
                                                value={formData.product_description}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Technical Description */}
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Technical Description (optional)</label>
                                            <textarea
                                                name="technical_description"
                                                className="form-control"
                                                rows={3}
                                                placeholder="Enter technical specifications"
                                                value={formData.technical_description}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>
                                                Price <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                name="price"
                                                className="form-control"
                                                placeholder="0.00"
                                                step="0.01"
                                                min="0"
                                                value={formData.price}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Old Price */}
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Old Price (optional)</label>
                                            <input
                                                type="number"
                                                name="old_price"
                                                className="form-control"
                                                placeholder="0.00"
                                                step="0.01"
                                                min="0"
                                                value={formData.old_price}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    {/* Stock */}
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Stock</label>
                                            <input
                                                type="number"
                                                name="stock"
                                                className="form-control"
                                                placeholder="0"
                                                min="0"
                                                value={formData.stock}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    {/* Category */}



                                    {/* Category */}
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>
                                                Category <span className="text-danger">*</span>
                                            </label>

                                            <select name="category_id"
                                                className="form-control"
                                                value={formData.category_id}
                                                onChange={handleChange}
                                                required>
                                                <option value="">Select Category</option>
                                                {categories.map((cat: any) => (
                                                    <option key={cat.id} value={cat.id}>
                                                        {cat.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Brand */}
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>
                                                Brand <span className="text-danger">*</span>
                                            </label>
                                            <select name="brand_id"
                                                className="form-control"
                                                value={formData.brand_id}
                                                onChange={handleChange}
                                                required>
                                                <option value="">Select Brand</option>
                                                {brands.map((brand: any) => (
                                                    <option key={brand.id} value={brand.id}>
                                                        {brand.name}
                                                    </option>
                                                ))}
                                            </select>

                                        </div>
                                    </div>

                                    {/* Images */}
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Product Images</label>
                                            {formData.images.map((image, index) => (
                                                <div key={index} className="mb-2 d-flex gap-2">
                                                    <input
                                                        type="url"
                                                        className="form-control"
                                                        placeholder="https://example.com/image.jpg"
                                                        value={image}
                                                        onChange={(e) => handleImageChange(index, e.target.value)}
                                                    />
                                                    {formData.images.length > 1 && (
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger"
                                                            onClick={() => removeImageField(index)}
                                                        >
                                                            <span className="far fa-trash" />
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                className="btn btn-secondary mt-2"
                                                onClick={addImageField}
                                            >
                                                <span className="far fa-plus" /> Add Image
                                            </button>
                                        </div>
                                    </div>

                                    {/* Is Trending */}
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <div className="form-check">
                                                <input
                                                    type="checkbox"
                                                    name="is_trending"
                                                    className="form-check-input"
                                                    id="is_trending"
                                                    checked={formData.is_trending}
                                                    onChange={handleChange}
                                                />
                                                <label className="form-check-label" htmlFor="is_trending">
                                                    Mark as Trending Product
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mt-4">
                                    <div className="col text-start">
                                        <Link href="/admin/products" className="theme-btn">
                                            <span className="far fa-arrow-left" /> Back
                                        </Link>
                                    </div>

                                    <div className="col text-end">
                                        <button
                                            type="submit"
                                            className="theme-btn"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" />
                                                    Creating...
                                                </>
                                            ) : (
                                                <>
                                                    <span className="far fa-save" /> Create Product
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>


    );
}
