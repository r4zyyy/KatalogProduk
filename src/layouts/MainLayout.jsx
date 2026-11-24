import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useFavorites } from '../context/FavoritesContext';

export default function MainLayout() {
  // Local state: kontrol buka/tutup menu navigasi pada layar HP
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { favorites } = useFavorites();

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="brand-link" onClick={closeMenu}>
            Katalog Toko
          </Link>

          <div className="header-actions">
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={
                theme === 'light' ? 'Aktifkan mode gelap' : 'Aktifkan mode terang'
              }
            >
              {theme === 'light' ? (
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
              )}
              <span>{theme === 'light' ? 'Gelap' : 'Terang'}</span>
            </button>

            <button
              type="button"
              className="menu-toggle"
              aria-expanded={menuOpen}
              aria-controls="main-navigation"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              {menuOpen ? 'Tutup' : 'Menu'}
            </button>
          </div>

          <nav
            id="main-navigation"
            className={`nav-links ${menuOpen ? 'is-open' : ''}`}
            aria-label="Navigasi utama"
          >
            <NavLink to="/" end className="nav-link" onClick={closeMenu}>
              Beranda
            </NavLink>
            <NavLink to="/produk" className="nav-link" onClick={closeMenu}>
              Katalog
            </NavLink>
            <NavLink to="/favorit" className="nav-link" onClick={closeMenu}>
              {favorites.length > 0 ? `Favorit (${favorites.length})` : 'Favorit'}
            </NavLink>
            <NavLink to="/tentang" className="nav-link" onClick={closeMenu}>
              Tentang
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <Outlet />
        </div>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <p>
            <span className="footer-identity">Muhammad Ramdhan Al Qusyairi</span>
            {' — NIM: 1247050121'}
          </p>
          <p>Katalog Produk — Data dari DummyJSON</p>
        </div>
      </footer>
    </div>
  );
}
