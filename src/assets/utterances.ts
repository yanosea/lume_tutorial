/**
 * Utterances comments integration with theme support
 */

// Inline utilities to avoid module conflicts
const THEME_CONFIG = {
  STORAGE_KEY: "theme",
  DARK: "dark",
  LIGHT: "light",
} as const;

// Utterances theme mapping based on current site theme
const UTTERANCES_THEMES = {
  light: "github-light",
  dark: "github-dark",
} as const;

/**
 * Get current theme for utterances
 */
function getUtterancesTheme(): string {
  const currentTheme = document.documentElement.classList.contains("dark")
    ? THEME_CONFIG.DARK
    : THEME_CONFIG.LIGHT;
  return UTTERANCES_THEMES[currentTheme];
}

/**
 * Initialize utterances comments widget
 */
function initializeUtterances(): void {
  const container = document.getElementById("utterances-container");
  if (!container) return;

  // Check if already initialized
  const existingFrame = container.querySelector("iframe.utterances-frame");
  if (existingFrame) {
    console.log("Utterances already initialized");
    return;
  }

  const repo = container.getAttribute("data-repo");
  const issueTerm = container.getAttribute("data-issue-term");
  const label = container.getAttribute("data-label");

  if (!repo) {
    console.error("Utterances: repo attribute is required");
    return;
  }

  // Remove existing script if any
  const existingScript = container.querySelector("script");
  if (existingScript) {
    existingScript.remove();
  }

  // Create utterances script
  const script = document.createElement("script");
  script.src = "https://utteranc.es/client.js";
  script.setAttribute("repo", repo);
  script.setAttribute("issue-term", issueTerm || "pathname");
  script.setAttribute("label", label || "comment");
  script.setAttribute("theme", getUtterancesTheme());
  script.setAttribute("crossorigin", "anonymous");
  script.setAttribute("async", "true");

  container.appendChild(script);
}

/**
 * Change utterances theme dynamically
 */
function changeUtterancesTheme(theme: string): void {
  const iframe = document.querySelector(
    ".utterances-wrapper iframe.utterances-frame",
  ) as HTMLIFrameElement;

  if (iframe && iframe.contentWindow) {
    const message = {
      type: "set-theme",
      theme: theme,
    };
    iframe.contentWindow.postMessage(message, "https://utteranc.es");
  }
}

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  initializeUtterances();

  // Listen for theme changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        const newTheme = getUtterancesTheme();
        changeUtterancesTheme(newTheme);
      }
    });
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
});
