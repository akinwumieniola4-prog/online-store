
"use client";

import Link from "next/link";
import CartItem from "../../components/CartItem";
import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const { cartItems } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="container">
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}

          <h2>Total: ${total.toFixed(2)}</h2>

          <Link className="checkoutLink" href="/checkout">
            Proceed to Checkout
          </Link>
        </>
      )}
    </main>
  );
}
