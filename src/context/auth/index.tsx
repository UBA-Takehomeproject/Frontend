import type { AuthContextType } from "@/types";
import { createContext } from "react";
import { useState } from "react";
import { useContext } from "react";

// AuthContext.tsx
const AuthContext = createContext<AuthContextType>({
  user: null,
  signup: async (email: string, password: string) => {},
  login: async (email: string, password: string) => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);

  const signup = async (email: string, password: string) => {
    const res = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setUser(data.user); // or data.token, etc.
  };

  const login = async (email: string, password: string) => {
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setUser(data.user);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
