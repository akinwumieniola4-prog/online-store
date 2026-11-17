
"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCart } from "../../../context/CartContext";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
};

function ProductDetailsContent() {
  const params = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getProduct() {
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/${params.id}`
        );

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();
        setProduct(data);
      } catch {
        setError("Could not load product details.");
      } finally {
        setLoading(false);
      }
    }

    getProduct();
  }, [params.id]);

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (error || !product) {
    return <p>{error || "Product not found."}</p>;
  }

  return (
    <main className="productsPage">
      <Link href="/">← Back to Home</Link>

      <div className="productCard">
        <img
          src={product.image}
          alt={product.title}
          width="250"
        />

        <h1>{product.title}</h1>
        <h2>${product.price}</h2>
        <p>{product.description}</p>

        <button onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </main>
  );
}

export default function ProductDetailsPage() {
  return (
    <Suspense fallback={<p>Loading product page...</p>}>
      <ProductDetailsContent />
    </Suspense>
  );
}
