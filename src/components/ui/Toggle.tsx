export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      aria-label={label}
      aria-checked={checked}
      className={checked ? "ui-toggle on" : "ui-toggle"}
      onClick={onChange}
      role="switch"
      type="button"
    >
      <span aria-hidden="true" className="ui-toggle__knob" />
    </button>
  );
}

