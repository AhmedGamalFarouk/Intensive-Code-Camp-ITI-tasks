import React from 'react';
import MovieCard from './movieCard';
import { useSelector } from 'react-redux';

function Favorites() {
  const favorites = useSelector((state) => state.favorites.items);

  if (!favorites || favorites.length === 0) {
    return (
      <div className="glass-card text-center fade-in favorites-empty">
        <h3>No Favorites Yet</h3>
        <p>You haven't added any movies to your favorites.</p>
        <p>Click the heart icon on any movie to add it to your favorites.</p>
      </div>
    );
  }

  return (
    <div className="favorites-page fade-in">
      <div className="favorites-header">
        <h2 className="section-title">YOUR FAVORITES</h2>
        <div className="favorites-count">{favorites.length} {favorites.length === 1 ? 'Movie' : 'Movies'}</div>
      </div>
      <div className="movie-list">
        {favorites.map((movie, index) => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
