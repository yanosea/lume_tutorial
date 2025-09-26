export default function header() {
  return (
    <header className="mb-8 pb-6 border-b-2 border-gradient-to-r from-blue-400 to-purple-400 bg-gradient-to-r text-white rounded-t-lg px-8 py-6 -mx-8 -mt-8">
      <nav className="flex items-center justify-between">
        <a
          href="/"
          className="text-2xl font-bold text-white hover:text-blue-200 transition-colors"
        >
          my site
        </a>
        <div className="flex gap-4">
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
