interface PaginationProps {
  previousUrl?: string;
  nextUrl?: string;
}

export default function Pagination({ previousUrl, nextUrl }: PaginationProps) {
  // Don't render navigation if there are no pages to navigate to
  if (!previousUrl && !nextUrl) {
    return null;
  }

  return (
    <nav className="mt-12" aria-label="Pagination">
      <ul className="flex justify-between list-none p-0">
        {previousUrl ? (
          <li>
            <a href={previousUrl} className="link-primary font-medium" rel="prev" aria-label="Go to previous page">
              <span aria-hidden="true">← </span>Previous
            </a>
          </li>
        ) : (
          <li aria-hidden="true"></li>
        )}
        {nextUrl ? (
          <li>
            <a href={nextUrl} className="link-primary font-medium" rel="next" aria-label="Go to next page">
              Next<span aria-hidden="true"> →</span>
            </a>
          </li>
        ) : (
          <li aria-hidden="true"></li>
        )}
      </ul>
    </nav>
  );
}
