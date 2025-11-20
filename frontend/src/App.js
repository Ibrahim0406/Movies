import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <h1>🎬 Kinematika </h1>
          <p>Pregled filmova i recenzija</p>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/movie/:imdbId" element={<MovieDetails />} />
          </Routes>
        </main>
        <footer className="app-footer">
          <p>&copy; 2025 Kinematika. Sva prava zadržana.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;

