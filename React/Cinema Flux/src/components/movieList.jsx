import React from 'react';
import MovieCard from './movieCard';
import { useState, useEffect } from 'react';
import { fetchMovies } from '../repos/api';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setLoading(true);
        const data = await fetchMovies(); 
        setMovies(data);
      } catch (err) {
        setError('Failed to fetch movies.');
        console.error('Error fetching movies:', err);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  if (loading) {
    return (
      <div className="loading-container fade-in">
        <div className="loading-spinner"></div>
        <div className="loading-text">LOADING MOVIES</div>
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="glass-card text-center fade-in">
        <h3>No Movies Found</h3>
        <p>Unable to load movie data at this time.</p>
      </div>
    );
  }

  return (
    <div className="movie-list fade-in">
      {movies.map((movie, index) => (
        <MovieCard 
          key={movie.id} 
          movie={movie} 
          index={index}
        />
      ))}
    </div>
  );
}

export default MovieList;
