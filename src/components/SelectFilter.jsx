export default function SelectFilter({
  id,
  label,
  value,
  onChange,
  options,
}) {
  return (
    <div className="filter-group">
      <label htmlFor={id} className="label-caps">
        {label}
      </label>
      <select
        id={id}
        className="input-control select-control"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
