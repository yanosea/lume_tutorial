export default function Header({ comp }: Lume.Data) {
  return (
    <header className="sticky top-0 z-50 w-full bg-slate-50 dark:bg-gray-900">
      <nav
        className="mx-auto flex min-h-[var(--header-footer-height)] max-w-7xl items-center border-b border-gray-200 px-6 dark:border-gray-700"
        aria-label="Main navigation"
        style="min-height: var(--header-footer-height)"
      >
        <div className="flex w-full items-center justify-between">
          <a
            href="/"
            className="text-2xl font-bold text-gray-900 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
            aria-label="Go to homepage"
          >
            My Blog
          </a>
          <div className="hidden items-center gap-4 md:flex">
            <a href="/about.html" className="nav-link">about</a>
            <a href="/blog.html" className="nav-link">blog</a>
            <a href="/links.html" className="nav-link">links</a>
            <a
              href="/feed.xml"
              aria-label="RSS Feed"
              className="text-2xl hover:opacity-80"
            >
              📡
            </a>
            <comp.ThemeToggleButton />
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <a
              href="/feed.xml"
              aria-label="RSS Feed"
              className="text-2xl hover:opacity-80"
            >
              📡
            </a>
            <comp.ThemeToggleButton />
            <comp.HamburgerButton />
          </div>
        </div>
        <comp.MobileMenu />
      </nav>
    </header>
  );
}
