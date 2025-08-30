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

function DuckCard({ refreshTrigger }) {
  const [duckImage, setDuckImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDuckImage = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/proxy/random');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setDuckImage(data.url);
    } catch (e) {
      setError(`Failed to fetch duck image: ${e.message}. Please try again.`);
      console.error('Error fetching duck image:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDuckImage();
  }, [refreshTrigger]);

  return (
    <Card sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Random Duck Image
        </Typography>
        <Box sx={{ my: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
          {loading && <CircularProgress />}
          {error && (
            <Typography color="error" variant="body1">
              {error}
            </Typography>
          )}
          {duckImage && !loading && (
            <CardMedia
              component="img"
              height="300"
              image={duckImage}
              alt="Random Duck"
              sx={{ objectFit: 'cover', borderRadius: 1 }}
            />
          )}
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={fetchDuckImage}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? 'Loading...' : 'Get New Random Duck'}
        </Button>
      </CardContent>
    </Card>
  );
}

export default DuckCard;
