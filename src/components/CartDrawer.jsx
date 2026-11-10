import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

const formatPrice = (value) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(value);

const CartDrawer = ({ isOpen, onClose }) => {
  const { items, removeItem, updateQuantity, total } = useCart();
  const navigate = useNavigate();

  const goToCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <>
      {/* Backdrop — click outside the panel to close, standard drawer UX */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 shadow-xl flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-forest/10">
          <h2 className="text-lg font-bold text-forest-dark">Your Cart</h2>
          <button onClick={onClose} aria-label="Close cart" className="text-forest-dark/60 hover:text-forest-dark text-xl leading-none">
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-forest-dark/60">Your cart is empty.</p>
            <Link
              to="/products"
              onClick={onClose}
              className="bg-gold text-forest-dark font-bold px-5 py-2.5 rounded"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {items.map((item) => (
                <div key={item.product} className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded border border-forest/10 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-forest-dark text-sm truncate">{item.title}</p>
                    <p className="text-forest font-bold text-sm">{formatPrice(item.price)}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.product, Number(e.target.value))}
                        className="w-14 border border-forest/20 rounded px-2 py-1 text-sm"
                      />
                      <button
                        onClick={() => removeItem(item.product)}
                        className="text-red-600 text-xs font-semibold hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-forest/10 px-5 py-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-forest-dark">Subtotal</span>
                <span className="font-bold text-forest-dark">{formatPrice(total)}</span>
              </div>
              <button
                onClick={goToCheckout}
                className="w-full bg-gold text-forest-dark font-bold px-4 py-3 rounded hover:bg-gold-dark transition"
              >
                Proceed to checkout
              </button>
              <Link
                to="/cart"
                onClick={onClose}
                className="block text-center text-sm font-semibold text-forest-dark/70 hover:text-forest-dark"
              >
                View full cart
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
};

export default CartDrawer;
