import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Badge, Card } from 'react-bootstrap';
import { fetchMovieDetails, IMAGE_BASE_URL } from '../repos/api';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/favoritesSlice';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);

  const isFavorite = (movieId) => {
    return favorites.some((favMovie) => favMovie.id === movieId);
  };

  const handleToggleFavorite = () => {
    if (movie) {
      if (isFavorite(movie.id)) {
        dispatch(removeFavorite(movie));
      } else {
        dispatch(addFavorite(movie));
      }
    }
  };

  useEffect(() => {
    const getDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError('Failed to fetch movie details.');
        console.error('Error fetching movie details:', err);
      } finally {
        setLoading(false);
      }
    };

    getDetails();
  }, [id]);

  if (loading) return <p className="text-center mt-5">Loading movie details...</p>;
  if (error) return <p className="text-center mt-5 text-danger">{error}</p>;
  if (!movie) return <p className="text-center mt-5">Movie not found.</p>;

  const getRatingBadge = (rating) => {
    if (rating >= 7) return <Badge bg="success">{rating.toFixed(1)}</Badge>;
    if (rating >= 5) return <Badge bg="warning">{rating.toFixed(1)}</Badge>;
    return <Badge bg="danger">{rating.toFixed(1)}</Badge>;
  };

  return (
    <Container className="mt-4 movie-details-page">
      <Card className="shadow-lg">
        <Card.Body>
          <Row className="g-4 align-items-start">
            <Col xs={12} md={4} className="text-center mb-4 mb-md-0">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                fluid
                rounded
                className="shadow"
                style={{ maxHeight: '500px', width: '100%', objectFit: 'cover', background: '#f8f9fa' }}
              />
              <button
                className={`favorite-button ${isFavorite(movie.id) ? 'is-favorite' : ''}`}
                onClick={handleToggleFavorite}
                aria-label={isFavorite(movie.id) ? 'Remove from favorites' : 'Add to favorites'}
                style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10 }}
              >
                <span className="favorite-icon">
                  {isFavorite(movie.id) ? '♥' : '♡'}
                </span>
              </button>
            </Col>
            <Col xs={12} md={8} className="p-3 bg-white rounded-3">
              <h1 className="mb-3">{movie.title}</h1>
              {movie.tagline && <p className="lead fst-italic">{movie.tagline}</p>}
              <hr />
              <h5>Overview</h5>
              <p>{movie.overview}</p>
              <Row className="mb-3">
                <Col xs={6} sm={4} className="mb-2">
                  <strong>Release Date:</strong>
                  <p>{movie.release_date}</p>
                </Col>
                <Col xs={6} sm={4} className="mb-2">
                  <strong>Rating:</strong>
                  <p>{getRatingBadge(movie.vote_average)}</p>
                </Col>
                <Col xs={12} sm={4} className="mb-2">
                  <strong>Vote Count:</strong>
                  <p>{movie.vote_count}</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default MovieDetails;
