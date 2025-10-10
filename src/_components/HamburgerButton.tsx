export default function HamburgerButton() {
  return (
    <button
      type="button"
      id="menu-button"
      className="flex items-center justify-center w-8 h-8 text-2xl hamburger-button"
      aria-expanded="false"
      aria-controls="mobile-menu"
      aria-label="open menu"
    >
      <span
        id="menu-icon"
        className="hamburger-icon"
        aria-hidden="true"
      >
        ☰
      </span>
    </button>
  );
}
