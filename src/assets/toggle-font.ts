/**
 * Font toggle functionality
 * Switches between DotGothic16 and ZenKakuGothicNew fonts
 */

import { FONT_CONFIG, FontPreference, getItem, setItem } from "./utils.ts";

(() => {
  // Apply font using CSS Custom Property and inline style
  const applyFont = (fontPref: FontPreference): void => {
    const root = document.documentElement;
    const fontStack = FONT_CONFIG.STACKS[fontPref];

    root.style.setProperty("--font-family-base", fontStack);
    root.style.fontFamily = fontStack;
  };

  // Cache the getItem function to avoid minifier issues
  const safeGetItem = getItem;
  const safeSetItem = setItem;

  // Get current font preference
  const getCurrentFont = (): FontPreference => {
    return (safeGetItem(FONT_CONFIG.STORAGE_KEY) || FONT_CONFIG.BASE) as
      FontPreference;
  };

  // Update button aria-label
  const updateButtonLabel = (fontPref: FontPreference): void => {
    const buttons = document.querySelectorAll("#font-toggle");
    const nextFont = fontPref === FONT_CONFIG.BASE
      ? FONT_CONFIG.ALT
      : FONT_CONFIG.BASE;
    const label = `switch to ${nextFont} font`;
    buttons.forEach((button) => {
      button.setAttribute("aria-label", label);
    });
  };

  // Toggle font
  const toggleFont = (): void => {
    const current = getCurrentFont();
    const next = current === FONT_CONFIG.BASE
      ? FONT_CONFIG.ALT
      : FONT_CONFIG.BASE;

    safeSetItem(FONT_CONFIG.STORAGE_KEY, next);

    // Use View Transitions API if available and user doesn't prefer reduced motion
    if (
      document.startViewTransition &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      document.startViewTransition(() => {
        applyFont(next);
        updateButtonLabel(next);
      });
    } else {
      applyFont(next);
      updateButtonLabel(next);
    }
  };

  // Initialize on DOM load
  const init = (): void => {
    const current = getCurrentFont();
    const buttons = document.querySelectorAll("#font-toggle");
    buttons.forEach((button) => {
      button.addEventListener("click", toggleFont);
    });
    updateButtonLabel(current);
  };

  // Use DOMContentLoaded instead of load for faster initialization
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
