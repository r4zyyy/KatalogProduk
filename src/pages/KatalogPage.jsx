import { useEffect, useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getCategories, getProducts } from '../services/productService';
import { useFetch } from '../hooks/useFetch';
import { useDebounce } from '../hooks/useDebounce';
import { formatCategoryName } from '../utils/format';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import SelectFilter from '../components/SelectFilter';
import Pagination from '../components/Pagination';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import Button from '../components/Button';

const ITEMS_PER_PAGE = 12;

const SORT_OPTIONS = [
  { value: '', label: 'Urutan bawaan' },
  { value: 'harga-asc', label: 'Harga: terendah' },
  { value: 'harga-desc', label: 'Harga: tertinggi' },
  { value: 'nama-asc', label: 'Nama: A - Z' },
  { value: 'rating-desc', label: 'Rating tertinggi' },
];

export default function KatalogPage() {
  const location = useLocation();
  // URL state: kata kunci, kategori, urutan, dan nomor halaman disimpan di URL
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParam = searchParams.get('q') || '';
  const categoryParam = searchParams.get('kategori') || '';
  const sortParam = searchParams.get('urut') || '';
  const rawPage = Number.parseInt(searchParams.get('hal') || '1', 10);
  const currentPage = Number.isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;

  // Local state: input pencarian sebelum debounce & buka/tutup panel filter di HP
  const [searchInput, setSearchInput] = useState(queryParam);
  const [filterOpen, setFilterOpen] = useState(false);

  const debouncedSearch = useDebounce(searchInput, 300);

  // Sinkronkan input lokal jika URL berubah (misal tombol back/reset)
  useEffect(() => {
    setSearchInput(queryParam);
  }, [queryParam]);

  // Perbarui URL state saat nilai pencarian yang sudah di-debounce berubah
  useEffect(() => {
    const trimmed = debouncedSearch.trim();
    if (trimmed === queryParam) return;

    const next = new URLSearchParams(searchParams);
    if (trimmed) {
      next.set('q', trimmed);
    } else {
      next.delete('q');
    }
    next.set('hal', '1');
    setSearchParams(next, { replace: true });
  }, [debouncedSearch, queryParam, searchParams, setSearchParams]);

  // Server state: seluruh produk dan daftar kategori dari DummyJSON
  const { data: products, loading, error, retry } = useFetch(getProducts, []);
  const { data: categories } = useFetch(getCategories, []);

  const categoryOptions = useMemo(() => {
    const base = [{ value: '', label: 'Semua kategori' }];
    if (!categories) return base;

    const mapped = categories.map((cat) => {
      const slug = typeof cat === 'string' ? cat : cat.slug;
      const name = typeof cat === 'string' ? formatCategoryName(cat) : cat.name;
      return { value: slug, label: name };
    });
    return [...base, ...mapped];
  }, [categories]);

  const updateUrlParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    if (key !== 'hal') {
      next.set('hal', '1');
    }
    setSearchParams(next);
  };

  const resetFilters = () => {
    setSearchInput('');
    setSearchParams({});
  };

  // Olah filter, pencarian, dan pengurutan di sisi client
  const filteredProducts = useMemo(() => {
    if (!products) return [];

    const keyword = queryParam.toLowerCase();

    const matched = products.filter((item) => {
      const matchCategory = !categoryParam || item.category === categoryParam;
      const matchSearch =
        !keyword ||
        item.title.toLowerCase().includes(keyword) ||
        (item.brand && item.brand.toLowerCase().includes(keyword));
      return matchCategory && matchSearch;
    });

    if (!sortParam) return matched;

    return [...matched].sort((a, b) => {
      if (sortParam === 'harga-asc') return a.price - b.price;
      if (sortParam === 'harga-desc') return b.price - a.price;
      if (sortParam === 'nama-asc') return a.title.localeCompare(b.title);
      if (sortParam === 'rating-desc') return b.rating - a.rating;
      return 0;
    });
  }, [products, queryParam, categoryParam, sortParam]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedProducts = useMemo(() => {
    const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, safePage]);

  const hasActiveFilter = Boolean(queryParam || categoryParam || sortParam);

  return (
    <section>
      <header className="page-header page-header-row">
        <div>
          <p className="label-caps">Daftar Barang</p>
          <h1 className="page-title">Katalog</h1>
          {!loading && !error && products && (
            <p className="page-subtitle">
              Menampilkan {filteredProducts.length} dari {products.length} produk.
            </p>
          )}
        </div>

        <Button
          variant="secondary"
          className="filter-toggle-btn"
          aria-expanded={filterOpen}
          aria-controls="catalog-sidebar"
          onClick={() => setFilterOpen((prev) => !prev)}
        >
          {filterOpen ? 'Tutup Filter' : 'Filter & Urutkan'}
        </Button>
      </header>

      <div className="catalog-layout">
        <aside
          id="catalog-sidebar"
          className={`catalog-sidebar ${filterOpen ? 'is-open' : ''}`}
          aria-label="Filter katalog"
        >
          <SearchBar
            value={searchInput}
            onChange={setSearchInput}
            placeholder="Cari produk atau merek..."
          />

          <SelectFilter
            id="filter-category"
            label="Kategori"
            value={categoryParam}
            onChange={(val) => updateUrlParam('kategori', val)}
            options={categoryOptions}
          />

          <SelectFilter
            id="filter-sort"
            label="Urutkan"
            value={sortParam}
            onChange={(val) => updateUrlParam('urut', val)}
            options={SORT_OPTIONS}
          />

          {hasActiveFilter && (
            <Button variant="ghost" onClick={resetFilters}>
              Reset filter
            </Button>
          )}
        </aside>

        <div className="catalog-content">
          {loading && <Spinner label="Memuat daftar produk..." />}

          {!loading && error && <ErrorMessage message={error} onRetry={retry} />}

          {!loading && !error && filteredProducts.length === 0 && (
            <EmptyState
              title="Belum ada produk yang cocok"
              description="Coba ubah kata kunci pencarian atau pilih kategori lain."
              action={
                hasActiveFilter ? (
                  <Button variant="secondary" onClick={resetFilters}>
                    Reset filter
                  </Button>
                ) : null
              }
            />
          )}

          {!loading && !error && paginatedProducts.length > 0 && (
            <>
              <div className="product-grid">
                {paginatedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    fromSearch={location.search}
                  />
                ))}
              </div>

              <Pagination
                currentPage={safePage}
                totalPages={totalPages}
                onPageChange={(page) => {
                  updateUrlParam('hal', String(page));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
