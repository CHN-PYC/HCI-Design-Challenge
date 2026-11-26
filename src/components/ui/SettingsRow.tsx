import type { ReactNode } from "react";

export function SettingsRow({
  title,
  description,
  trailing,
  onClick,
  label,
}: {
  title: string;
  description?: string;
  trailing?: ReactNode;
  onClick?: () => void;
  label?: string;
}) {
  const content = (
    <>
      <span className="ui-settings-row__copy">
        <strong>{title}</strong>
        {description ? <small>{description}</small> : null}
      </span>
      {trailing ?? (
        <span aria-hidden="true" className="ui-settings-row__chevron">
          ›
        </span>
      )}
    </>
  );

  if (!onClick) {
    return <div className="ui-settings-row">{content}</div>;
  }

  return (
    <button
      aria-label={label ?? title}
      className="ui-settings-row"
      onClick={onClick}
      type="button"
    >
      {content}
    </button>
  );
}

