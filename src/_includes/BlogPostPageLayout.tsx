export const layout = "BaseLayout.tsx";

export default (
  { title, date, description, tags, children }: Lume.Data,
) => (
  <main className="card flex-1 prose-content">
    <div className="mb-8">
      <h1 className="heading-page mb-4">{title}</h1>
      {date && (
        <time className="text-muted text-sm">
          {new Date(date).toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }).replace(/\//g, "/")}
        </time>
      )}
      {description && (
        <p className="text-secondary mt-2 text-lg">{description}</p>
      )}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag: string) => (
            <a
              key={tag}
              href={`/tags/${tag}.html`}
              className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
            >
              {tag}
            </a>
          ))}
        </div>
      )}
    </div>
    {children}
  </main>
);
