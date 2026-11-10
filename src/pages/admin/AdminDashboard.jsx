import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios.js";

const statusColor = {
  draft: "bg-gray-100 text-gray-700",
  pending: "bg-yellow-100 text-yellow-800",
  published: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-700",
};

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = () => {
    setLoading(true);
    api.get("/products/admin/all").then(({ data }) => setProducts(data)).finally(() => setLoading(false));
  };

  useEffect(loadProducts, []);

  const handlePublish = async (id) => {
    await api.patch(`/products/${id}/publish`);
    loadProducts();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this listing permanently?")) return;
    await api.delete(`/products/${id}`);
    loadProducts();
  };

  const stats = {
    total: products.length,
    published: products.filter((p) => p.status === "published").length,
    pending: products.filter((p) => p.status === "pending").length,
    featured: products.filter((p) => p.isFeatured).length,
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-gold-dark">Operations</p>
          <h1 className="text-3xl font-bold text-forest-dark">Admin Dashboard</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/admin/orders" className="inline-flex min-h-11 items-center justify-center rounded-lg border border-forest/15 bg-white px-5 font-bold text-forest-dark transition hover:bg-cream">
            Orders &amp; payments
          </Link>
          <Link to="/admin/products/new" className="inline-flex min-h-11 items-center justify-center rounded-lg bg-gold px-5 font-bold text-forest-dark transition hover:bg-gold-dark">
            + New listing
          </Link>
        </div>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-4">
        {[
          { label: "Total listings", value: stats.total },
          { label: "Published", value: stats.published },
          { label: "Pending review", value: stats.pending },
          { label: "Featured", value: stats.featured },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl border border-forest/10 bg-white p-5 shadow-[0_12px_28px_rgba(17,32,24,0.04)]">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-forest-dark/55">{item.label}</p>
            <p className="mt-3 text-3xl font-bold text-forest-dark">{item.value}</p>
          </div>
        ))}
      </div>

      {loading ? (
        <p className="text-forest-dark/60">Loading…</p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-forest/10 bg-white shadow-[0_18px_40px_rgba(17,32,24,0.04)]">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-cream-dark text-forest-dark/70 text-left">
                <tr>
                  <th className="px-4 py-3">Listing</th>
                  <th className="px-4 py-3">Seller</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id} className="border-t border-forest/5 align-top">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-forest-dark">{p.title}</div>
                      {p.isFeatured && (
                        <span className="mt-2 inline-flex rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.15em] text-gold-dark">
                          Featured
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-forest-dark/80">{p.memberName}</td>
                    <td className="px-4 py-3 text-forest-dark/80">{p.category?.name || "Uncategorized"}</td>
                    <td className="px-4 py-3 font-semibold text-forest-dark">₦{Number(p.price || 0).toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusColor[p.status] || "bg-gray-100 text-gray-700"}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-3">
                        {p.status !== "published" && (
                          <button onClick={() => handlePublish(p._id)} className="font-semibold text-green-700 hover:text-green-800">
                            Publish
                          </button>
                        )}
                        <button onClick={() => handleDelete(p._id)} className="font-semibold text-red-600 hover:text-red-700">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
