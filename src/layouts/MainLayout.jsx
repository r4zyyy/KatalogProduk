import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

export default function MainLayout() {
  // Local state: kontrol buka/tutup menu navigasi pada layar HP
  const [menuOpen, setMenuOpen] = useState(false);

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
              Favorit
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
