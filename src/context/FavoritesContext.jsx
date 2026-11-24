import { createContext, useContext, useEffect, useState } from 'react';

const FAVORITES_KEY = 'katalog_favorites';
const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  // Global state: daftar produk favorit disimpan ke localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch {
      // Abaikan jika penyimpanan browser tidak tersedia
    }
  }, [favorites]);

  const isFavorite = (id) => favorites.some((item) => item.id === Number(id));

  const toggleFavorite = (product) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          category: product.category,
          thumbnail: product.thumbnail,
        },
      ];
    });
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((item) => item.id !== Number(id)));
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, isFavorite, toggleFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error('useFavorites harus dipakai di dalam FavoritesProvider');
  }
  return ctx;
}
