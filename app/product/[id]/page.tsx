
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    register(username, email, password);

    alert("Registration successful!");

    router.push("/");
  }

  return (
    <main className="authPage">
      <form className="authForm" onSubmit={handleRegister}>
        <h1>Register</h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />

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

        <button type="submit">Register</button>

        <p>
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </form>
    </main>
  );
}
