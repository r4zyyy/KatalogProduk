import Button from './Button';

export default function ErrorMessage({
  message = 'Gagal memuat data.',
  onRetry,
}) {
  return (
    <div className="status-box status-error" role="alert">
      <p className="label-caps">Terjadi Kesalahan</p>
      <p className="status-text">{message}</p>
      {onRetry && (
        <Button variant="primary" onClick={onRetry}>
          Coba lagi
        </Button>
      )}
    </div>
  );
}
