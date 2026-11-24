import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section>
      <header className="page-header">
        <p className="label-caps">404</p>
        <h1 className="page-title">Halaman tidak ditemukan</h1>
        <p className="page-subtitle">
          Alamat yang kamu buka tidak tersedia di katalog ini.
        </p>
      </header>
      <Link to="/" className="nav-link active">
        Kembali ke Beranda
      </Link>
    </section>
  );
}
