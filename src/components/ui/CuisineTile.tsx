import type { ReactNode } from "react";

export function CuisineTile({
  label,
  selected,
  icon,
  onClick,
}: {
  label: string;
  selected: boolean;
  icon: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      aria-label={label}
      aria-pressed={selected}
      className={selected ? "cuisine-tile ui-cuisine on" : "cuisine-tile ui-cuisine"}
      onClick={onClick}
      type="button"
    >
      <span aria-hidden="true" className="ui-cuisine__icon">
        {icon}
      </span>
      <small>{label}</small>
      <i aria-hidden="true" className="ui-cuisine__dot" />
    </button>
  );
}

