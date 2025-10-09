export const layout = "BaseLayout.tsx";

export default (
  { title, date, description, tags, children, readingInfo, emoji, toc, comp }: Lume.Data,
) => (
  <div className="card flex-1">
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1 prose-content lg:min-w-0">
        <article>
          <header className="mb-8">
            <h1 className="heading-page mb-4 flex items-center gap-3">
              {emoji && <span className="text-5xl" role="img" aria-hidden="true">{emoji}</span>}
              {title}
            </h1>
            {date && (
              <time
                className="text-muted text-sm block"
                dateTime={new Date(date).toISOString().split('T')[0]}
              >
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
            <ul className="flex flex-wrap gap-2 mt-4 list-none p-0" aria-label="Article tags">
              {tags.map((tag: string) => (
                <li key={tag}>
                  <a href={`/tags/${tag}.html`} className="tag">
                    #{tag}
                  </a>
                </li>
              ))}
            </ul>
          )}
          </header>
          {/* TOC for mobile - shown before content */}
          {toc && toc.length > 0 && (
            <div className="lg:hidden">
              <comp.TableOfContents toc={toc} />
            </div>
          )}
          {children}
        </article>
      </div>

      {/* TOC sidebar for desktop */}
      {toc && toc.length > 0 && (
        <aside className="hidden lg:block lg:w-80 lg:flex-shrink-0">
          <comp.TableOfContents toc={toc} />
        </aside>
      )}
    </div>
  </div>
);
