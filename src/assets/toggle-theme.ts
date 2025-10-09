/**
 * Theme toggle logic with system preference support
 */

import { getItem, setItem, type Theme, THEME_CONFIG } from "./utils.ts";

const getCurrentTheme = (): Theme => {
  const stored = getItem(THEME_CONFIG.STORAGE_KEY);
  if (stored) return stored as Theme;
  return matchMedia("(prefers-color-scheme: dark)").matches
    ? THEME_CONFIG.DARK
    : THEME_CONFIG.LIGHT;
};

const applyTheme = (theme: Theme): void => {
  if (theme === THEME_CONFIG.DARK) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

const updateButtonLabel = (currentTheme: Theme): void => {
  const nextTheme = currentTheme === THEME_CONFIG.DARK
    ? THEME_CONFIG.LIGHT
    : THEME_CONFIG.DARK;
  document.querySelectorAll("#theme-toggle").forEach((btn) => {
    btn.setAttribute("aria-label", `switch to ${nextTheme} mode`);
  });
};

// Initialize theme
let currentTheme = getCurrentTheme();
applyTheme(currentTheme);

// Setup toggle button
document.addEventListener("DOMContentLoaded", () => {
  updateButtonLabel(currentTheme);

  document.querySelectorAll("#theme-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const newTheme = currentTheme === THEME_CONFIG.DARK
        ? THEME_CONFIG.LIGHT
        : THEME_CONFIG.DARK;

      setItem(THEME_CONFIG.STORAGE_KEY, newTheme);

      if (
        document.startViewTransition &&
        !matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        document.startViewTransition(() => {
          applyTheme(newTheme);
          updateButtonLabel(newTheme);
        });
      } else {
        applyTheme(newTheme);
        updateButtonLabel(newTheme);
      }

      currentTheme = newTheme;
    });
  });
});

// Listen for system theme changes
matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
  if (!getItem(THEME_CONFIG.STORAGE_KEY)) {
    const newTheme = e.matches ? THEME_CONFIG.DARK : THEME_CONFIG.LIGHT;
    applyTheme(newTheme);
    updateButtonLabel(newTheme);
    currentTheme = newTheme;
  }
});
