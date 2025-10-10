/**
 * Critical initialization script
 * Runs before CSS loads to prevent FOUC
 */

// Inline utilities to avoid module conflicts
const storageAvailable = (() => {
  try {
    const x = "__storage_test__";
    localStorage.setItem(x, x);
    localStorage.removeItem(x);
    return true;
  } catch {
    return false;
  }
})();

function getItem(key: string): string | null {
  return storageAvailable ? localStorage.getItem(key) : null;
}

const THEME_CONFIG = {
  STORAGE_KEY: "theme",
  DARK: "dark",
  LIGHT: "light",
} as const;

(() => {
  const theme = getItem(THEME_CONFIG.STORAGE_KEY) ||
    (matchMedia("(prefers-color-scheme: dark)").matches
      ? THEME_CONFIG.DARK
      : THEME_CONFIG.LIGHT);

  if (theme === THEME_CONFIG.DARK) {
    document.documentElement.classList.add("dark");
  }
})();
