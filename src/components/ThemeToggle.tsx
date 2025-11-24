import { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  const systemPrefersDark = () => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (theme === "system") {
      localStorage.removeItem("theme");

      document.documentElement.classList.toggle("dark", systemPrefersDark());

      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => {
        document.documentElement.classList.toggle("dark", mediaQuery.matches);
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } else {
      localStorage.theme = theme;
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const effectiveTheme = theme === "system" ? (systemPrefersDark() ? "dark" : "light") : theme;

  return (
    <button
      onClick={toggleTheme}
      className="cursor-pointer theme-toggle-button flex items-center justify-center w-10 h-10 rounded-full bg-slate-700 dark:bg-slate-800 text-white dark:text-slate-100 hover:bg-slate-600 dark:hover:bg-slate-700 transition-all duration-300 focus:outline-none"
      title={`Current theme: ${theme} (click to toggle)`}
    >
      {/* Sun icon for light theme */}
      {effectiveTheme === "light" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      )}

      {/* Moon icon for dark theme */}
      {effectiveTheme === "dark" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
