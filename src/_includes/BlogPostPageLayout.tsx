export const layout = "BaseLayout.tsx";

export default (
  { title, date, description, tags, children, readingInfo, emoji, toc, comp }:
    Lume.Data,
) => (
  <div className="card flex-1">
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1 prose-content lg:min-w-0">
        <article>
          <div className="mb-8">
            <h1 className="heading-page mb-4 flex items-center gap-3">
              {emoji && (
                <span
                  className="text-5xl"
                  role="img"
                  aria-label=""
                  aria-hidden="true"
                >
                  {emoji}
                </span>
              )}
              {title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              {date && (
                <time
                  className="text-muted"
                  dateTime={new Date(date).toISOString().split("T")[0]}
                >
                  {new Date(date).toLocaleDateString("ja-JP", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  }).replace(/\//g, "/")}
                </time>
              )}
              {readingInfo && (
                <span className="text-muted">
                  {readingInfo.words} words · {readingInfo.minutes} min read
                </span>
              )}
            </div>
            {description && (
              <p className="text-secondary mt-3 text-lg">{description}</p>
            )}
            {tags && tags.length > 0 && (
              <nav aria-label="Article tags">
                <ul className="flex flex-wrap gap-2 mt-4 list-none p-0">
                  {tags.map((tag: string) => (
                    <li key={tag}>
                      <a href={`/tags/${tag}.html`} className="tag">
                        #{tag}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
          {/* TOC for mobile - shown before content */}
          {toc && toc.length > 0 && (
            <nav className="lg:hidden" aria-label="Table of Contents">
              <comp.TableOfContents toc={toc} />
            </nav>
          )}
          {children}
        </article>
      </div>

      {/* TOC sidebar for desktop */}
      {toc && toc.length > 0 && (
        <aside
          className="hidden lg:block lg:w-80 lg:flex-shrink-0"
          role="complementary"
          aria-label="Table of Contents"
        >
          <comp.TableOfContents toc={toc} />
        </aside>
      )}
    </div>
  </div>
);
