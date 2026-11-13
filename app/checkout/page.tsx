
"use client";

import Link from "next/link";
import { useCart } from "../../context/CartContext";
import CheckoutForm from "../../components/CheckoutForm";

export default function CheckoutPage() {
  const { cartItems } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <main className="container">
        <h1>Your cart is empty.</h1>
        <Link href="/">Go Shopping</Link>
      </main>
    );
  }

  return (
    <main className="container">
      <h1>Checkout</h1>

      <div className="checkoutLayout">
        <CheckoutForm />

        <div className="summary">
          <h2>Order Summary</h2>

          {cartItems.map((item) => (
            <p key={item.id}>
              {item.title} x {item.quantity}
            </p>
          ))}

          <h3>Total: ${total.toFixed(2)}</h3>
        </div>
      </div>
    </main>
  );
}
