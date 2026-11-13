
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = login(email, password);

    if (result) {
      alert("Login successful!");
      router.push("/");
    } else {
      alert("Invalid email or password. Please register first.");
    }
  }

  return (
    <main className="authPage">
      <form className="authForm" onSubmit={handleLogin}>
        <h1>Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <button type="submit">Login</button>

        <p>
          Don't have an account? <Link href="/register">Register</Link>
        </p>
      </form>
    </main>
  );
}
