export default function ThemeToggleButton() {
  return (
    <button
      type="button"
      id="theme-toggle"
      aria-label="Toggle theme"
      class="p-2 rounded-lg hover:bg-white/20 dark:hover:bg-black/20 text-2xl cursor-pointer"
    >
      <span class="dark:hidden">🌙</span>
      <span class="hidden dark:inline">☀️</span>
    </button>
  );
}
