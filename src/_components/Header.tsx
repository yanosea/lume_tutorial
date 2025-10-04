export default function Header({ comp }: Lume.Data) {
  return (
    <>
      <header className="sticky top-0 z-10 md:mb-8 bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-900 dark:to-purple-900 text-white rounded-lg">
        <div className="px-4 py-2 md:px-8 md:py-0">
          <nav className="py-5 md:py-6">
            <div className="flex items-center justify-between min-h-8">
              <a
                href="/"
                className="text-2xl font-bold text-white hover:text-blue-200 dark:hover:text-blue-300"
              >
                My Blog
              </a>

              <div className="hidden md:flex gap-4 items-center">
                <a href="/about.html" className="nav-link">about</a>
                <a href="/blog.html" className="nav-link">blog</a>
                <a href="/links.html" className="nav-link">links</a>
                <comp.EmojiLink href="/feed.xml" emoji="📡" ariaLabel="RSS Feed" />
                <comp.ThemeToggleButton />
              </div>

              <div className="flex md:hidden gap-2 items-center">
                <comp.EmojiLink href="/feed.xml" emoji="📡" ariaLabel="RSS Feed" />
                <comp.ThemeToggleButton />
                <comp.HamburgerButton />
              </div>
            </div>
          </nav>
        </div>
      </header>
      <comp.MobileMenu />
    </>
  );
}
