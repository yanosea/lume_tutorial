export default ({ title, children, comp }: Lume.Data) => (
  <>
    {{ __html: "<!DOCTYPE html>" }}
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>{title}</title>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body className="font-sans max-w-4xl mx-auto my-12 px-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
        <comp.header />
        <main className="bg-white rounded-lg shadow-lg p-8 mt-8 prose prose-headings:font-bold prose-headings:text-gray-800 prose-h1:text-3xl prose-h1:mb-6 prose-h2:text-2xl prose-h2:mb-4 prose-p:my-2 max-w-none">
          {children}
        </main>
      </body>
    </html>
  </>
);
