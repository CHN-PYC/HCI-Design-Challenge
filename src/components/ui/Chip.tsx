import type { ReactNode } from "react";

export function Chip({
  children,
  selected = false,
  onClick,
  ariaLabel,
  icon,
}: {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
  icon?: ReactNode;
}) {
  const className = selected ? "ui-chip ui-chip--selected" : "ui-chip";

  if (!onClick) {
    return (
      <span className={className}>
        {icon}
        <span>{children}</span>
      </span>
    );
  }

  return (
    <button
      aria-label={ariaLabel}
      aria-pressed={selected}
      className={className}
      onClick={onClick}
      type="button"
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}

