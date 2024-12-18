import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import MyRepositories from './MyRepositories';
import { fetchMyRepositories } from '../services/github';

jest.mock('../services/github');

const mockRepositories = [
  { id: 1, name: 'Repo 1', owner: { login: 'user1' } },
  { id: 2, name: 'Repo 2', owner: { login: 'user1' } },
];

test('renders my repositories', async () => {
  fetchMyRepositories.mockResolvedValue(mockRepositories);

  render(
    <Router>
      <MyRepositories />
    </Router>
  );

  expect(screen.getByText('Loading...')).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('Repo 1')).toBeInTheDocument();
    expect(screen.getByText('Repo 2')).toBeInTheDocument();
  });
});
