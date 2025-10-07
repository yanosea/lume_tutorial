interface PaginationProps {
  previousUrl?: string;
  nextUrl?: string;
}

export default function Pagination({ previousUrl, nextUrl }: PaginationProps) {
  return (
    <nav className="mt-12 flex justify-between" aria-label="Pagination">
      {previousUrl && (
        <a href={previousUrl} className="link-primary font-medium" rel="prev">← prev</a>
      )}
      {nextUrl && (
        <a href={nextUrl} className="link-primary ml-auto font-medium" rel="next">next →</a>
      )}
    </nav>
  );
}
