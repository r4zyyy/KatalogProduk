import { HashRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ProdukLayout from './layouts/ProdukLayout';
import BerandaPage from './pages/BerandaPage';
import KatalogPage from './pages/KatalogPage';
import DetailProdukPage from './pages/DetailProdukPage';
import FavoritPage from './pages/FavoritPage';
import TentangPage from './pages/TentangPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<BerandaPage />} />
          <Route path="produk" element={<ProdukLayout />}>
            <Route index element={<KatalogPage />} />
            <Route path=":id" element={<DetailProdukPage />} />
          </Route>
          <Route path="favorit" element={<FavoritPage />} />
          <Route path="tentang" element={<TentangPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
