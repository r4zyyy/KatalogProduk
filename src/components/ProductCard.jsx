import { Link } from 'react-router-dom';
import { formatCategoryName, formatPrice } from '../utils/format';
import { useFavorites } from '../context/FavoritesContext';

export default function ProductCard({ product, fromSearch = '' }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite(product.id);

  return (
    <article className="product-card">
      <Link
        to={`/produk/${product.id}`}
        state={{ fromSearch }}
        className="product-card-link"
      >
        <div className="product-thumb">
          <img src={product.thumbnail} alt={product.title} loading="lazy" />
        </div>
        <div className="product-info">
          <span className="label-caps">
            {formatCategoryName(product.category)}
          </span>
          <h2 className="product-title">{product.title}</h2>
          <p className="product-price price-num">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>

      <button
        type="button"
        className={`fav-inline-btn ${saved ? 'is-saved' : ''}`}
        onClick={() => toggleFavorite(product)}
        aria-pressed={saved}
      >
        {saved ? 'Tersimpan di Favorit' : 'Simpan ke Favorit'}
      </button>
    </article>
  );
}
