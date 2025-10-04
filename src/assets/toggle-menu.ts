// Mobile menu toggle functionality
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon = document.getElementById("menu-icon");

  if (menuButton && mobileMenu && menuIcon) {
    menuButton.addEventListener("click", () => {
      const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isExpanded));

      if (isExpanded) {
        // Close menu
        menuIcon.style.opacity = "0";
        setTimeout(() => {
          menuIcon.textContent = "☰";
          menuIcon.style.opacity = "1";
        }, 100);

        mobileMenu.style.gridTemplateRows = "0fr";
      } else {
        // Open menu
        menuIcon.style.opacity = "0";
        setTimeout(() => {
          menuIcon.textContent = "✕";
          menuIcon.style.opacity = "1";
        }, 100);

        mobileMenu.style.gridTemplateRows = "1fr";
      }
    });
  }
});
