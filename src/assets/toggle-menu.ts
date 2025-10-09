/**
 * Mobile menu toggle functionality
 */

document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon = document.getElementById("menu-icon");

  if (!menuButton || !mobileMenu || !menuIcon) return;

  const updateMenuState = (isExpanded: boolean) => {
    menuButton.setAttribute("aria-expanded", String(isExpanded));
    menuButton.setAttribute(
      "aria-label",
      isExpanded ? "close menu" : "open menu",
    );
    mobileMenu.style.gridTemplateRows = isExpanded ? "1fr" : "0fr";

    menuIcon.style.opacity = "0";
    setTimeout(() => {
      menuIcon.textContent = isExpanded ? "✕" : "☰";
      menuIcon.style.opacity = "1";
    }, 100);
  };

  // Initialize state
  const initialExpanded = menuButton.getAttribute("aria-expanded") === "true";
  updateMenuState(initialExpanded);

  // Handle clicks
  menuButton.addEventListener("click", () => {
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
    updateMenuState(!isExpanded);
  });
});
