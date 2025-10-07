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
      className="block card-article"
    >
      <div className="flex items-start gap-4">
        <div className="text-3xl flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-semibold mb-2 link-primary">
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
