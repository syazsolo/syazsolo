'use client';

interface SeeMoreButtonProps {
  onClick: () => void;
  expanded: boolean;
  className?: string;
}

export function SeeMoreButton({
  onClick,
  expanded,
  className = '',
}: SeeMoreButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-muted-foreground hover:text-foreground cursor-pointer text-[14px] leading-6 ${className}`}
      aria-expanded={expanded}
    >
      ... see more
    </button>
  );
}
