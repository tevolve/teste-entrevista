const BASE_URL = 'https://api.github.com';

export const fetchMyRepositories = async (username) => {
  const response = await fetch(`${BASE_URL}/users/${username}/repos`);
  if (!response.ok) throw new Error('Failed to fetch repositories');
  return response.json();
};

export const searchRepositories = async (query) => {
  const response = await fetch(`${BASE_URL}/search/repositories?q=${query}`);
  if (!response.ok) throw new Error('Failed to search repositories');
  return response.json();
};

export const fetchRepositoryDetails = async (owner, name) => {
  const response = await fetch(`${BASE_URL}/repos/${owner}/${name}`);
  if (!response.ok) throw new Error('Failed to fetch repository details');
  return response.json();
};

export const fetchContributors = async (owner, name) => {
  const response = await fetch(`${BASE_URL}/repos/${owner}/${name}/contributors`);
  if (!response.ok) throw new Error('Failed to fetch contributors');
  return response.json();
};
