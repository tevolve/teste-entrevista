import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { searchRepositories } from '../services/github';

const SearchRepositories = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await searchRepositories(query);
      setResults(data.items);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Search Repositories</h2>
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search repositories..."
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Search</button>
      </form>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <ul className="space-y-2">
        {results.map(repo => (
          <li key={repo.id}>
            <Link to={`/repository/${repo.owner.login}/${repo.name}`} className="text-blue-500 hover:text-blue-700">
              {repo.full_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchRepositories;