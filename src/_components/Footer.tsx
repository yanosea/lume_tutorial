export default function Footer() {
  return (
    <footer className="w-full" role="contentinfo">
      <div className="mx-auto max-w-7xl border-t border-gray-200 px-6 py-8 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
        <p>© {new Date().getFullYear()} John Doe</p>
      </div>
    </footer>
  );
}
