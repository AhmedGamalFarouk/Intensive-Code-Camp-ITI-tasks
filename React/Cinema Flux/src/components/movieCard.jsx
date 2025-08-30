import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGE_BASE_URL } from '../repos/api';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/favoritesSlice';

function MovieCard({ movie, index }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);

  const isFavorite = (movieId) => {
    return favorites.some((favMovie) => favMovie.id === movieId);
  };

  const handleToggleFavorite = () => {
    if (isFavorite(movie.id)) {
      dispatch(removeFavorite(movie));
    } else {
      dispatch(addFavorite(movie));
    }
  };
  if (!movie) {
    return (
      <div className="movie-card glass-card">
        <div className="movie-card-body">
          <p className="error-text">Movie data is not available.</p>
        </div>
      </div>
    );
  }

  const getRatingClass = (rating) => {
    if (rating === undefined || rating === null || rating === 'N/A') {
      return 'rating-unknown';
    }
    const numericRating = parseFloat(rating);
    if (numericRating >= 7) {
      return 'rating-high';
    }
    if (numericRating >= 5) {
      return 'rating-medium';
    }
    if (numericRating > 0) {
      return 'rating-low';
    }
    return 'rating-unknown';
  };

  const formatRating = (rating) => {
    if (rating === undefined || rating === null || rating === 'N/A') {
      return 'N/A';
    }
    return parseFloat(rating).toFixed(1);
  };

  const ratingClass = getRatingClass(movie.vote_average);
  const formattedRating = formatRating(movie.vote_average);

  return (
    <Link 
      to={`/movie/${movie.id}`} 
      className="movie-card-link fade-in-up stagger-animation"
      style={{ '--index': index || 0 }}
    >
      <div className="movie-card glow-on-hover">
        <div className="movie-poster-container">
          <img
            src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : 'https://placehold.co/600x900/1a1a2e/00ffff?text=No+Image'}
            alt={movie.title || 'No title'}
            className="movie-poster"
            loading="lazy"
          />
          <div className="poster-overlay">
            <div className="play-button">
              <span className="play-icon">▶</span>
            </div>
          </div>
          <button 
            className={`favorite-button ${isFavorite(movie.id) ? 'is-favorite' : ''}`}
            onClick={(e) => {
              e.preventDefault(); // Prevent navigation
              e.stopPropagation(); // Prevent event bubbling
              handleToggleFavorite();
            }}
            aria-label={isFavorite(movie.id) ? 'Remove from favorites' : 'Add to favorites'}
          >
            <span className="favorite-icon">
              {isFavorite(movie.id) ? '♥' : '♡'}
            </span>
          </button>
        </div>
        
        <div className="movie-card-body">
          <h2 className="movie-title">
            {movie.title || 'No Title Available'}
          </h2>
          
          <div className="movie-meta">
            <div className={`rating ${ratingClass}`}>
              <span className="rating-icon">⭐</span>
              <span className="rating-value">{formattedRating}</span>
            </div>
            
            {movie.release_date && (
              <div className="release-year">
                {new Date(movie.release_date).getFullYear()}
              </div>
            )}
          </div>
          
          {movie.overview && (
            <p className="movie-overview">
              {movie.overview.length > 120 
                ? `${movie.overview.substring(0, 120)}...` 
                : movie.overview
              }
            </p>
          )}
          
          <div className="card-footer">
            <div className="view-details">
              <span>View Details</span>
              <span className="arrow">→</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
