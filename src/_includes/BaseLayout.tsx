interface BaseLayoutProps {
  title: string;
  children: any;
  comp: any;
}

export default ({ title, children, comp }: BaseLayoutProps) => (
  <>
    {{ __html: "<!DOCTYPE html>" }}
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>{title}</title>
        <link rel="stylesheet" href="/assets/style.css" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS Feed"
          href="/feed.xml"
        />
        <script src="/assets/toggle-theme.js"></script>
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
