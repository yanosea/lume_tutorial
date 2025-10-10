interface BaseLayoutProps {
  title: string;
  children: any;
  comp: any;
  site: {
    lang: string;
    siteName: string;
  };
}

export default ({ title, children, comp, site }: BaseLayoutProps) => (
  <>
    {{ __html: "<!DOCTYPE html>" }}
    <html lang={site.lang}>
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1"
        />
        <meta
          name="theme-color"
          content="#fdf6e3"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#2d353b"
          media="(prefers-color-scheme: dark)"
        />
        <title>{title} | {site.siteName}</title>
        <link
          rel="preload"
          href="/assets/fonts/PlemolJP-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: "html{visibility:hidden;opacity:0;}",
          }}
        >
        </style>
        <script src="/assets/init.js"></script>
        <link rel="stylesheet" href="/assets/style.css" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS Feed"
          href="/feed.xml"
        />
        <script src="/assets/toggle-theme.js" defer></script>
        <script src="/assets/toggle-menu.js" defer></script>
        <script src="/assets/utterances.js" defer></script>
      </head>
      <body className="flex min-h-screen flex-col bg-primary text-primary">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-4 focus:px-4 focus:py-2 focus:rounded focus:outline-none focus:ring-2 focus:skip-link"
        >
          Skip to main content
        </a>
        <comp.Header />
        <main
          id="main-content"
          className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 py-12"
          role="main"
        >
          {children}
        </main>
        <comp.Footer />
      </body>
    </html>
  </>
);
