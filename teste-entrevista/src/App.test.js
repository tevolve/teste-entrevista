
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

test('renders navigation links', () => {
  render(<App />);
  const myReposLink = screen.getByText(/My Repositories/i);
  const searchLink = screen.getByText(/Search Repositories/i);
  const favoritesLink = screen.getByText(/Favorites/i);
  expect(myReposLink).toBeInTheDocument();
  expect(searchLink).toBeInTheDocument();
  expect(favoritesLink).toBeInTheDocument();
});