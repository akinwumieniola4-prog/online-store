
"use client";

import { useCart } from "../context/CartContext";

export default function CartItem({ item }: { item: any }) {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className="cartItem">
      <img src={item.image} alt={item.title} />

      <div>
        <h3>{item.title}</h3>
        <p>${item.price}</p>

        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
        >
          -
        </button>

        <span>{item.quantity}</span>

        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
        >
          +
        </button>
      </div>

      <button onClick={() => removeFromCart(item.id)}>
        Remove
      </button>
    </div>
  );
}
