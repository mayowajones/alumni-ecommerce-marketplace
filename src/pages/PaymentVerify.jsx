import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import api from "../api/axios.js";
import { useCart } from "../context/CartContext.jsx";

// Paystack redirects the shopper back to this page with ?reference=xxx
// after they complete (or cancel) payment on their hosted checkout.
const PaymentVerify = () => {
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const reference = searchParams.get("reference");
  const demoOrderId = searchParams.get("demoOrderId");
  const [status, setStatus] = useState("verifying"); // verifying | success | failed
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (demoOrderId) {
      api
        .get(`/orders/demo/${encodeURIComponent(demoOrderId)}`)
        .then(({ data }) => {
          setOrder(data);
          setStatus("demo");
          clearCart();
        })
        .catch((err) => {
          setStatus("failed");
          setError(err.response?.data?.message || "We could not load this demo order.");
        });
      return;
    }

    if (!reference) {
      setStatus("failed");
      setError("No payment reference found in the URL.");
      return;
    }

    api
      .get(`/payments/verify/${reference}`)
      .then(({ data }) => {
        setOrder(data.order);
        setStatus("success");
        clearCart();
      })
      .catch((err) => {
        setStatus("failed");
        setError(err.response?.data?.message || "We could not verify this payment.");
      });
  }, [reference, demoOrderId, clearCart]);

  if (status === "verifying") {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <p className="text-forest-dark/60">Confirming your payment…</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <div className="text-5xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-forest-dark mb-3">Payment not confirmed</h1>
        <p className="text-forest-dark/60 mb-8">{error}</p>
        <Link to="/products" className="bg-gold text-forest-dark font-bold px-6 py-3 rounded">
          Back to shopping
        </Link>
      </div>
    );
  }

  if (status === "demo") {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <h1 className="text-2xl font-bold text-forest-dark mb-3">Demo order recorded</h1>
        <p className="text-forest-dark/60 mb-2">Order reference: <strong>{order?._id}</strong></p>
        <p className="text-forest-dark/60 mb-2">Order total: <strong>{new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(order?.totalAmount || 0)}</strong></p>
        <p role="status" className="text-amber-800 mb-8">This is a demonstration order. No payment was processed.</p>
        <Link to="/products" className="inline-flex min-h-11 items-center rounded bg-gold px-6 font-bold text-forest-dark">Continue shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-24 text-center">
      <div className="text-5xl mb-4">✅</div>
      <h1 className="text-2xl font-bold text-forest-dark mb-3">Payment successful</h1>
      <p className="text-forest-dark/60 mb-2">Order reference: <strong>{order?._id}</strong></p>
      <p className="text-forest-dark/60 mb-2">Amount paid: <strong>{new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(order?.totalAmount || order?.itemsTotal || 0)}</strong></p>
      <p className="text-forest-dark/60 mb-8">Your payment is verified and the order is recorded. You can follow its status from your account.</p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link to="/account/orders" className="inline-flex min-h-11 items-center rounded bg-gold px-6 font-bold text-forest-dark">View my orders</Link>
        <Link to="/products" className="inline-flex min-h-11 items-center rounded border border-forest/15 px-6 font-bold text-forest-dark">Continue shopping</Link>
      </div>
    </div>
  );
};

export default PaymentVerify;
