export default function Spinner({ label = 'Memuat data...' }) {
  return (
    <div className="status-box" role="status" aria-live="polite">
      <svg
        className="spinner-icon"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="2"
          strokeOpacity="0.2"
        />
        <path
          d="M21 12a9 9 0 0 0-9-9"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
        />
      </svg>
      <p className="status-text">{label}</p>
    </div>
  );
}
