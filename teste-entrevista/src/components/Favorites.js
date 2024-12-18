import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Favorite Repositories</h2>
      {favorites.length === 0 ? (
        <p>No favorite repositories yet.</p>
      ) : (
        <ul className="space-y-2">
          {favorites.map(repo => (
            <li key={repo.id} className="flex items-center justify-between">
              <Link to={`/repository/${repo.owner.login}/${repo.name}`} className="text-blue-500 hover:text-blue-700">
                {repo.full_name}
              </Link>
              <button
                onClick={() => removeFavorite(repo.id)}
                className="bg-red-500 text-white px-2 py-1 rounded text-sm"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;