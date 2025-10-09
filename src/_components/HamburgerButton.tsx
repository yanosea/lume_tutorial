export default function HamburgerButton() {
  return (
    <button
      type="button"
      id="menu-button"
      className="flex items-center justify-center w-8 h-8 text-2xl text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-150"
      aria-expanded="false"
      aria-controls="mobile-menu"
      aria-label="Menu"
    >
      <span
        id="menu-icon"
        className="transition-opacity duration-200"
        aria-hidden="true"
      >
        ☰
      </span>
    </button>
  );
}
