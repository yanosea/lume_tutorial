export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full" role="contentinfo">
      <div
        className="mx-auto flex min-h-[var(--header-footer-height)] max-w-7xl items-center justify-center border-t border-gray-200 px-6 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400"
        style="min-height: var(--header-footer-height)"
      >
        <p>
          <small>© {currentYear} John Doe. All rights reserved.</small>
        </p>
      </div>
    </footer>
  );
}
