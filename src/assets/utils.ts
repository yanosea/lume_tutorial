/**
 * Common utilities for client-side scripts
 */

// Check localStorage availability (handles Safari private mode)
export const storageAvailable = (() => {
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

// Font configuration
export const FONT_CONFIG = {
  STORAGE_KEY: "font-preference",
  BASE: "base" as const,
  ALT: "alt" as const,
  STACKS: {
    base:
      'ZenKakuGothicNew, sans-serif, system-ui, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    alt:
      'DotGothic16, sans-serif, system-ui, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  },
  PRELOAD_FILES: {
    base: [
      "/fonts/zenkakugothicnew-normal-400-latin.woff2",
      "/fonts/zenkakugothicnew-normal-700-latin.woff2",
    ],
    alt: ["/fonts/dotgothic16-normal-400-latin.woff2"],
  },
} as const;

// Theme configuration
export const THEME_CONFIG = {
  STORAGE_KEY: "theme",
  DARK: "dark" as const,
  LIGHT: "light" as const,
} as const;

export type FontPreference = typeof FONT_CONFIG.BASE | typeof FONT_CONFIG.ALT;
export type Theme = typeof THEME_CONFIG.DARK | typeof THEME_CONFIG.LIGHT;
