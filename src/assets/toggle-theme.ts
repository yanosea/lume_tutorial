// Theme toggle logic with system preference support
type Theme = "dark" | "light";

interface ThemeCalculationParams {
  localStorageTheme: string | null;
  systemSettingDark: MediaQueryList;
}

/**
 * Determine the theme based on localStorage or system preference
 */
function calculateSettingAsThemeString({
  localStorageTheme,
  systemSettingDark,
}: ThemeCalculationParams): Theme {
  if (localStorageTheme !== null) {
    return localStorageTheme as Theme;
  }
  if (systemSettingDark.matches) {
    return "dark";
  }
  return "light";
}

/**
 * Update the theme with optional animation
 * - Desktop browsers: Use CSS transitions for smooth color changes
 * - iOS browsers: Use opacity fade animation to avoid WebKit bug #46041
 *   (CSS transition inheritance delay on nested elements)
 */
function updateTheme(theme: Theme, withTransition = false): void {
  const applyTheme = () => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // No transition for initial load or system theme changes
  if (!withTransition) {
    applyTheme();
    return;
  }

  if (isIOS) {
    // iOS: Use opacity fade to work around WebKit transition inheritance bug
    const animationClass = theme === "dark" ? "theme-fade-to-dark" : "theme-fade-to-light";
    document.body.classList.add(animationClass);
    applyTheme();

    setTimeout(() => {
      document.body.classList.remove(animationClass);
    }, 150);
  } else {
    // Desktop: CSS transitions handle smooth color changes
    applyTheme();
  }
}

// Detect iOS devices early and disable CSS transitions
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
              (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

if (isIOS) {
  // Disable global CSS transitions for iOS
  document.documentElement.style.setProperty('--transition-duration', '0ms');
}

// Initialize theme on page load
const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

let currentTheme = calculateSettingAsThemeString({
  localStorageTheme,
  systemSettingDark,
});

updateTheme(currentTheme);

// Setup toggle button when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("theme-toggle");

  if (toggleButton) {
    toggleButton.addEventListener("click", () => {
      const newTheme: Theme = currentTheme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      updateTheme(newTheme, true);
      currentTheme = newTheme;
    });
  }
});

// Listen for system theme changes
systemSettingDark.addEventListener("change", (e) => {
  const newTheme: Theme = e.matches ? "dark" : "light";
  // Only update if user hasn't set a preference
  if (localStorage.getItem("theme") === null) {
    updateTheme(newTheme);
    currentTheme = newTheme;
  }
});
