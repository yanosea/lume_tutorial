interface EmojiLinkProps {
  href: string;
  emoji: string;
  ariaLabel?: string;
}

export default function EmojiLink({ href, emoji, ariaLabel }: EmojiLinkProps) {
  return (
    <a
      href={href}
      className="nav-link text-2xl w-8 h-8 flex items-center justify-center"
      aria-label={ariaLabel}
    >
      {emoji}
    </a>
  );
}
