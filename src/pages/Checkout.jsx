import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { useCart } from "../context/CartContext.jsx";

const formatPrice = (value) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(value);

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", phone: "", address: "", city: "", state: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [feeLoaded, setFeeLoaded] = useState(false);
  const [feeError, setFeeError] = useState("");

  useEffect(() => {
    api.get("/orders/delivery-fee")
      .then(({ data }) => setDeliveryFee(Number(data.deliveryFee) || 0))
      .catch(() => setFeeError("Delivery pricing is temporarily unavailable. Please try again shortly."))
      .finally(() => setFeeLoaded(true));
  }, []);

  useEffect(() => {
    if (items.length === 0) navigate("/cart", { replace: true });
  }, [items.length, navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      // 1. Create the order in "unpaid" state — stock is reserved here.
      const { data: order } = await api.post("/orders", {
        items: items.map((i) => ({ product: i.product, quantity: i.quantity })),
        shippingAddress: form,
        paymentMethod: "paystack",
      });

      if (order.isDemoOrder) {
        clearCart();
        navigate(`/payment/verify?demoOrderId=${encodeURIComponent(order._id)}`);
        return;
      }

      // 2. Ask our backend to open a Paystack transaction for this order.
      //    The amount is read from the order server-side — never sent by us.
      const { data: payment } = await api.post("/payments/initialize", {
        orderId: order._id,
      });

      // Keep the cart until payment verification succeeds so a declined or
      // abandoned payment does not discard the shopper's saved items.
      window.location.href = payment.authorizationUrl;
    } catch (err) {
      setError(err.response?.data?.message || "Checkout failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-dark">Checkout</p>
        <h1 className="mt-3 text-3xl font-bold text-forest-dark">Complete your order</h1>
      </div>

      {error && <p className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <form onSubmit={handleSubmit} className="rounded-lg border border-forest/10 bg-white p-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:p-6">
          <div className="sm:col-span-2">
            <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-forest-dark/80">Full name</label>
            <input id="fullName" name="fullName" autoComplete="name" placeholder="Your full name" required onChange={handleChange}
              className="min-h-12 w-full rounded-lg border border-forest/20 bg-[#f7f2ea] px-4 py-3 text-forest-dark outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30" />
          </div>

          <div>
            <label htmlFor="phone" className="mb-2 block text-sm font-medium text-forest-dark/80">Phone number</label>
            <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="0803 000 0000" required onChange={handleChange}
              className="min-h-12 w-full rounded-lg border border-forest/20 bg-[#f7f2ea] px-4 py-3 text-forest-dark outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30" />
          </div>

          <div>
            <label htmlFor="city" className="mb-2 block text-sm font-medium text-forest-dark/80">City</label>
            <input id="city" name="city" autoComplete="address-level2" placeholder="City" required onChange={handleChange}
              className="min-h-12 w-full rounded-lg border border-forest/20 bg-[#f7f2ea] px-4 py-3 text-forest-dark outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30" />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="address" className="mb-2 block text-sm font-medium text-forest-dark/80">Delivery address</label>
            <input id="address" name="address" autoComplete="street-address" placeholder="Street address" required onChange={handleChange}
              className="min-h-12 w-full rounded-lg border border-forest/20 bg-[#f7f2ea] px-4 py-3 text-forest-dark outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30" />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="state" className="mb-2 block text-sm font-medium text-forest-dark/80">State</label>
            <input id="state" name="state" autoComplete="address-level1" placeholder="State" required onChange={handleChange}
              className="min-h-12 w-full rounded-lg border border-forest/20 bg-[#f7f2ea] px-4 py-3 text-forest-dark outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30" />
          </div>

          <div className="sm:col-span-2 mt-4 flex flex-col gap-4 border-t border-forest/10 pt-5">
            {feeError && <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-800">{feeError}</p>}
            <div className="space-y-2 text-sm text-forest-dark/75">
              {items.map((item) => (
                <div key={item.product} className="flex justify-between gap-4">
                  <span className="line-clamp-1">{item.title} × {item.quantity}</span>
                  <span className="shrink-0">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
              <div className="flex justify-between border-t border-forest/10 pt-2"><span>Subtotal</span><span>{formatPrice(total)}</span></div>
              <div className="flex justify-between"><span>Delivery</span><span>{feeLoaded && !feeError ? formatPrice(deliveryFee) : "Not available"}</span></div>
              <div className="flex justify-between border-t border-forest/10 pt-2 text-base font-bold text-forest-dark"><span>Amount due</span><span>{feeLoaded && !feeError ? formatPrice(total + deliveryFee) : "—"}</span></div>
            </div>
            <button
              type="submit"
              disabled={submitting || items.length === 0 || !feeLoaded || Boolean(feeError)}
              className="min-h-12 w-full rounded-lg bg-gold px-6 py-3 text-base font-bold text-forest-dark transition hover:bg-[#e9bd6f] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "Placing order…" : "Place order & pay"}
            </button>
          </div>
        </form>

        <aside className="h-fit rounded-lg bg-[#112018] p-6 text-cream">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">Payment</p>
          <h2 className="mt-3 text-2xl font-bold">Secure checkout</h2>
          <ul className="mt-6 space-y-3 text-sm text-cream/75">
            <li>• Secure payment flow via Paystack</li>
            <li>Delivery fee is included in the total shown before payment.</li>
            <li>Delivery time and handoff are confirmed after your order.</li>
            <li>Payment is confirmed directly with Paystack.</li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default Checkout;
