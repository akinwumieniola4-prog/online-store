
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

type User = {
  username: string;
  email: string;
  password: string;
};

type AuthType = {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (username: string, email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  function register(username: string, email: string, password: string) {
    const newUser = { username, email, password };

    localStorage.setItem("storeUser", JSON.stringify(newUser));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    setUser(newUser);
  }

  function login(email: string, password: string) {
    const savedUser = localStorage.getItem("storeUser");

    if (!savedUser) {
      return false;
    }

    const userData: User = JSON.parse(savedUser);

    if (userData.email === email && userData.password === password) {
      setUser(userData);
      localStorage.setItem("currentUser", JSON.stringify(userData));
      return true;
    }

    return false;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("currentUser");
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
