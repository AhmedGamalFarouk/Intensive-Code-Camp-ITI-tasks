import { useState, useEffect } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Button,
} from '@mui/material';

function DogCard({ refreshTrigger }) {
  const [dogImage, setDogImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDogImage = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setDogImage(data.message); // The API returns { "message": "url", "status": "success" }
    } catch (e) {
      setError(`Failed to fetch dog image: ${e.message}. Please try again.`);
      console.error('Error fetching dog image:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDogImage();
  }, [refreshTrigger]);

  return (
    <Card sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Random Dog Image
        </Typography>
        <Box sx={{ my: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
          {loading && <CircularProgress />}
          {error && (
            <Typography color="error" variant="body1">
              {error}
            </Typography>
          )}
          {dogImage && !loading && (
            <CardMedia
              component="img"
              height="300"
              image={dogImage}
              alt="Random Dog"
              sx={{ objectFit: 'cover', borderRadius: 1 }}
            />
          )}
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={fetchDogImage}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? 'Loading...' : 'Get New Random Dog'}
        </Button>
      </CardContent>
    </Card>
  );
}

export default DogCard;
