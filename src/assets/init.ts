/**
 * Critical initialization script
 * Runs before CSS loads to prevent FOUC
 */

import { FONT_CONFIG, getItem, THEME_CONFIG } from "./utils.ts";

(() => {
  // Cache imported function to avoid minifier issues
  const safeGetItem = getItem;

  const d = document.documentElement;

  // Theme initialization
  const theme = safeGetItem(THEME_CONFIG.STORAGE_KEY) ||
    (matchMedia("(prefers-color-scheme: dark)").matches
      ? THEME_CONFIG.DARK
      : THEME_CONFIG.LIGHT);
  if (theme === THEME_CONFIG.DARK) d.classList.add("dark");

  // Font initialization
  const fontPref = (safeGetItem(FONT_CONFIG.STORAGE_KEY) || FONT_CONFIG.BASE) as
    keyof typeof FONT_CONFIG.STACKS;
  const fontStack = FONT_CONFIG.STACKS[fontPref];

  d.style.setProperty("--font-family-base", fontStack);
  d.style.fontFamily = fontStack;

  // Preload selected font files
  const fontFiles = FONT_CONFIG.PRELOAD_FILES[fontPref];

  fontFiles.forEach(function (href) {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "font";
    link.type = "font/woff2";
    link.href = href;
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
  });
})();
