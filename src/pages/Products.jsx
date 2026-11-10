import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axios.js";
import ProductCard from "../components/ProductCard.jsx";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  // The URL is the source of truth for the current filter — this is what
  // lets a homepage category tile (or a bookmarked/shared link) land the
  // customer directly on a pre-filtered view instead of an empty "All" list.
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "";
  const keyword = searchParams.get("keyword") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const sort = searchParams.get("sort") || "featured";
  const page = Math.max(1, Number.parseInt(searchParams.get("page"), 10) || 1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [result, setResult] = useState({ page: 1, pages: 0, total: 0 });

  useEffect(() => {
    api.get("/categories").then(({ data }) => setCategories(data)).catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    const params = {};
    if (category) params.category = category;
    if (keyword) params.keyword = keyword;
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;
    if (sort !== "featured") params.sort = sort;
    params.page = page;

    api
      .get("/products", { params })
      .then(({ data }) => {
        if (!active) return;
        setProducts(data.products);
        setResult({ page: data.page, pages: data.pages, total: data.total });
      })
      .catch((requestError) => {
        if (active) setError(requestError.response?.data?.message || "Products could not be loaded.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [category, keyword, minPrice, maxPrice, sort, page]);

  const updateSearch = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value); else next.delete(key);
    if (key !== "page") next.delete("page");
    setSearchParams(next);
  };

  const clearFilters = () => {
    const next = new URLSearchParams();
    if (keyword) next.set("keyword", keyword);
    setSearchParams(next);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-dark">Alumni marketplace</p>
          <h1 className="mt-1 text-2xl font-bold text-forest-dark sm:text-3xl">Shop the Marketplace</h1>
        </div>
        {!loading && <p className="text-sm text-forest-dark/60">{result.total} {result.total === 1 ? "item" : "items"}</p>}
      </div>

      <div className="mb-7 grid gap-3 rounded-lg border border-forest/10 bg-white p-4 sm:grid-cols-2 lg:grid-cols-6">
        <label className="sm:col-span-2 lg:col-span-2">
          <span className="mb-1 block text-xs font-semibold text-forest-dark/70">Search</span>
          <input
            type="search"
            placeholder="Products, brands, details"
            value={keyword}
            onChange={(event) => updateSearch("keyword", event.target.value)}
            className="min-h-11 w-full rounded-md border border-forest/20 px-3 text-sm outline-none focus:border-gold"
          />
        </label>
        <label>
          <span className="mb-1 block text-xs font-semibold text-forest-dark/70">Category</span>
          <select
            value={category}
            onChange={(event) => updateSearch("category", event.target.value)}
            className="min-h-11 w-full rounded-md border border-forest/20 bg-white px-3 text-sm outline-none focus:border-gold"
          >
            <option value="">All categories</option>
            {categories.map((item) => <option key={item._id} value={item._id}>{item.name}</option>)}
          </select>
        </label>
        <label>
          <span className="mb-1 block text-xs font-semibold text-forest-dark/70">Sort by</span>
          <select
            value={sort}
            onChange={(event) => updateSearch("sort", event.target.value === "featured" ? "" : event.target.value)}
            className="min-h-11 w-full rounded-md border border-forest/20 bg-white px-3 text-sm outline-none focus:border-gold"
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </label>
        <div className="sm:col-span-2 lg:col-span-2">
          <span className="mb-1 block text-xs font-semibold text-forest-dark/70">Price range (NGN)</span>
          <div className="flex gap-2">
            <input
              type="number"
              min="0"
              step="500"
              aria-label="Minimum price in NGN"
              placeholder="Min"
              value={minPrice}
              onChange={(event) => updateSearch("minPrice", event.target.value)}
              className="min-h-11 min-w-0 w-1/2 rounded-md border border-forest/20 px-3 text-sm outline-none focus:border-gold"
            />
            <input
              type="number"
              min="0"
              step="500"
              aria-label="Maximum price in NGN"
              placeholder="Max"
              value={maxPrice}
              onChange={(event) => updateSearch("maxPrice", event.target.value)}
              className="min-h-11 min-w-0 w-1/2 rounded-md border border-forest/20 px-3 text-sm outline-none focus:border-gold"
            />
          </div>
        </div>
        {(category || minPrice || maxPrice || sort !== "featured") && (
          <button type="button" onClick={clearFilters} className="justify-self-start text-sm font-semibold text-forest-dark underline underline-offset-4 lg:col-span-6">
            Clear filters
          </button>
        )}
      </div>

      {error && <p role="alert" className="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
      {loading ? (
        <p role="status" className="py-8 text-sm text-forest-dark/60">Loading products…</p>
      ) : !error && products.length === 0 ? (
        <div className="border-y border-forest/10 py-12 text-center">
          <h2 className="text-lg font-bold text-forest-dark">No products found</h2>
          <p className="mt-2 text-sm text-forest-dark/60">Try changing your search or price range.</p>
        </div>
      ) : !error ? (
        <>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {products.map((product) => <ProductCard key={product._id} product={product} />)}
          </div>
          {result.pages > 1 && (
            <nav aria-label="Product pages" className="mt-8 flex items-center justify-center gap-4">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => updateSearch("page", String(page - 1))}
                className="min-h-10 rounded-md border border-forest/20 px-4 text-sm font-semibold text-forest-dark disabled:cursor-not-allowed disabled:opacity-40"
              >Previous</button>
              <span className="text-sm text-forest-dark/70">Page {result.page} of {result.pages}</span>
              <button
                type="button"
                disabled={page >= result.pages}
                onClick={() => updateSearch("page", String(page + 1))}
                className="min-h-10 rounded-md border border-forest/20 px-4 text-sm font-semibold text-forest-dark disabled:cursor-not-allowed disabled:opacity-40"
              >Next</button>
            </nav>
          )}
        </>
      ) : null}
    </div>
  );
};

export default Products;
