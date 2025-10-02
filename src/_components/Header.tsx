export default function header() {
  return (
    <header className="bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-lg px-8 py-6 mb-8">
      <nav className="flex items-center justify-between">
        <a
          href="/"
          className="text-2xl font-bold text-white hover:text-blue-200 transition-colors"
        >
          My Blog
        </a>
        <div className="flex gap-4">
          <a
            href="/about.html"
            className="text-white hover:text-blue-200 font-medium transition-colors px-4 py-2 rounded-md hover:bg-white hover:bg-opacity-20"
          >
            about
          </a>
          <a
            href="/blog.html"
            className="text-white hover:text-blue-200 font-medium transition-colors px-4 py-2 rounded-md hover:bg-white hover:bg-opacity-20"
          >
            blog
          </a>
          <a
            href="/links.html"
            className="text-white hover:text-blue-200 font-medium transition-colors px-4 py-2 rounded-md hover:bg-white hover:bg-opacity-20"
          >
            links
          </a>
        </div>
      </nav>
    </header>
  );
}
