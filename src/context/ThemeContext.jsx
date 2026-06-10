import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);
const KEY = "absa_nextgen_theme_v1";

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem(KEY) || "light");

  useEffect(() => {
    localStorage.setItem(KEY, theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
      setTheme,
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}