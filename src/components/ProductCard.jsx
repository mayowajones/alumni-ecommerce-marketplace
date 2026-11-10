import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

const formatPrice = (value) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(value);

const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const stockQuantity = Number(product.stockQuantity) || 0;
  const outOfStock = stockQuantity < 1;
  const image = product.images?.[0] || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80";

  const handleAddToCart = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!outOfStock) addItem(product);
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-forest/10 bg-white shadow-[0_8px_20px_rgba(17,32,24,0.06)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(17,32,24,0.12)]">
      <Link to={`/products/${product._id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-[#f4efe6]">
          <img
            src={image}
            alt={product.title}
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80";
            }}
            className={`h-full w-full object-cover transition duration-500 group-hover:scale-[1.03] ${outOfStock ? "grayscale opacity-65" : ""}`}
            loading="lazy"
          />
          <span className={`absolute left-3 top-3 rounded px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${outOfStock ? "bg-[#202a25] text-white" : stockQuantity <= 3 ? "bg-[#fff1d6] text-[#80520d]" : "bg-white/95 text-[#17623f]"}`}>
            {outOfStock ? "Out of stock" : stockQuantity <= 3 ? `Only ${stockQuantity} left` : "In stock"}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gold-dark">
          {product.category?.name || "Marketplace"}
        </p>
        <Link to={`/products/${product._id}`} className="mt-1 line-clamp-2 min-h-10 text-sm font-bold leading-5 text-forest-dark hover:underline sm:text-base">
          {product.title}
        </Link>

        <p className="mt-2 text-lg font-bold text-forest-dark sm:text-xl">{formatPrice(product.price)}</p>
        <p className="mt-2 truncate text-xs text-forest-dark/60" title={product.memberName || "Alumni seller"}>
          Sold by <span className="font-semibold text-forest-dark/80">{product.memberName || "Alumni seller"}</span>
        </p>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={outOfStock}
          className="mt-auto flex min-h-10 w-full items-center justify-center gap-2 rounded-md bg-forest-dark px-3 py-2.5 text-xs font-bold text-white transition hover:bg-[#245d49] disabled:cursor-not-allowed disabled:bg-[#d9dedb] disabled:text-[#69726d] sm:mt-4 sm:text-sm"
          aria-label={outOfStock ? `${product.title} is out of stock` : `Add ${product.title} to cart`}
        >
          <span aria-hidden="true">＋</span>
          {outOfStock ? "Unavailable" : "Add to cart"}
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
