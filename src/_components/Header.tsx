export default function Header({ comp }: Lume.Data) {
  return (
    <header className="bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-900 dark:to-purple-900 text-white rounded-lg px-8 py-6 mb-8">
      <nav className="flex items-center justify-between">
        <a
          href="/"
          className="text-2xl font-bold text-white hover:text-blue-200 dark:hover:text-blue-300"
        >
          My Blog
        </a>
        <div className="flex gap-4 items-center">
          <a href="/about.html" className="nav-link">
            about
          </a>
          <a href="/blog.html" className="nav-link">
            blog
          </a>
          <a href="/links.html" className="nav-link">
            links
          </a>
          <a href="/feed.xml" className="nav-link">
            📡
          </a>
          <comp.ThemeToggleButton />
        </div>
      </nav>
    </header>
  );
}
