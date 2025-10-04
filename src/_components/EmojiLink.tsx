interface EmojiLinkProps {
  href: string;
  emoji: string;
  ariaLabel?: string;
}

export default function EmojiLink({ href, emoji, ariaLabel }: EmojiLinkProps) {
  return (
    <a
      href={href}
      className="nav-link flex items-center justify-center w-8 h-8 text-2xl"
      aria-label={ariaLabel}
    >
      {emoji}
    </a>
  );
}
