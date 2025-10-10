interface BlogCardProps {
  url: string;
  title: string;
  date?: Date;
  description?: string;
  tags?: string[];
  activeTag?: string;
  emoji?: string;
}

export default (
  { url, title, date, description, tags, activeTag, emoji }: BlogCardProps,
) => {
  return (
    <article className="card-article">
      <div>
        <a href={url} className="block" aria-label={`Read article: ${title}`}>
          <h2 className="mb-2 flex items-center gap-2 text-2xl font-semibold">
            {emoji && (
              <span
                className="text-3xl"
                role="img"
                aria-label=""
                aria-hidden="true"
              >
                {emoji}
              </span>
            )}
            <span className="link-primary">
              {title}
            </span>
          </h2>

          {date && (
            <time
              className="text-muted text-sm block"
              dateTime={new Date(date).toISOString().slice(0, 10)}
            >
              {new Date(date).toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              }).replace(/\//g, "/")}
            </time>
          )}

          {description && <p className="text-secondary mt-3">{description}</p>}
        </a>
      </div>

      {tags && tags.length > 0 && (
        <div className="mt-4">
          <ul
            className="flex flex-wrap gap-2 list-none p-0"
            aria-label="Article tags"
          >
            {tags.map((tag: string) => (
              <li key={tag}>
                <a
                  href={`/tags/${tag}.html`}
                  className={activeTag && tag === activeTag
                    ? "tag-active"
                    : "tag"}
                  aria-current={activeTag && tag === activeTag
                    ? "page"
                    : undefined}
                >
                  #{tag}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
};
