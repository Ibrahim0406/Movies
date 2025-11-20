import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.imdbId}`);
  };

  return (
    <div className="movie-card" onClick={handleClick}>
      <div className="movie-card-image-container">
        {movie.poster ? (
          <img 
            src={movie.poster} 
            alt={movie.title}
            className="movie-card-poster"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x450?text=Nema+Postera';
            }}
          />
        ) : (
          <div className="movie-card-placeholder">
            <span>Nema Postera</span>
          </div>
        )}
      </div>
      <div className="movie-card-content">
        <h3 className="movie-card-title">{movie.title || 'Bez Naziva'}</h3>
        {movie.releaseDate && (
          <p className="movie-card-date">{movie.releaseDate}</p>
        )}
        {movie.genres && movie.genres.length > 0 && (
          <div className="movie-card-genres">
            {movie.genres.slice(0, 3).map((genre, index) => (
              <span key={index} className="genre-tag">
                {genre}
              </span>
            ))}
          </div>
        )}
        {movie.reviewIds && movie.reviewIds.length > 0 && (
          <p className="movie-card-reviews">
            {movie.reviewIds.length} {movie.reviewIds.length === 1 ? 'recenzija' : 'recenzija'}
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieCard;

