
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { addToCart } = useCart();

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products"
        );

        if (!response.ok) {
          throw new Error("Failed to load products");
        }

        const data: Product[] = await response.json();

        setProducts(data);
      } catch {
        setError("Could not load products. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, []);

  return (
    <main className="container">
      <section className="hero">
        <h1>Welcome to MyStore</h1>
        <p>Shop your favourite products with us.</p>
        <Link href="/cart">View Cart</Link>
      </section>

      <h2>Our Products</h2>

      {loading && <p>Loading products...</p>}

      {error && <p>{error}</p>}

      <div className="productGrid">
        {products.map((product) => (
          <div className="productCard" key={product.id}>
            <Link href={`/product/${product.id}`}>
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
            </Link>

            <p>${product.price.toFixed(2)}</p>

            <button onClick={() => addToCart(product)}>
              Add to Cart
            </button>

            <Link href={`/product/${product.id}`}>
              View Details
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
