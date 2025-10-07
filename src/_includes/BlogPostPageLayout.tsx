export const layout = "BaseLayout.tsx";

export default (
  { title, date, description, tags, children, readingInfo, emoji }: Lume.Data,
) => (
  <main className="card flex-1 prose-content">
    <div className="mb-8">
      <h1 className="heading-page mb-4 flex items-center gap-3">
        {emoji && <span className="text-5xl" role="img" aria-hidden="true">{emoji}</span>}
        {title}
      </h1>
      {date && (
        <time className="text-muted text-sm block">
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
      {readingInfo && (
        <p className="text-muted text-sm mt-2">
          {readingInfo.words} words - {readingInfo.minutes} min read
        </p>
      )}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag: string) => (
            <a href={`/tags/${tag}.html`} className="relative z-10 tag">
              #{tag}
            </a>
          ))}
        </div>
      )}
    </div>
    {children}
  </main>
);
