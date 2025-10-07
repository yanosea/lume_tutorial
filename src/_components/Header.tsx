export default function Header({ comp }: Lume.Data) {
  return (
    <header className="sticky top-0 z-50 bg-slate-50 dark:bg-gray-900 mb-8 pt-6">
      <nav className="pb-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <a
            href="/"
            className="text-2xl font-bold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
          >
            My Blog
          </a>

          <div className="hidden md:flex gap-4 items-center">
            <a href="/about.html" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">about</a>
            <a href="/blog.html" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">blog</a>
            <a href="/links.html" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">links</a>
            <a href="/feed.xml" aria-label="RSS Feed" className="text-2xl hover:opacity-80">📡</a>
            <comp.ThemeToggleButton />
          </div>

          <div className="flex md:hidden gap-2 items-center">
            <a href="/feed.xml" aria-label="RSS Feed" className="text-2xl hover:opacity-80">📡</a>
            <comp.ThemeToggleButton />
            <comp.HamburgerButton />
          </div>
        </div>

        <comp.MobileMenu />
      </nav>
    </header>
  );
}
