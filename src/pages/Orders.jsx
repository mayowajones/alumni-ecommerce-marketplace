import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";

const formatPrice = (value) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(Number(value) || 0);

const statusStyles = {
  pending: "bg-amber-50 text-amber-900",
  processing: "bg-blue-50 text-blue-800",
  shipped: "bg-indigo-50 text-indigo-800",
  delivered: "bg-green-50 text-green-800",
  cancelled: "bg-red-50 text-red-800",
};

const Orders = ({ adminView = false }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(adminView ? "/orders" : "/orders/mine")
      .then(({ data }) => setOrders(data))
      .catch((requestError) => setError(requestError.response?.data?.message || "Orders could not be loaded."))
      .finally(() => setLoading(false));
  }, [adminView]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-dark">{adminView ? "Operations" : "Your account"}</p>
          <h1 className="mt-1 text-2xl font-bold text-forest-dark">{adminView ? "Orders & payments" : "Your orders"}</h1>
        </div>
        <Link to={adminView ? "/admin" : "/products"} className="text-sm font-semibold text-forest-dark underline underline-offset-4">
          {adminView ? "Back to admin" : "Continue shopping"}
        </Link>
      </div>

      {loading ? <p role="status" className="py-8 text-sm text-forest-dark/60">Loading orders…</p> : null}
      {error ? <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p> : null}
      {!loading && !error && orders.length === 0 ? (
        <div className="rounded-lg border border-forest/10 bg-white px-6 py-12 text-center">
          <h2 className="text-lg font-bold text-forest-dark">No orders yet</h2>
          <p className="mt-2 text-sm text-forest-dark/65">Completed and pending purchases will appear here.</p>
          <Link to="/products" className="mt-5 inline-flex min-h-11 items-center rounded-md bg-gold px-5 font-bold text-forest-dark">Browse products</Link>
        </div>
      ) : null}

      <div className="space-y-4">
        {orders.map((order) => (
          <article key={order._id} className="rounded-lg border border-forest/10 bg-white p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-forest/10 pb-4">
              <div>
                <p className="text-xs text-forest-dark/55">Order placed {new Date(order.createdAt).toLocaleDateString("en-NG", { dateStyle: "medium" })}</p>
                <p className="mt-1 break-all text-sm font-semibold text-forest-dark">Reference: {order.paymentReference || order._id}</p>
                {adminView && order.buyer && <p className="mt-1 text-xs text-forest-dark/65">Buyer: {order.buyer.name} · {order.buyer.email}</p>}
              </div>
              <div className="flex flex-wrap gap-2">
                <span className={`rounded px-2.5 py-1 text-xs font-bold ${statusStyles[order.orderStatus] || "bg-gray-100 text-gray-800"}`}>{order.orderStatus}</span>
                <span className={`rounded px-2.5 py-1 text-xs font-bold ${order.isPaid ? "bg-green-50 text-green-800" : "bg-amber-50 text-amber-900"}`}>{order.isPaid ? "Paid" : "Payment pending"}</span>
              </div>
            </div>

            <ul className="space-y-2 py-4">
              {order.items.map((item, index) => (
                <li key={`${item.product}-${index}`} className="flex justify-between gap-4 text-sm">
                  <span className="text-forest-dark/80">{item.title} <span className="text-forest-dark/55">× {item.quantity}</span></span>
                  <span className="shrink-0 font-medium text-forest-dark">{formatPrice(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>

            <div className="ml-auto max-w-xs space-y-1 border-t border-forest/10 pt-3 text-sm">
              <div className="flex justify-between text-forest-dark/65"><span>Subtotal</span><span>{formatPrice(order.itemsTotal)}</span></div>
              <div className="flex justify-between text-forest-dark/65"><span>Delivery</span><span>{formatPrice(order.deliveryFee)}</span></div>
              <div className="flex justify-between pt-1 font-bold text-forest-dark"><span>Total</span><span>{formatPrice(order.totalAmount || order.itemsTotal + (order.deliveryFee || 0))}</span></div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Orders;
