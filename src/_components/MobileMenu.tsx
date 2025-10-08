export default function MobileMenu() {
  return (
    <div
      id="mobile-menu"
      className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-in-out md:hidden"
    >
      <div className="min-h-0 overflow-hidden">
        <div className="space-y-2 pt-6 pl-4">
          <a href="/about.html" className="block nav-link">about</a>
          <a href="/blog.html" className="block nav-link">blog</a>
          <a href="/links.html" className="block nav-link">links</a>
        </div>
      </div>
    </div>
  );
}
