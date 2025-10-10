export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full" role="contentinfo">
      <div
        className="mx-auto flex min-h-[var(--header-footer-height)] max-w-7xl items-center justify-center border-t px-6 text-center text-sm"
        style={{
          minHeight: "var(--header-footer-height)",
          borderColor: "var(--color-border-primary)",
          color: "var(--color-fg-muted)",
        }}
      >
        <p>
          <small>© {currentYear} John Doe. All rights reserved.</small>
        </p>
      </div>
    </footer>
  );
}
