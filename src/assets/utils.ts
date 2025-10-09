/**
 * Common utilities for client-side scripts
 */

// Check localStorage availability (handles Safari private mode)
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

// Safe localStorage getter
export function getItem(key: string): string | null {
  return storageAvailable ? localStorage.getItem(key) : null;
}

// Safe localStorage setter
export function setItem(key: string, value: string): void {
  if (storageAvailable) {
    localStorage.setItem(key, value);
  }
}

// Theme configuration
export const THEME_CONFIG = {
  STORAGE_KEY: "theme",
  DARK: "dark",
  LIGHT: "light",
} as const;

export type Theme = typeof THEME_CONFIG.DARK | typeof THEME_CONFIG.LIGHT;
