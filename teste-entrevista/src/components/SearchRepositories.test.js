import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import SearchRepositories from './SearchRepositories';
import { searchRepositories } from '../services/github';

jest.mock('../services/github');

const mockSearchResults = {
  items: [
    { id: 1, full_name: 'user1/repo1', owner: { login: 'user1' } },
    { id: 2, full_name: 'user2/repo2', owner: { login: 'user2' } },
  ],
};

test('searches repositories', async () => {
  searchRepositories.mockResolvedValue(mockSearchResults);

  render(
    <Router>
      <SearchRepositories />
    </Router>
  );

  const input = screen.getByPlaceholderText('Search repositories...');
  const searchButton = screen.getByText('Search');

  fireEvent.change(input, { target: { value: 'test query' } });
  fireEvent.click(searchButton);

  await waitFor(() => {
    expect(screen.getByText('user1/repo1')).toBeInTheDocument();
    expect(screen.getByText('user2/repo2')).toBeInTheDocument();
  });
});