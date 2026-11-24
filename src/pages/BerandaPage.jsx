import { Link } from 'react-router-dom';
import { getCategories, getProducts } from '../services/productService';
import { useFetch } from '../hooks/useFetch';
import { formatCategoryName } from '../utils/format';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';

export default function BerandaPage() {
  // Server state: ambil produk dan kategori untuk halaman ringkasan beranda
  const { data: products, loading, error, retry } = useFetch(getProducts, []);
  const { data: categories } = useFetch(getCategories, []);

  const featuredProducts = products ? products.slice(0, 8) : [];

  return (
    <div className="home-page">
      <section className="home-intro">
        <p className="label-caps">Arsip Katalog</p>
        <h1 className="page-title">Katalog Produk</h1>
        <p className="home-lead">
          Aplikasi web katalog produk berbasis React dan DummyJSON API yang disusun untuk tugas kuliah React Routing, State Management, Data Fetching, dan Application Architecture.
        </p>
      </section>

      <section className="home-section" aria-labelledby="featured-heading">
        <div className="section-head">
          <h2 id="featured-heading" className="section-title">
            Produk Pilihan
          </h2>
          <Link to="/produk" className="text-link">
            Lihat semua katalog &rarr;
          </Link>
        </div>

        {loading && <Spinner label="Memuat produk pilihan..." />}

        {!loading && error && <ErrorMessage message={error} onRetry={retry} />}

        {!loading && !error && featuredProducts.length > 0 && (
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {categories && categories.length > 0 && (
        <section className="home-section" aria-labelledby="categories-heading">
          <div className="section-head">
            <h2 id="categories-heading" className="section-title">
              Daftar Kategori
            </h2>
          </div>

          <ul className="category-link-list">
            {categories.map((cat) => {
              const slug = typeof cat === 'string' ? cat : cat.slug;
              const name =
                typeof cat === 'string' ? formatCategoryName(cat) : cat.name;
              return (
                <li key={slug}>
                  <Link
                    to={`/produk?kategori=${encodeURIComponent(slug)}`}
                    className="category-text-link"
                  >
                    {name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}
