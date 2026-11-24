export default function FormField({ id, label, error, children }) {
  return (
    <div className="form-field">
      <label htmlFor={id} className="label-caps">
        {label}
      </label>
      {children}
      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
