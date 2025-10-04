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
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="theme-color"
          content="#f8fafc"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#111827"
          media="(prefers-color-scheme: dark)"
        />
        <title>{title}</title>
        <script
          dangerouslySetInnerHTML={{
            __html:
              `(function(){const theme=localStorage.getItem("theme")||(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");if(theme==="dark"){document.documentElement.classList.add("dark");}})();`,
          }}
        >
        </script>
        <link rel="stylesheet" href="/assets/style.css" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS Feed"
          href="/feed.xml"
        />
        <script src="/assets/toggle-theme.js"></script>
        <script src="/assets/toggle-menu.js"></script>
      </head>
      <body className="font-sans bg-slate-50 dark:bg-gray-900 dark:text-gray-100 min-h-screen flex flex-col">
        <div className="max-w-7xl w-full mx-auto px-6 py-12 flex-1 flex flex-col">
          <comp.Header />
          {children}
          <comp.Footer />
        </div>
      </body>
    </html>
  </>
);
