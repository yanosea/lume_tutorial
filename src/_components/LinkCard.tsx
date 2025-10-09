interface LinkCardProps {
  href: string;
  title: string;
  description: string;
  icon?: string;
}

export default ({ href, title, description, icon = "🔗" }: LinkCardProps) => {
  return (
    <article className="card-article">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
        aria-label={`Visit external link: ${title} (opens in new tab)`}
      >
        <div className="flex items-start gap-4">
          <div
            className="flex-shrink-0 text-3xl"
            role="img"
            aria-label=""
            aria-hidden="true"
          >
            {icon}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="mb-2 text-xl font-semibold">
              <span className="link-primary">
                {title}
              </span>
            </h2>
            <p className="text-secondary text-sm">
              {description}
            </p>
          </div>
        </div>
      </a>
    </article>
  );
};
