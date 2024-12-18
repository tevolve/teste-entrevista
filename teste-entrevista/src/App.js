import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FavoritesProvider } from './contexts/FavoritesContext';
import MyRepositories from './components/MyRepositories';
import SearchRepositories from './components/SearchRepositories';
import RepositoryDetails from './components/RepositoryDetails';
import Favorites from './components/Favorites';

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <div className="container mx-auto px-4 py-8">
          <nav className="mb-8">
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="text-blue-500 hover:text-blue-700">My Repositories</Link>
              </li>
              <li>
                <Link to="/search" className="text-blue-500 hover:text-blue-700">Search Repositories</Link>
              </li>
              <li>
                <Link to="/favorites" className="text-blue-500 hover:text-blue-700">Favorites</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<MyRepositories />} />
            <Route path="/search" element={<SearchRepositories />} />
            <Route path="/repository/:owner/:name" element={<RepositoryDetails />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>
      </Router>
    </FavoritesProvider>
  );
}

export default App;
