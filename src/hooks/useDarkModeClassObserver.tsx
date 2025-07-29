"use client";

import { useEffect, useState } from "react";

export function useDarkModeClassObserver() {
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    const root = document.documentElement;

    const updateTheme = () => {
      setIsDark(root.classList.contains("dark"));
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return Boolean(isDark);
}
