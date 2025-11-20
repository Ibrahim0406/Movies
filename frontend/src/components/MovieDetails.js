import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovieByImdbId, createReview } from '../services/api';
import ReviewForm from './ReviewForm';
import './MovieDetails.css';

const MovieDetails = () => {
  const { imdbId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        setLoading(true);
        const data = await fetchMovieByImdbId(imdbId);
        if (data) {
          setMovie(data);
          setReviews(data.reviewIds || []);
        } else {
          setError('Film nije pronađen');
        }
        setError(null);
      } catch (err) {
        setError('Greška pri učitavanju filma. Proverite da li je backend pokrenut.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [imdbId]);

  const handleReviewSubmit = async (reviewBody) => {
    try {
      const newReview = await createReview(reviewBody, imdbId);
      setReviews([...reviews, newReview]);
      setShowReviewForm(false);
      // Reload movie to get updated data
      const updatedMovie = await fetchMovieByImdbId(imdbId);
      if (updatedMovie) {
        setMovie(updatedMovie);
        setReviews(updatedMovie.reviewIds || []);
      }
    } catch (err) {
      alert('Greška pri dodavanju recenzije. Pokušajte ponovo.');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Učitavanje detalja filma...</p>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="error-container">
        <p className="error-message">{error || 'Film nije pronađen'}</p>
        <button onClick={() => navigate('/')} className="back-button">
          Nazad na listu filmova
        </button>
      </div>
    );
  }

  return (
    <div className="movie-details-container">
      <button onClick={() => navigate('/')} className="back-button">
        ← Nazad na listu filmova
      </button>

      <div className="movie-details-content">
        <div className="movie-details-poster-section">
          {movie.poster ? (
            <img 
              src={movie.poster} 
              alt={movie.title}
              className="movie-details-poster"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x600?text=Nema+Postera';
              }}
            />
          ) : (
            <div className="movie-details-placeholder">
              <span>Nema Postera</span>
            </div>
          )}
        </div>

        <div className="movie-details-info">
          <h1 className="movie-details-title">{movie.title}</h1>
          
          {movie.releaseDate && (
            <p className="movie-details-date">
              <strong>Datum izlaska:</strong> {movie.releaseDate}
            </p>
          )}

          {movie.genres && movie.genres.length > 0 && (
            <div className="movie-details-genres">
              <strong>Žanrovi:</strong>
              <div className="genres-list">
                {movie.genres.map((genre, index) => (
                  <span key={index} className="genre-tag-large">
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          )}

          {movie.trailerLink && (
            <div className="movie-details-trailer">
              <a 
                href={movie.trailerLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="trailer-button"
              >
                🎬 Pogledaj Trailer
              </a>
            </div>
          )}

          {movie.backdrops && movie.backdrops.length > 0 && (
            <div className="movie-details-backdrops">
              <h3>Galerija</h3>
              <div className="backdrops-grid">
                {movie.backdrops.slice(0, 6).map((backdrop, index) => (
                  <img 
                    key={index}
                    src={backdrop} 
                    alt={`${movie.title} backdrop ${index + 1}`}
                    className="backdrop-image"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="movie-details-reviews-section">
            <div className="reviews-header">
              <h2>Recenzije ({reviews.length})</h2>
              <button 
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="add-review-button"
              >
                {showReviewForm ? 'Otkaži' : '+ Dodaj Recenziju'}
              </button>
            </div>

            {showReviewForm && (
              <ReviewForm 
                onSubmit={handleReviewSubmit}
                onCancel={() => setShowReviewForm(false)}
              />
            )}

            {reviews.length === 0 ? (
              <p className="no-reviews">Nema recenzija za ovaj film. Budite prvi koji će dodati recenziju!</p>
            ) : (
              <div className="reviews-list">
                {reviews.map((review, index) => (
                  <div key={review.id || index} className="review-item">
                    <p className="review-body">{review.body}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

