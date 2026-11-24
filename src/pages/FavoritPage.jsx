import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import ProductCard from '../components/ProductCard';
import EmptyState from '../components/EmptyState';

export default function FavoritPage() {
  const { favorites } = useFavorites();

  return (
    <section>
      <header className="page-header">
        <p className="label-caps">Koleksi Tersimpan</p>
        <h1 className="page-title">Favorit</h1>
        <p className="page-subtitle">
          {favorites.length > 0
            ? `${favorites.length} produk tersimpan di daftar favorit.`
            : 'Belum ada produk yang kamu simpan.'}
        </p>
      </header>

      {favorites.length === 0 ? (
        <EmptyState
          title="Daftar favorit masih kosong"
          description="Simpan produk dari halaman Katalog atau Detail untuk melihatnya kembali di sini."
          action={
            <Link to="/produk" className="btn btn-primary">
              Lihat Katalog
            </Link>
          }
        />
      ) : (
        <div className="product-grid">
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
