export default function ThemeToggleButton() {
  return (
    <button
      type="button"
      id="theme-toggle"
      aria-label="Toggle theme"
      class="rounded-lg hover:bg-white/20 dark:hover:bg-black/20 text-2xl cursor-pointer w-8 h-8 flex items-center justify-center"
    >
      <span class="dark:hidden">☀️</span>
      <span class="hidden dark:inline">🌙</span>
    </button>
  );
}
