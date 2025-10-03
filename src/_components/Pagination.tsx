interface PaginationProps {
  previousUrl?: string;
  nextUrl?: string;
}

export default function Pagination({ previousUrl, nextUrl }: PaginationProps) {
  return (
    <nav className="flex justify-between mt-12">
      {previousUrl
        ? (
          <a
            href={previousUrl}
            className="link-primary transition-colors font-medium"
          >
            ← prev
          </a>
        )
        : <div className="flex-1" />}
      {nextUrl
        ? (
          <a
            href={nextUrl}
            className="link-primary transition-colors font-medium"
          >
            next →
          </a>
        )
        : <div className="flex-1" />}
    </nav>
  );
}
