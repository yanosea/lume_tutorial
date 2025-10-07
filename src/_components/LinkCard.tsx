interface LinkCardProps {
  href: string;
  title: string;
  description: string;
  icon?: string;
}

export default ({ href, title, description, icon = "🔗" }: LinkCardProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="card-article group block"
      aria-label={`Visit ${title}`}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 text-3xl" role="img" aria-hidden="true">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="mb-2 text-xl font-semibold !text-blue-600 group-hover:!text-blue-900 dark:!text-blue-400 dark:group-hover:!text-blue-300">
            {title}
          </h2>
          <p className="text-secondary text-sm">
            {description}
          </p>
        </div>
      </div>
    </a>
  );
};
