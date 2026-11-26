export function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
  formatOption,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  formatOption?: (value: T) => string;
}) {
  return (
    <div aria-label={label} className="ui-segmented" role="group">
      {options.map((option) => (
        <button
          aria-pressed={value === option}
          className={value === option ? "on" : ""}
          key={option}
          onClick={() => onChange(option)}
          type="button"
        >
          {formatOption ? formatOption(option) : option}
        </button>
      ))}
    </div>
  );
}

