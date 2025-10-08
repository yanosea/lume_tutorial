export default function ThemeToggleButton() {
  return (
    <button
      type="button"
      id="theme-toggle"
      aria-label="Toggle theme"
      class="flex items-center justify-center w-8 h-8 text-2xl rounded-lg cursor-pointer hover:bg-white/20 dark:hover:bg-black/20"
    >
      <span class="dark:hidden" aria-hidden="true">☀️</span>
      <span class="hidden dark:inline" aria-hidden="true">🌙</span>
    </button>
  );
}
