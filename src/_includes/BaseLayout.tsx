interface BaseLayoutProps {
  title: string;
  children: any;
  comp: any;
  site: {
    lang: string;
  };
}

export default ({ title, children, comp, site }: BaseLayoutProps) => (
  <>
    {{ __html: "<!DOCTYPE html>" }}
    <html lang={site.lang}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1" />
        <meta name="theme-color" content="#f8fafc" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#111827" media="(prefers-color-scheme: dark)" />
        <title>{title}</title>
        <script dangerouslySetInnerHTML={{ __html: `(function(){const theme=localStorage.getItem("theme")||(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");if(theme==="dark"){document.documentElement.classList.add("dark");}})();` }}></script>
        <link rel="stylesheet" href="/assets/style.css" />
        <link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/feed.xml" />
        <script src="/assets/toggle-theme.js" defer></script>
        <script src="/assets/toggle-menu.js" defer></script>
      </head>
      <body className="flex min-h-screen flex-col bg-slate-50 font-sans dark:bg-gray-900 dark:text-gray-100">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-4 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded">
          Skip to main content
        </a>
        <comp.Header />
        <main id="main-content" className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 py-12">
          {children}
        </main>
        <comp.Footer />
      </body>
    </html>
  </>
);
