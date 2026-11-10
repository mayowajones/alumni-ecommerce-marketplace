import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const stored = localStorage.getItem("cartItems");
    if (!stored) return [];

    try {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed)
        ? parsed.filter((item) => item?.product && Number.isInteger(item.quantity) && item.quantity > 0)
        : [];
    } catch {
      localStorage.removeItem("cartItems");
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  }, [items]);

  const addItem = (product, quantity = 1) => {
    setItems((prev) => {
      const available = Math.max(0, Number(product.stockQuantity) || 0);
      if (!available) return prev;
      const amount = Math.min(available, Math.max(1, Math.floor(Number(quantity) || 1)));
      const existing = prev.find((i) => i.product === product._id);
      if (existing) {
        return prev.map((i) =>
          i.product === product._id
            ? { ...i, quantity: Math.min(available, i.quantity + amount), stockQuantity: available }
            : i
        );
      }
      return [
        ...prev,
        {
          product: product._id,
          title: product.title,
          price: product.price,
          image: product.images?.[0],
          stockQuantity: available,
          quantity: amount,
        },
      ];
    });
  };

  const removeItem = (productId) => {
    setItems((prev) => prev.filter((i) => i.product !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setItems((prev) =>
      prev.map((i) => {
        if (i.product !== productId) return i;
        const safeQuantity = Number.isFinite(quantity) ? Math.max(1, Math.floor(quantity)) : 1;
        return {
          ...i,
          quantity: i.stockQuantity ? Math.min(safeQuantity, i.stockQuantity) : safeQuantity,
        };
      })
    );
  };

  const clearCart = useCallback(() => setItems([]), []);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
