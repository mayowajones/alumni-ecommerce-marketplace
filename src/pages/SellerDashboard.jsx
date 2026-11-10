import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";

const formatPrice = (value) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(Number(value) || 0);

const SellerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/products/mine")
      .then(({ data }) => setProducts(data))
      .catch((requestError) => setError(requestError.response?.data?.message || "Your listings could not be loaded."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-dark">Seller tools</p>
          <h1 className="mt-1 text-2xl font-bold text-forest-dark">Your listings</h1>
        </div>
        <Link to="/admin/products/new" className="inline-flex min-h-11 items-center rounded-md bg-gold px-5 font-bold text-forest-dark">Add a product</Link>
      </div>

      {error && <p role="alert" className="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
      {loading ? <p role="status" className="py-8 text-sm text-forest-dark/60">Loading your listings…</p> : null}
      {!loading && !error && products.length === 0 ? (
        <div className="rounded-lg border border-forest/10 bg-white px-6 py-12 text-center">
          <h2 className="text-lg font-bold text-forest-dark">No listings yet</h2>
          <p className="mt-2 text-sm text-forest-dark/65">Add a product to submit it for review.</p>
          <Link to="/admin/products/new" className="mt-5 inline-flex min-h-11 items-center rounded-md bg-forest-dark px-5 font-bold text-white">Create a listing</Link>
        </div>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article key={product._id} className="overflow-hidden rounded-lg border border-forest/10 bg-white">
            <div className="aspect-[4/3] bg-[#f4efe6]">
              <img src={product.images?.[0]} alt={product.title} loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <h2 className="line-clamp-2 font-bold text-forest-dark">{product.title}</h2>
                <span className="shrink-0 rounded bg-[#f5f1e8] px-2 py-1 text-xs font-semibold capitalize text-forest-dark">{product.status}</span>
              </div>
              <p className="mt-2 text-lg font-bold text-forest-dark">{formatPrice(product.price)}</p>
              <p className="mt-1 text-xs text-forest-dark/65">{product.stockQuantity} available</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default SellerDashboard;
