
"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }: { product: any }) {
  const { addToCart } = useCart();

  return (
    <div className="productCard">
      <Link href={`/product/${product.id}`}>
        <img src={product.image} alt={product.title} />
        <h3>{product.title}</h3>
      </Link>

      <p>${product.price}</p>

      <button onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}
