import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="not-found-page">
      <header className="page-header">
        <p className="label-caps">404</p>
        <h1 className="page-title">Halaman tidak ditemukan</h1>
        <p className="page-subtitle">
          Alamat yang kamu buka tidak tersedia di katalog ini.
        </p>
      </header>

      <div className="not-found-actions">
        <Link to="/" className="btn btn-primary">
          Kembali ke Beranda
        </Link>
        <Link to="/produk" className="btn btn-secondary">
          Buka Katalog
        </Link>
      </div>
    </section>
  );
}
