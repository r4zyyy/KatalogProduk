export default function SearchBar({
  value,
  onChange,
  placeholder = 'Cari produk atau merek...',
  id = 'search-input',
}) {
  return (
    <div className="search-field">
      <label htmlFor={id} className="label-caps">
        Pencarian
      </label>
      <div className="search-input-wrap">
        <svg
          className="search-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          id={id}
          type="search"
          className="input-control search-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
