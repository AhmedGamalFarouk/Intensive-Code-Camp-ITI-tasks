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

function CatCard({ refreshTrigger }) {
  const [catImage, setCatImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCatImage = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://cataas.com/cat');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const imageBlob = await response.blob();
      const imageUrl = URL.createObjectURL(imageBlob);
      setCatImage(imageUrl);
    } catch (e) {
      setError(`Failed to fetch cat image: ${e.message}. Please try again.`);
      console.error('Error fetching cat image:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatImage();
    return () => {
      if (catImage) {
        URL.revokeObjectURL(catImage);
      }
    };
  }, [refreshTrigger]);

  return (
    <Card sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Random Cat Image
        </Typography>
        <Box sx={{ my: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
          {loading && <CircularProgress />}
          {error && (
            <Typography color="error" variant="body1">
              {error}
            </Typography>
          )}
          {catImage && !loading && (
            <CardMedia
              component="img"
              height="300"
              image={catImage}
              alt="Random Cat"
              sx={{ objectFit: 'cover', borderRadius: 1 }}
            />
          )}
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={fetchCatImage}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? 'Loading...' : 'Get New Random Cat'}
        </Button>
      </CardContent>
    </Card>
  );
}

export default CatCard;
