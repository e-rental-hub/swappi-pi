'use client';

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

type Theme = "dark" | "light";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeProviderState | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = "dark",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);

  // On mount, sync theme from cookies
  useEffect(() => {
    const cookieTheme = Cookies.get("theme") as Theme | undefined;
    if (cookieTheme === "light" || cookieTheme === "dark") {
      setThemeState(cookieTheme);
    }
  }, []);

  // Apply theme and persist to cookies
  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove("dark", "light");
    root.classList.add(theme);

    Cookies.set("theme", theme, { expires: 365 });
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
