interface PaginationProps {
  previousUrl?: string;
  nextUrl?: string;
}

export default function Pagination({ previousUrl, nextUrl }: PaginationProps) {
  return (
    <nav className="mt-12" aria-label="Blog navigation">
      <ul className="flex justify-between">
        {previousUrl && (
          <li>
            <a href={previousUrl} className="link-primary font-medium" rel="prev" aria-label="Go to previous page">← prev</a>
          </li>
        )}
        {nextUrl && (
          <li className="ml-auto">
            <a href={nextUrl} className="link-primary font-medium" rel="next" aria-label="Go to next page">next →</a>
          </li>
        )}
      </ul>
    </nav>
  );
}
