"use client";

import { createContext, useCallback, useContext, useMemo, useState, useEffect, ReactNode } from "react";
import type { User, LoginCredentials, SignupCredentials } from "@/types/auth";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function unwrapApiData<T>(payload: any): T {
  return payload?.success && payload?.data !== undefined ? payload.data : payload;
}

function decodeJwtPayload(token: string): { exp?: number } | null {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;

    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=");

    return JSON.parse(window.atob(padded));
  } catch {
    return null;
  }
}

function isTokenExpired(token: string) {
  const payload = decodeJwtPayload(token);
  if (!payload?.exp) return true;

  return payload.exp <= Math.floor(Date.now() / 1000);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load token from localStorage on mount; cookie auth is checked by fetchUser.
  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    if (storedToken && !isTokenExpired(storedToken)) {
      setToken(storedToken);
      return;
    }

    localStorage.removeItem("auth_token");
    setToken(null);
  }, []);

  const fetchUser = useCallback(async () => {
    if (token && isTokenExpired(token)) {
      localStorage.removeItem("auth_token");
      setToken(null);
      setUser(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const headers: HeadersInit = token
        ? { Authorization: `Bearer ${token}` }
        : {};
      const response = await fetch("/api/auth/me", {
        credentials: "include",
        headers,
      });

      if (response.ok) {
        const payload = await response.json();
        const data = unwrapApiData<{ user: User }>(payload);
        setUser(data.user);
      } else {
        localStorage.removeItem("auth_token");
        setToken(null);
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      localStorage.removeItem("auth_token");
      setToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  // Fetch user data when token changes
  useEffect(() => {
    fetchUser();
  }, [fetchUser, token]);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Login failed");
      }

      const payload = await response.json();
      const data = unwrapApiData<{ user: User; token: string }>(payload);
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("auth_token", data.token);
    } catch (error) {
      throw error;
    }
  }, []);

  const signup = useCallback(async (credentials: SignupCredentials) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Signup failed");
      }

      const payload = await response.json();
      const data = unwrapApiData<{ user: User; token: string }>(payload);
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("auth_token", data.token);
    } catch (error) {
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      const headers: HeadersInit = token
        ? { Authorization: `Bearer ${token}` }
        : {};
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
        headers,
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("auth_token");
      setToken(null);
      setUser(null);
    }
  }, [token]);

  const refreshUser = useCallback(async () => {
    await fetchUser();
  }, [fetchUser]);

  const value: AuthContextType = useMemo(
    () => ({
      user,
      token,
      isLoading,
      isAuthenticated: !!user,
      login,
      signup,
      logout,
      refreshUser,
    }),
    [isLoading, login, logout, refreshUser, signup, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
