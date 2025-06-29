'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function Filter() {
  const [value, setValue] = React.useState(0);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 200,
        borderRadius: '0.75rem', // similar to rounded-xl
        
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{
          backgroundColor: 'transparent',
          '.MuiBottomNavigationAction-root': {
            color: 'black', // icons and labels
            '&.Mui-selected': {
              color: 'black',
            },
            px: 1,
            py: 0.5,
            '& .MuiBottomNavigationAction-label': {
              fontSize: '0.75rem',
              mt: 0.25,
            },
          },
        }}
      >
        <BottomNavigationAction label="Recents" icon={<RestoreIcon fontSize="small" />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon fontSize="small" />} />
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon fontSize="small" />} />
      </BottomNavigation>
    </Box>
  );
}
