import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);
const STORAGE_KEY = "absa_nextgen_auth_v1";

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { isAuthed: false, user: null };
    } catch {
      return { isAuthed: false, user: null };
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
  }, [auth]);

  function login({ email, pin }) {
    // valid email + 4-digit PIN (demo only)
    const ok = /^\S+@\S+\.\S+$/.test(email) && /^\d{4}$/.test(pin);
    if (!ok) return { ok: false, message: "Enter a valid email and a 4-digit PIN." };

    setAuth({ isAuthed: true, user: { email } });
    return { ok: true };
  }

  function logout() {
    setAuth({ isAuthed: false, user: null });
  }

  const value = useMemo(() => ({ auth, login, logout }), [auth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}