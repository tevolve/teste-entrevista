import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import RepositoryDetails from './RepositoryDetails';
import { FavoritesProvider } from '../contexts/FavoritesContext';
import { fetchRepositoryDetails, fetchContributors } from '../services/github';

jest.mock('../services/github');

const mockRepository = {
  id: 1,
  name: 'Test Repo',
  description: 'A test repository',
  language: 'JavaScript',
  updated_at: '2023-05-01T00:00:00Z',
  owner: { login: 'testuser' },
};

const mockContributors = [
  { id: 1, login: 'contributor1' },
  { id: 2, login: 'contributor2' },
];

test('renders repository details', async () => {
  fetchRepositoryDetails.mockResolvedValue(mockRepository);
  fetchContributors.mockResolvedValue(mockContributors);

  render(
    <MemoryRouter initialEntries={['/repository/testuser/test-repo']}>
      <FavoritesProvider>
        <Routes>
          <Route path="/repository/:owner/:name" element={<RepositoryDetails />} />
        </Routes>
      </FavoritesProvider>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText('Test Repo')).toBeInTheDocument();
    expect(screen.getByText('A test repository')).toBeInTheDocument();
    expect(screen.getByText('Language: JavaScript')).toBeInTheDocument();
    expect(screen.getByText('Owner: testuser')).toBeInTheDocument();
    expect(screen.getByText('contributor1')).toBeInTheDocument();
    expect(screen.getByText('contributor2')).toBeInTheDocument();
  });
});
