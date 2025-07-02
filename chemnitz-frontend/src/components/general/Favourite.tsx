import React from 'react';
import Box from '@mui/material/Box';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface FavouriteProps {
  favorited: boolean;
  handleFavoriteClick: (event: React.MouseEvent) => void;
}

function Favourite({ favorited, handleFavoriteClick }: FavouriteProps) {
  return (
  <div onClick={handleFavoriteClick}>  
  <Box
      sx={{
        position: 'absolute',
        top: 13,
        right: '5%',
        width: 30,
        height: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      <div className=''> {favorited ? (
        <FavoriteIcon
          fontSize="small"
          sx={{ fontSize: 16, color: 'black', opacity: 0.9 }}
        />
      ) : (
        <FavoriteBorderIcon
          fontSize="small"
          sx={{ fontSize: 16, color: 'black', opacity: 0.9 }}
        />
      )}</div>
     
    </Box></div>
  );
}

export default Favourite;
