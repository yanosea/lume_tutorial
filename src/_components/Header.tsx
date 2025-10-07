export default function Header({ comp }: Lume.Data) {
  return (
    <header className="sticky top-0 z-50 w-full bg-slate-50 dark:bg-gray-900">
      <nav className="mx-auto max-w-7xl border-b border-gray-200 px-6 py-8 dark:border-gray-700" aria-label="Main navigation">
        <div className="flex items-center justify-between">
          <a href="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400" aria-label="Go to homepage">
            My Blog
          </a>
          <div className="hidden items-center gap-4 md:flex">
            <a href="/about.html" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">about</a>
            <a href="/blog.html" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">blog</a>
            <a href="/links.html" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">links</a>
            <a href="/feed.xml" aria-label="RSS Feed" className="text-2xl hover:opacity-80">📡</a>
            <comp.ThemeToggleButton />
          </div>
          <div className="flex items-center gap-2 md:hidden">
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
