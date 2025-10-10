interface TocItem {
  text: string;
  slug: string;
  level: number;
}

interface TableOfContentsProps {
  toc: TocItem[];
}

export default ({ toc }: TableOfContentsProps) => {
  if (!toc || toc.length === 0) {
    return null;
  }

  // Calculate relative indentation based on minimum level
  const minLevel = Math.min(...toc.map((item) => item.level));

  // Manage counters for each hierarchy level
  const counters: { [key: number]: number } = {};

  return (
    <div
      className="card-toc mb-8 lg:mb-0 lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto"
      role="navigation"
      aria-labelledby="toc-heading"
    >
      <h2
        id="toc-heading"
        className="text-xl font-bold"
        style={{ color: "var(--color-fg-primary)" }}
      >
        Table of Contents
      </h2>
      <ol className="space-y-1 list-none">
        {toc.map((item, index) => {
          const relativeLevel = item.level - minLevel;
          const indentClass = relativeLevel === 0
            ? "ml-0"
            : relativeLevel === 1
            ? "ml-4"
            : relativeLevel === 2
            ? "ml-8"
            : relativeLevel === 3
            ? "ml-12"
            : relativeLevel === 4
            ? "ml-16"
            : "ml-20";

          // Increment counter for current level
          counters[relativeLevel] = (counters[relativeLevel] || 0) + 1;

          // Reset counters for deeper levels
          Object.keys(counters).forEach((key) => {
            const level = parseInt(key);
            if (level > relativeLevel) {
              counters[level] = 0;
            }
          });

          // Generate numbering (e.g., 1.1.1)
          const number = Array.from({ length: relativeLevel + 1 }, (_, i) =>
            counters[i] || 0).join(".");

          return (
            <li
              key={item.slug}
              className={`${indentClass} flex items-start`}
            >
              <span className="text-muted select-none mr-2" aria-hidden="true">
                {number}.
              </span>
              <a
                href={`#${item.slug}`}
                className="link-primary text-sm transition-colors duration-200"
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
