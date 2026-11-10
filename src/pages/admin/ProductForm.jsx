import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios.js";
import { useAuth } from "../../context/AuthContext.jsx";

const ProductForm = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: "", description: "", price: "", category: "",
    stockQuantity: 1, memberName: "", memberContact: "", isFeatured: false,
  });
  // Category-specific fields, e.g. { make: "Toyota", year: "2019" } for Cars.
  // Keyed dynamically off whatever attributeSchema the chosen category defines.
  const [attributes, setAttributes] = useState({});
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.get("/categories").then(({ data }) => setCategories(data));
  }, []);

  const selectedCategory = categories.find((c) => c._id === form.category);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Switching category resets attributes — a "Cars" mileage value shouldn't
  // linger if the admin changes their mind to "Clothing".
  const handleCategoryChange = (e) => {
    setForm({ ...form, category: e.target.value });
    setAttributes({});
  };

  const handleAttributeChange = (key, value) =>
    setAttributes((prev) => ({ ...prev, [key]: value }));

  // Show instant thumbnails before the files are actually uploaded.
  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files).slice(0, 5);
    setFiles(selected);
    setPreviews(selected.map((f) => URL.createObjectURL(f)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (files.length === 0) {
      setError("Please attach at least one product image");
      return;
    }

    setSubmitting(true);
    try {
      // 1. Upload the raw image files first, get back their server URLs.
      const formData = new FormData();
      files.forEach((file) => formData.append("images", file));
      const { data: uploadResult } = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // 2. Create the product referencing those uploaded image URLs.
      await api.post("/products", {
        ...form,
        price: Number(form.price),
        stockQuantity: Number(form.stockQuantity),
        isFeatured: Boolean(form.isFeatured),
        images: uploadResult.urls,
        attributes,
      });

      navigate(isAdmin ? "/admin" : "/seller");
    } catch (err) {
      setError(err.response?.data?.message || "Could not create listing");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold text-forest-dark mb-6">Create new listing</h1>
      {error && <p className="bg-red-50 text-red-700 px-4 py-3 rounded mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" placeholder="Product title" required onChange={handleChange}
          className="w-full border border-forest/20 rounded px-4 py-2" />
        <textarea name="description" placeholder="Description" required rows={4} onChange={handleChange}
          className="w-full border border-forest/20 rounded px-4 py-2" />

        <div className="grid grid-cols-2 gap-4">
          <input name="price" type="number" placeholder="Price (₦)" required onChange={handleChange}
            className="border border-forest/20 rounded px-4 py-2" />
          <input name="stockQuantity" type="number" placeholder="Stock quantity" defaultValue={1} onChange={handleChange}
            className="border border-forest/20 rounded px-4 py-2" />
        </div>

        <select name="category" required value={form.category} onChange={handleCategoryChange}
          className="w-full border border-forest/20 rounded px-4 py-2">
          <option value="">Select category</option>
          {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>

        {selectedCategory?.attributeSchema?.length > 0 && (
          <div className="border border-forest/10 rounded p-4 bg-cream-dark/40">
            <p className="text-xs font-semibold uppercase tracking-wide text-forest-dark/60 mb-3">
              {selectedCategory.name} details
            </p>
            <div className="grid grid-cols-2 gap-4">
              {selectedCategory.attributeSchema.map((key) => (
                <input
                  key={key}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={attributes[key] || ""}
                  onChange={(e) => handleAttributeChange(key, e.target.value)}
                  className="border border-forest/20 rounded px-4 py-2 bg-white"
                />
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-forest-dark mb-2">
            Product photos (up to 5)
          </label>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={handleFileChange}
            className="w-full border border-forest/20 rounded px-4 py-2 bg-white"
          />
          {previews.length > 0 && (
            <div className="flex gap-2 mt-3">
              {previews.map((src, i) => (
                <img key={i} src={src} alt="" className="w-16 h-16 object-cover rounded border border-forest/10" />
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input name="memberName" placeholder="Selling alumnus name" required onChange={handleChange}
            className="border border-forest/20 rounded px-4 py-2" />
          <input name="memberContact" placeholder="Alumnus contact" required onChange={handleChange}
            className="border border-forest/20 rounded px-4 py-2" />
        </div>

        <label className="flex items-center gap-3 rounded-xl border border-forest/10 bg-cream-dark/40 px-4 py-3 text-sm font-medium text-forest-dark">
          <input
            type="checkbox"
            checked={Boolean(form.isFeatured)}
            onChange={(e) => setForm((prev) => ({ ...prev, isFeatured: e.target.checked }))}
            className="h-4 w-4 rounded border-forest/20 text-gold focus:ring-gold"
          />
          Mark this listing as a featured item on the storefront
        </label>

        <button type="submit" disabled={submitting}
          className="w-full bg-gold text-forest-dark font-bold px-6 py-3 rounded hover:bg-gold-dark transition disabled:opacity-50">
          {submitting ? "Uploading…" : "Save as pending review"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
