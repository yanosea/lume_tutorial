/**
 * Theme toggle logic with system preference support
 */

import { getItem, setItem, Theme, THEME_CONFIG } from "./utils.ts";

// Cache imported functions to avoid minifier issues
const safeGetItem = getItem;
const safeSetItem = setItem;

interface ThemeCalculationParams {
  localStorageTheme: string | null;
  systemSettingDark: MediaQueryList;
}

function calculateSettingAsThemeString({
  localStorageTheme,
  systemSettingDark,
}: ThemeCalculationParams): Theme {
  if (localStorageTheme !== null) {
    return localStorageTheme as Theme;
  }
  if (systemSettingDark.matches) {
    return THEME_CONFIG.DARK;
  }
  return THEME_CONFIG.LIGHT;
}

function updateTheme(theme: Theme): void {
  if (theme === THEME_CONFIG.DARK) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

// Update button aria-label
function updateButtonLabel(theme: Theme): void {
  const buttons = document.querySelectorAll("#theme-toggle");
  const nextTheme = theme === THEME_CONFIG.DARK
    ? THEME_CONFIG.LIGHT
    : THEME_CONFIG.DARK;
  const label = `switch to ${nextTheme} mode`;
  buttons.forEach((button) => {
    button.setAttribute("aria-label", label);
  });
}

// Initialize theme on page load
const localStorageTheme = safeGetItem(THEME_CONFIG.STORAGE_KEY);
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

let currentTheme = calculateSettingAsThemeString({
  localStorageTheme,
  systemSettingDark,
});

updateTheme(currentTheme);

// Setup toggle button when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const toggleButtons = document.querySelectorAll("#theme-toggle");

  toggleButtons.forEach((toggleButton) => {
    toggleButton.addEventListener("click", () => {
      const newTheme: Theme = currentTheme === THEME_CONFIG.DARK
        ? THEME_CONFIG.LIGHT
        : THEME_CONFIG.DARK;

      safeSetItem(THEME_CONFIG.STORAGE_KEY, newTheme);

      // Use View Transitions API if available and user doesn't prefer reduced motion
      if (
        document.startViewTransition &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        document.startViewTransition(() => {
          updateTheme(newTheme);
          updateButtonLabel(newTheme);
        });
      } else {
        updateTheme(newTheme);
        updateButtonLabel(newTheme);
      }

      currentTheme = newTheme;
    });
  });

  // Initialize button label
  updateButtonLabel(currentTheme);
});

// Listen for system theme changes
systemSettingDark.addEventListener("change", (e) => {
  // Cache safeGetItem in local scope for minifier compatibility
  const localGetItem = safeGetItem;
  const newTheme: Theme = e.matches
    ? THEME_CONFIG.DARK
    : THEME_CONFIG.LIGHT;
  // Only update if user hasn't set a preference
  const userTheme = localGetItem(THEME_CONFIG.STORAGE_KEY);
  if (userTheme === null) {
    updateTheme(newTheme);
    updateButtonLabel(newTheme);
    currentTheme = newTheme;
  }
});
