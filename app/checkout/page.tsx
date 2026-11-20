
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import CheckoutForm from "../../components/CheckoutForm";

export default function CheckoutPage() {
  const { user } = useAuth();
  const { cartItems } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.replace("/login");
    }
  }, [user, router]);

  if (user === null) {
    return (
      <main className="container">
        <h1>Please log in first.</h1>
        <p>You need to log in before you can checkout.</p>
        <Link href="/login">Go to Login</Link>
      </main>
    );
  }

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

      <p>Welcome, {user.username}!</p>

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
