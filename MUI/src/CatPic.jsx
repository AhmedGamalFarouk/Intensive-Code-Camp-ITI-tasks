import React, { useState, useEffect } from 'react';

const CatPic = () => {
  const [catImageUrl, setCatImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCatPic = async () => {
    setLoading(true);
    setError(null);
    try {
      // Using a proxy to avoid CORS issues if running locally
      // For production, ensure your server handles CORS or use a direct API call if allowed
      const response = await fetch('https://cataas.com/cat?json=true');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCatImageUrl(`https://cataas.com/${data.url}`);
    } catch (e) {
      setError('Failed to fetch cat picture. Please try again.');
      console.error('Error fetching cat pic:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatPic();
  }, []);

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <h2>Random Cat Picture</h2>
      {loading && <p>Loading cat picture...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && catImageUrl && (
        <div>
          <img
            src={catImageUrl}
            alt="Random Cat"
            style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
          />
          <button onClick={fetchCatPic} style={{ marginTop: '10px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
            Get New Cat
          </button>
        </div>
      )}
    </div>
  );
};

export default CatPic;
