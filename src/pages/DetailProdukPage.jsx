import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { useFetch } from '../hooks/useFetch';
import { formatCategoryName, formatPrice } from '../utils/format';
import {
  addNoteForProduct,
  deleteNoteForProduct,
  getNotesByProduct,
} from '../utils/notesStorage';
import { useFavorites } from '../context/FavoritesContext';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import Badge from '../components/Badge';
import Button from '../components/Button';
import FormField from '../components/FormField';

const INITIAL_FORM = {
  author: '',
  rating: '',
  content: '',
};

export default function DetailProdukPage() {
  const { id } = useParams();
  const location = useLocation();
  const backUrl = `/produk${location.state?.fromSearch || ''}`;
  const { isFavorite, toggleFavorite } = useFavorites();

  // Server state: detail produk berdasarkan ID dari URL
  const {
    data: product,
    loading,
    error,
    retry,
  } = useFetch((signal) => getProductById(id, signal), [id]);

  // Local state: gambar aktif pada galeri detail produk
  const [activeImage, setActiveImage] = useState('');

  // Form state: controlled components untuk form Catatan Pribadi
  const [formValues, setFormValues] = useState(INITIAL_FORM);
  const [formErrors, setFormErrors] = useState({});
  const [notes, setNotes] = useState(() => getNotesByProduct(id));

  useEffect(() => {
    if (product) {
      setActiveImage(product.images?.[0] || product.thumbnail || '');
    }
  }, [product]);

  useEffect(() => {
    setNotes(getNotesByProduct(id));
    setFormValues(INITIAL_FORM);
    setFormErrors({});
  }, [id]);

  const handleFieldChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formValues.author.trim()) {
      errors.author = 'Nama wajib diisi.';
    }
    if (!formValues.rating) {
      errors.rating = 'Rating 1 sampai 5 wajib dipilih.';
    }
    if (formValues.content.trim().length < 10) {
      errors.content = 'Isi catatan minimal 10 karakter.';
    }
    return errors;
  };

  const handleNoteSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const newNote = {
      id: Date.now(),
      author: formValues.author.trim(),
      rating: Number(formValues.rating),
      content: formValues.content.trim(),
      createdAt: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    };

    const updated = addNoteForProduct(id, newNote);
    setNotes(updated);
    setFormValues(INITIAL_FORM);
    setFormErrors({});
  };

  const handleDeleteNote = (noteId) => {
    const updated = deleteNoteForProduct(id, noteId);
    setNotes(updated);
  };

  if (loading) {
    return <Spinner label="Memuat detail produk..." />;
  }

  if (error) {
    return (
      <div className="detail-status-wrap">
        <Link to={backUrl} className="back-link">
          &larr; Kembali ke Katalog
        </Link>
        <ErrorMessage message={error} onRetry={retry} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="detail-status-wrap">
        <Link to={backUrl} className="back-link">
          &larr; Kembali ke Katalog
        </Link>
        <EmptyState
          title="Produk tidak ditemukan"
          description="Data produk tidak tersedia."
        />
      </div>
    );
  }

  const specRows = [
    { label: 'Merek', value: product.brand || '-' },
    { label: 'Stok', value: `${product.stock ?? 0} unit` },
    { label: 'Garansi', value: product.warrantyInformation || '-' },
    {
      label: 'Berat',
      value: product.weight ? `${product.weight} g` : '-',
    },
    { label: 'SKU', value: product.sku || '-' },
    { label: 'Rating', value: `${product.rating ?? '-'} / 5` },
  ];

  return (
    <article className="detail-page">
      <div className="detail-topbar">
        <Link to={backUrl} className="back-link">
          &larr; Kembali ke Katalog
        </Link>
      </div>

      <div className="detail-layout">
        <div className="detail-media">
          <div className="detail-main-image">
            <img src={activeImage || product.thumbnail} alt={product.title} />
          </div>

          {product.images && product.images.length > 1 && (
            <div className="detail-thumbs" aria-label="Galeri gambar produk">
              {product.images.map((imgUrl, index) => (
                <button
                  key={`${imgUrl}-${index}`}
                  type="button"
                  className={`detail-thumb-btn ${
                    activeImage === imgUrl ? 'is-active' : ''
                  }`}
                  onClick={() => setActiveImage(imgUrl)}
                  aria-label={`Lihat gambar ${index + 1}`}
                >
                  <img src={imgUrl} alt={`${product.title} ${index + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="detail-body">
          <div className="detail-meta">
            <Badge>{formatCategoryName(product.category)}</Badge>
          </div>

          <h1 className="detail-title">{product.title}</h1>

          <div className="detail-price-row">
            <p className="detail-price price-num">{formatPrice(product.price)}</p>
            <Button
              variant={isFavorite(product.id) ? 'primary' : 'secondary'}
              onClick={() => toggleFavorite(product)}
              aria-pressed={isFavorite(product.id)}
            >
              {isFavorite(product.id) ? 'Hapus dari Favorit' : 'Simpan ke Favorit'}
            </Button>
          </div>

          <p className="detail-description">{product.description}</p>

          <section className="detail-specs" aria-labelledby="spec-heading">
            <h2 id="spec-heading" className="label-caps detail-section-label">
              Spesifikasi
            </h2>
            <table className="spec-table">
              <tbody>
                {specRows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td className="price-num">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>

      <section className="notes-section" aria-labelledby="notes-heading">
        <div className="notes-grid">
          <div>
            <p className="label-caps">Arsip Pribadi</p>
            <h2 id="notes-heading" className="notes-heading">
              Catatan Pribadi
            </h2>
            <p className="notes-intro">
              Catatan disimpan di browser untuk produk ini saja.
            </p>

            <form className="notes-form" onSubmit={handleNoteSubmit} noValidate>
              <FormField
                id="note-author"
                label="Nama"
                error={formErrors.author}
              >
                <input
                  id="note-author"
                  type="text"
                  className="input-control"
                  value={formValues.author}
                  onChange={(e) => handleFieldChange('author', e.target.value)}
                  placeholder="Nama lengkap atau panggilan"
                />
              </FormField>

              <FormField
                id="note-rating"
                label="Rating (1-5)"
                error={formErrors.rating}
              >
                <select
                  id="note-rating"
                  className="input-control"
                  value={formValues.rating}
                  onChange={(e) => handleFieldChange('rating', e.target.value)}
                >
                  <option value="">Pilih rating</option>
                  <option value="5">5 — Sangat baik</option>
                  <option value="4">4 — Baik</option>
                  <option value="3">3 — Cukup</option>
                  <option value="2">2 — Kurang</option>
                  <option value="1">1 — Buruk</option>
                </select>
              </FormField>

              <FormField
                id="note-content"
                label="Isi Catatan"
                error={formErrors.content}
              >
                <textarea
                  id="note-content"
                  rows="4"
                  className="input-control"
                  value={formValues.content}
                  onChange={(e) => handleFieldChange('content', e.target.value)}
                  placeholder="Tulis penilaian atau pengingat (minimal 10 karakter)"
                />
              </FormField>

              <div>
                <Button type="submit" variant="primary">
                  Simpan Catatan
                </Button>
              </div>
            </form>
          </div>

          <div className="notes-list-wrap">
            <p className="label-caps">
              Daftar Catatan ({notes.length})
            </p>
            {notes.length === 0 ? (
              <p className="notes-empty">
                Belum ada catatan untuk produk ini.
              </p>
            ) : (
              <ul className="notes-list">
                {notes.map((note) => (
                  <li key={note.id} className="note-item">
                    <div className="note-item-head">
                      <div>
                        <strong className="note-author">{note.author}</strong>
                        <span className="note-meta price-num">
                          {' · Rating '}
                          {note.rating}/5 · {note.createdAt}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        onClick={() => handleDeleteNote(note.id)}
                      >
                        Hapus
                      </Button>
                    </div>
                    <p className="note-content">{note.content}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </article>
  );
}
