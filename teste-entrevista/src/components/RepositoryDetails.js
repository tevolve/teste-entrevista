import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRepositoryDetails, fetchContributors } from '../services/github';
import { useFavorites } from '../contexts/FavoritesContext';

const RepositoryDetails = () => {
  const { owner, name } = useParams();
  const [repository, setRepository] = useState(null);
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [repoData, contributorsData] = await Promise.all([
          fetchRepositoryDetails(owner, name),
          fetchContributors(owner, name)
        ]);
        setRepository(repoData);
        setContributors(contributorsData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [owner, name]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!repository) return null;

  const handleFavoriteToggle = () => {
    if (isFavorite(repository.id)) {
      removeFavorite(repository.id);
    } else {
      addFavorite(repository);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{repository.name}</h2>
      <p className="mb-2">{repository.description}</p>
      <p className="mb-2">Language: {repository.language}</p>
      <p className="mb-2">Last Updated: {new Date(repository.updated_at).toLocaleDateString()}</p>
      <p className="mb-2">Owner: {repository.owner.login}</p>
      <button
        onClick={handleFavoriteToggle}
        className={`px-4 py-2 rounded ${
          isFavorite(repository.id) ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
        }`}
      >
        {isFavorite(repository.id) ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
      <h3 className="text-xl font-bold mt-8 mb-4">Contributors</h3>
      <ul className="space-y-2">
        {contributors.map(contributor => (
          <li key={contributor.id}>{contributor.login}</li>
        ))}
      </ul>
    </div>
  );
};

export default RepositoryDetails;
