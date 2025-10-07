export default function MobileMenu() {
  return (
    <div
      id="mobile-menu"
      className="grid grid-rows-[0fr] overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out md:hidden"
    >
      <div className="space-y-2 pt-6 text-right">
        <a href="/about.html" className="block text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">about</a>
        <a href="/blog.html" className="block text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">blog</a>
        <a href="/links.html" className="block text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">links</a>
      </div>
    </div>
  );
}
