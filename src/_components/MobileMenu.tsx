export default function MobileMenu() {
  return (
    <div
      id="mobile-menu"
      className="md:hidden grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-in-out"
    >
      <div className="overflow-hidden">
        <div className="space-y-2 pt-6 text-right">
          <a href="/about.html" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">about</a>
          <a href="/blog.html" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">blog</a>
          <a href="/links.html" className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">links</a>
        </div>
      </div>
    </div>
  );
}
