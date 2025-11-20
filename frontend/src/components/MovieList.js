import React, { useState, useEffect } from 'react';
import { fetchAllMovies } from '../services/api';
import MovieCard from './MovieCard';
import './MovieList.css';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        const data = await fetchAllMovies();
        setMovies(data);
        setError(null);
      } catch (err) {
        setError('Nije moguće učitati filmove. Proverite da li je backend pokrenut.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  const filteredMovies = movies.filter(movie =>
    movie.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.genres?.some(genre => genre.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Učitavanje filmova...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="movie-list-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Pretraži filmove po nazivu ili žanru..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {filteredMovies.length === 0 ? (
        <div className="no-movies">
          <p>{searchTerm ? 'Nema filmova koji odgovaraju pretrazi.' : 'Nema dostupnih filmova.'}</p>
        </div>
      ) : (
        <>
          <div className="movies-header">
            <h2>Dostupni filmovi ({filteredMovies.length})</h2>
          </div>
          <div className="movies-grid">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.imdbId} movie={movie} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MovieList;

