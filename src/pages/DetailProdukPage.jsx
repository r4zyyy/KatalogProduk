import { useParams } from 'react-router-dom';

export default function DetailProdukPage() {
  const { id } = useParams();

  return (
    <section>
      <header className="page-header">
        <p className="label-caps">Detail Barang</p>
        <h1 className="page-title">Produk #{id}</h1>
        <p className="page-subtitle">
          Kerangka halaman detail produk. Informasi lengkap dan catatan pribadi akan ditambahkan pada tahap berikutnya.
        </p>
      </header>
    </section>
  );
}
