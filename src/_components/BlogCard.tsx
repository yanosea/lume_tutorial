interface BlogCardProps {
  url: string;
  title: string;
  date?: Date;
  description?: string;
  tags?: string[];
  activeTag?: string;
  emoji?: string;
}

export default ({ url, title, date, description, tags, activeTag, emoji }: BlogCardProps) => {
  return (
    <article className="card-article relative">
      <a href={url} className="absolute inset-0" aria-label={title}></a>

      <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
        {emoji && <span className="text-3xl">{emoji}</span>}
        <a href={url} className="link-primary relative">
          {title}
        </a>
      </h2>

      {date && (
        <time className="text-muted text-sm">
          {new Date(date).toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }).replace(/\//g, "/")}
        </time>
      )}

      {description && <p className="text-secondary mt-3">{description}</p>}

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag: string) => (
            <a
              href={`/tags/${tag}.html`}
              className={`relative z-10 ${activeTag && tag === activeTag ? "tag-active" : "tag"}`}
            >
              #{tag}
            </a>
          ))}
        </div>
      )}
    </article>
  );
};
