// Filter.tsx
'use client';

import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HotelIcon from '@mui/icons-material/Hotel';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MuseumIcon from '@mui/icons-material/Museum';

type CardHeaderType = {
  name: string;
  icon: React.ElementType;
};

export const headerData: { name: string; icon: React.ElementType; type: 'tourism' | 'amenity' | 'leisure' | 'shop' }[] = [
  { name: 'Museum', icon: MuseumIcon, type: 'tourism' },
  { name: 'Gallery', icon: MuseumIcon, type: 'tourism' },
  { name: 'Artwork', icon: MuseumIcon, type: 'tourism' },
  { name: 'Guest_House', icon: HotelIcon, type: 'tourism' },
  { name: 'Hotel', icon: HotelIcon, type: 'tourism' },
  { name: 'Restaurant', icon: RestaurantIcon, type: 'amenity' },
  { name: 'Bench', icon: ShoppingCartIcon, type: 'amenity' },
  { name: 'Theatre', icon: ShoppingCartIcon, type: 'amenity' },
  { name: 'Clock', icon: ShoppingCartIcon, type: 'amenity' },
  { name: 'Deli', icon: ShoppingCartIcon, type: 'shop' },
];

interface FilterProps {
  onFilterChange: (category: string) => void;
  selectedCategory: string | null;
}

export default function Filter({ onFilterChange, selectedCategory }: FilterProps) {
  // set active tab according to selectedCategory
  const initialIndex =
    selectedCategory !== null
      ? headerData.findIndex(
          (h) => h.name.toLowerCase() === selectedCategory.toLowerCase()
        )
      : -1;
  const [value, setValue] = React.useState(initialIndex >= 0 ? initialIndex : 0);

  React.useEffect(() => {
    // Sync tab when category changes externally (e.g. cleared by search)
    if (selectedCategory === null) setValue(-1);
    else {
      const i = headerData.findIndex(
        (h) => h.name.toLowerCase() === selectedCategory.toLowerCase()
      );
      setValue(i >= 0 ? i : 0);
    }
  }, [selectedCategory]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    const selected = headerData[newValue].name.toLowerCase();
    onFilterChange(selected);
  };

  return (
    <Box sx={{ maxWidth: { xs: 320, sm: 750 }, width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        TabIndicatorProps={{ style: { display: 'none' } }}
        sx={{
          '& .MuiTabs-scrollButtons': {
            color: 'black',
            '&.Mui-disabled': {
              display: 'none',
            },
          },
        }}
      >
        {headerData.map((item, index) => (
          <Tab
            key={index}
            label={item.name}
            icon={<item.icon />}
            iconPosition="start"
            sx={{
              minHeight: 'auto',
              paddingY: '10px',
              lineHeight: 'normal',
              color: value === index ? 'white' : 'black',
              backgroundColor: value === index ? 'black' : 'transparent',
              transition: 'all 0.3s ease-in-out',
              '&.Mui-selected': {
                color: 'white',
                backgroundColor: 'black',
              },
              '&:hover': {
                backgroundColor: value === index ? 'black' : '#f5f5f5',
              },
              borderRadius: '50px',
              marginRight: '16px',
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
}