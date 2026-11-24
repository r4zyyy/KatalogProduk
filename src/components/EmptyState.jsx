export default function EmptyState({
  title = 'Belum ada produk yang cocok',
  description = 'Coba ubah kata kunci atau pilih kategori lain.',
  action = null,
}) {
  return (
    <div className="status-box">
      <p className="status-title">{title}</p>
      {description && <p className="status-text">{description}</p>}
      {action && <div className="status-action">{action}</div>}
    </div>
  );
}
