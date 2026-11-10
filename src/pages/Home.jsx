import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";
import Hero from "../components/Hero.jsx";
import ProductCard from "../components/ProductCard.jsx";
import CategoryNav from "../components/CategoryNav.jsx";

const communityLinks = [
  { label: "Our community", href: "/our-community" },
  { label: "Birthdays", href: "/birthdays" },
  { label: "The gallery", href: "/gallery" },
  { label: "Where are they now?", href: "/where-are-they-now" },
  { label: "Forms & documents", href: "/forms-documents" },
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const { data } = await api.get("/products");
        setProducts(data.products);
      } catch (err) {
        console.error("Failed to load products:", err.message);
      } finally {
        setLoading(false);
      }
    };
    loadFeatured();
  }, []);

  const availableProducts = products.filter((product) => product.stockQuantity > 0);
  const featuredProducts = availableProducts.filter((product) => product.isFeatured).slice(0, 4);
  const discoveryProducts = featuredProducts.length ? featuredProducts : availableProducts.slice(0, 4);

  return (
    <div>
      <Hero />
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-dark">Picked for you</p>
            <h2 className="text-2xl font-bold text-forest-dark">Featured products</h2>
          </div>
          <Link to="/products?category=featured" className="text-sm font-semibold text-gold-dark hover:underline">
            View all <span aria-hidden="true">→</span>
          </Link>
        </div>

        {loading ? (
          <p className="py-8 text-sm text-forest-dark/60">Loading featured products…</p>
        ) : discoveryProducts.length ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
            {discoveryProducts.map((product) => <ProductCard key={product._id} product={product} />)}
          </div>
        ) : (
          <p className="py-8 text-sm text-forest-dark/60">No products are available right now. Check back soon.</p>
        )}
      </section>

      <CategoryNav />

      <section className="mx-auto max-w-7xl px-6 pb-10">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-dark">Fresh from the community</p>
            <h2 className="text-2xl font-bold text-forest-dark">All marketplace finds</h2>
          </div>
          <Link to="/products" className="text-sm font-semibold text-gold-dark hover:underline">Browse all</Link>
        </div>
        {products.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
            {availableProducts.slice(0, 8).map((product) => <ProductCard key={product._id} product={product} />)}
          </div>
        )}
      </section>

      <section className="border-y border-forest/10 bg-[#f5f1e8]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-dark">Beyond the marketplace</p>
            <h2 className="mt-1 text-xl font-bold text-forest-dark">Stay close to the community</h2>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {communityLinks.map((item) => (
              <Link key={item.href} to={item.href} className="text-sm font-semibold text-forest-dark hover:text-gold-dark hover:underline">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
