import { useEffect, useState } from "react";

export function useDarkModeClassObserver() {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark"),
  );

  useEffect(() => {
    const root = document.documentElement;

    const updateTheme = () => {
      setIsDark(root.classList.contains("dark"));
    };

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          updateTheme();
        }
      }
    });

    observer.observe(root, { attributes: true });

    return () => observer.disconnect();
  }, []);

  return isDark;
}
