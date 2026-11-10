import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { useCart } from "../context/CartContext.jsx";

const formatPrice = (value) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(value);

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    api.get(`/products/${id}`)
      .then(({ data }) => {
        if (active) setProduct(data);
      })
      .catch((requestError) => {
        if (active) setError(requestError.response?.data?.message || "We could not load this product.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [id]);

  if (loading) return <p role="status" className="mx-auto max-w-7xl px-6 py-16 text-forest-dark/60">Loading product details…</p>;
  if (error || !product) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-forest-dark">Product unavailable</h1>
        <p className="mt-3 text-forest-dark/65">{error || "This listing may have been removed."}</p>
        <Link to="/products" className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-gold px-5 font-bold text-forest-dark">Back to marketplace</Link>
      </div>
    );
  }

  const fallbackImage = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80";
  const images = product.images?.length ? product.images : [fallbackImage];
  const outOfStock = Number(product.stockQuantity) < 1;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <nav aria-label="Breadcrumb" className="mb-5 text-sm text-forest-dark/60">
        <Link to="/products" className="hover:text-forest-dark hover:underline">Marketplace</Link>
        <span className="px-2" aria-hidden="true">/</span>
        <span className="text-forest-dark" aria-current="page">{product.title}</span>
      </nav>
      <div className="grid gap-6 md:grid-cols-2 md:gap-10">
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg border border-forest/10 bg-white">
            <img
              src={images[selectedImage] || fallbackImage}
              alt={product.title}
              onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = fallbackImage; }}
              className="h-full w-full object-contain"
              fetchPriority="high"
            />
          </div>

          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {images.map((image, index) => (
                <button
                  type="button"
                  key={`${image}-${index}`}
                  onClick={() => setSelectedImage(index)}
                  aria-label={`View product image ${index + 1}`}
                  aria-pressed={selectedImage === index}
                  className={`h-20 w-20 shrink-0 overflow-hidden rounded-md border-2 bg-white ${selectedImage === index ? "border-forest-dark" : "border-forest/10"}`}
                >
                  <img src={image} alt="" loading="lazy" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-lg border border-forest/10 bg-white p-5 sm:p-7">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold-dark">
            {product.category?.name || "Marketplace"}
          </span>

          <h1 className="mt-3 text-3xl font-bold text-forest-dark md:text-4xl">{product.title}</h1>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-y border-forest/10 py-4">
            <p className="text-3xl font-bold text-forest-dark">{formatPrice(product.price)}</p>
            <span className={`rounded px-3 py-2 text-xs font-bold ${outOfStock ? "bg-red-50 text-red-800" : product.stockQuantity <= 3 ? "bg-amber-50 text-amber-900" : "bg-green-50 text-green-800"}`}>
              {outOfStock ? "Out of stock" : product.stockQuantity <= 3 ? `Only ${product.stockQuantity} left` : "In stock"}
            </span>
          </div>

          <p className="mt-6 leading-relaxed text-forest-dark/70">{product.description}</p>

          {product.attributes && Object.keys(product.attributes).length > 0 && (
            <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {Object.entries(product.attributes instanceof Map ? Object.fromEntries(product.attributes) : product.attributes).map(([key, value]) => (
                <div key={key} className="rounded-xl bg-[#f7f2ea] p-3">
                  <dt className="capitalize text-forest-dark/55">{key}</dt>
                  <dd className="mt-1 font-semibold text-forest-dark">{value}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-6 border-y border-forest/10 py-4 text-sm">
            <p className="text-forest-dark/60">Seller</p>
            <p className="mt-1 font-semibold text-forest-dark">{product.memberName || "Alumni seller"}</p>
          </div>

          <div className="mt-4 rounded-md bg-[#f7f2ea] p-4 text-sm leading-6 text-forest-dark/75">
            <p className="font-bold text-forest-dark">Delivery information</p>
            <p>Delivery fee is shown in your order summary before payment. Delivery arrangements and timing will be confirmed after your order is placed.</p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              type="number"
              aria-label="Quantity"
              min="1"
              max={product.stockQuantity}
              value={quantity}
              onChange={(e) => setQuantity(Math.min(Number(product.stockQuantity) || 1, Math.max(1, Number(e.target.value) || 1)))}
              className="min-h-12 w-full max-w-[120px] rounded-md border border-forest/15 bg-[#f7f2ea] px-3 py-3 text-center text-lg font-semibold text-forest-dark outline-none focus:border-gold"
            />
            <button
              onClick={() => {
                addItem(product, quantity);
                navigate("/cart");
              }}
              disabled={outOfStock}
              className="min-h-12 flex-1 rounded-md bg-gold px-6 py-3 text-base font-bold text-forest-dark transition hover:bg-[#e9bd6f] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {outOfStock ? "Out of stock" : "Add to cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
