export const layout = "BaseLayout.tsx";

export default (
  { title, date, description, tags, children }: Lume.Data,
) => (
  <main className="bg-white rounded-lg shadow-lg p-8 flex-1 prose-content">
    <header className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-normal">{title}</h1>
      {date && (
        <time className="text-gray-600 text-sm">
          {new Date(date).toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }).replace(/\//g, "/")}
        </time>
      )}
      {description && (
        <p className="text-gray-700 mt-2 text-lg">{description}</p>
      )}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag: string) => (
            <a
              key={tag}
              href={`/tags/${tag}.html`}
              className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full hover:bg-blue-200 transition-colors"
            >
              {tag}
            </a>
          ))}
        </div>
      )}
    </header>
    {children}
  </main>
);
