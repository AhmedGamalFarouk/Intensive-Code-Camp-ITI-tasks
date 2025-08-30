import React from 'react';
import { CardMedia } from '@mui/material';

const DuckPic = ({ url }) => {
  return (
    <CardMedia
      component="img"
      height="300"
      image={url}
      alt="Random Duck"
      sx={{ objectFit: 'cover' }}
    />
  );
};

export default DuckPic;
