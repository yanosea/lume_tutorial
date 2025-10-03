// Theme toggle logic with system preference support
type Theme = "dark" | "light";

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
    return "dark";
  }
  return "light";
}

function updateTheme(theme: Theme, withTransition = false): void {
  const updateDOM = () => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  if (!withTransition) {
    updateDOM();
    return;
  }

  // Add transition class first
  document.documentElement.classList.add('theme-transitioning');

  // Use requestAnimationFrame to ensure class is applied before DOM update
  requestAnimationFrame(() => {
    // Update the theme
    updateDOM();

    // Remove the class after transition completes
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning');
    }, 150);
  });
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
      updateTheme(newTheme, true); // Enable transition for user clicks
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
