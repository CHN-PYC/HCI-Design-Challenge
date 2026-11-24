interface StatusBarProps {
  light?: boolean;
}

export function StatusBar({ light = false }: StatusBarProps) {
  return (
    <div
      aria-label="Status bar"
      className={light ? "status status--light" : "status"}
    >
      <span>9:41</span>
      <span className="status__icons" aria-hidden="true">
        <svg viewBox="0 0 18 12" width="18" height="12" fill="currentColor">
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
          <rect x="10" y="3" width="3" height="9" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg viewBox="0 0 16 12" width="16" height="12" fill="currentColor">
          <path d="M8 2.2c2.3 0 4.4.9 6 2.4l1.2-1.3A10.4 10.4 0 0 0 8 .4 10.4 10.4 0 0 0 .8 3.3L2 4.6a8.6 8.6 0 0 1 6-2.4Zm0 3.6c1.3 0 2.5.5 3.4 1.3l1.2-1.3A6.7 6.7 0 0 0 8 4a6.7 6.7 0 0 0-4.6 1.8l1.2 1.3c.9-.8 2.1-1.3 3.4-1.3ZM8 9.4a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6Z" />
        </svg>
        <i className="status__battery" />
      </span>
    </div>
  );
}
