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
      </head>
      <body className="font-sans bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen flex flex-col">
        <div className="max-w-7xl w-full mx-auto px-6 py-12 flex-1 flex flex-col">
          <comp.Header />
          {children}
          <comp.Footer />
        </div>
      </body>
    </html>
  </>
);
