interface PaginationProps {
  previousUrl?: string;
  nextUrl?: string;
}

export default function Pagination({ previousUrl, nextUrl }: PaginationProps) {
  return (
    <nav className="mt-12" aria-label="Pagination">
      <ul className="flex justify-between">
        {previousUrl && (
          <li>
            <a href={previousUrl} className="link-primary font-medium" rel="prev">← prev</a>
          </li>
        )}
        {nextUrl && (
          <li className="ml-auto">
            <a href={nextUrl} className="link-primary font-medium" rel="next">next →</a>
          </li>
        )}
      </ul>
    </nav>
  );
}
