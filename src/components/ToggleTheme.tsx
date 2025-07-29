"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Sun, Moon } from "lucide-react";

const ToggleTheme = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const useDark = saved === "dark" || (!saved && prefersDark);

    document.documentElement.classList.toggle("dark", useDark);
    setIsDark(useDark);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const newIsDark = root.classList.toggle("dark");
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
    setIsDark(newIsDark);
  };

  return (
    <Button variant="ghost" onClick={toggleTheme}>
      {isDark ? (
        <Sun className="text-yellow-400" />
      ) : (
        <Moon className="text-violet-400" />
      )}
    </Button>
  );
};

export default ToggleTheme;
