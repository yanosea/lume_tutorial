export default function HamburgerButton() {
  return (
    <button
      id="menu-button"
      className="nav-link flex items-center justify-center w-8 h-8 text-2xl"
      aria-expanded={false}
      aria-label="Toggle menu"
    >
      <span id="menu-icon" className="transition-opacity duration-200">☰</span>
    </button>
  );
}
