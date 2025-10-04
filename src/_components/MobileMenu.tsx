export default function MobileMenu() {
  return (
    <div
      id="mobile-menu"
      className="sticky top-16 -mt-2 mb-8 z-10 md:hidden grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-in-out bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-900 dark:to-purple-900 rounded-b-lg"
    >
      <div className="overflow-hidden">
        <div className="space-y-2 px-4 pb-4">
          <a href="/about.html" className="nav-link block">about</a>
          <a href="/blog.html" className="nav-link block">blog</a>
          <a href="/links.html" className="nav-link block">links</a>
        </div>
      </div>
    </div>
  );
}
