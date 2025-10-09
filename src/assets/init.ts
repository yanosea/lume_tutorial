/**
 * Critical initialization script
 * Runs before CSS loads to prevent FOUC
 */

import { getItem, THEME_CONFIG } from "./utils.ts";

(() => {
  const theme = getItem(THEME_CONFIG.STORAGE_KEY) ||
    (matchMedia("(prefers-color-scheme: dark)").matches
      ? THEME_CONFIG.DARK
      : THEME_CONFIG.LIGHT);

  if (theme === THEME_CONFIG.DARK) {
    document.documentElement.classList.add("dark");
  }
})();
