
"use client";

import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

export default function CheckoutForm() {
  const { clearCart } = useCart();
  const router = useRouter();

  function placeOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    alert("Your order has been placed!");

    clearCart();
    router.push("/");
  }

  return (
    <form className="checkoutForm" onSubmit={placeOrder}>
      <label>Full Name</label>
      <input type="text" placeholder="Enter your name" required />

      <label>Email Address</label>
      <input type="email" placeholder="Enter your email" required />

      <label>Address</label>
      <input type="text" placeholder="Enter your address" required />

      <button type="submit">Place Order</button>
    </form>
  );
}
