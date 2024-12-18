import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchMyRepositories } from '../services/github';

const MyRepositories = () => {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const data = await fetchMyRepositories('your-github-username');
        setRepositories(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Repositories</h2>
      <ul className="space-y-2">
        {repositories.map(repo => (
          <li key={repo.id}>
            <Link to={`/repository/${repo.owner.login}/${repo.name}`} className="text-blue-500 hover:text-blue-700">
              {repo.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyRepositories;