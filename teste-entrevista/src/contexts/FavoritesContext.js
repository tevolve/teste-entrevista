import React, { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
  return useContext(FavoritesContext);
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (repo) => {
    setFavorites((prevFavorites) => [...prevFavorites, repo]);
  };

  const removeFavorite = (repoId) => {
    setFavorites((prevFavorites) => prevFavorites.filter(repo => repo.id !== repoId));
  };

  // Função isFavorite que verifica se um repositório está nos favoritos
  const isFavorite = (repoId) => {
    return favorites.some((repo) => repo.id === repoId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
