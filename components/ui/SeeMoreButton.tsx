'use client';

interface SeeMoreButtonProps {
  onClick: () => void;
  expanded: boolean;
  className?: string;
  collapsible?: boolean;
}

export function SeeMoreButton({
  onClick,
  expanded,
  className = '',
  collapsible = true,
}: SeeMoreButtonProps) {
  const buttonText = collapsible && expanded ? '... see less' : '... see more';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-muted-foreground hover:text-foreground cursor-pointer text-[14px] leading-6 ${className}`}
      aria-expanded={expanded}
    >
      {buttonText}
    </button>
  );
}
