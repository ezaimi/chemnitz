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
}

export default function Filter({ onFilterChange }: FilterProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    const selectedCategory = headerData[newValue].name.toLowerCase();
    onFilterChange(selectedCategory);
  };

  return (
    <Box sx={{ maxWidth: { xs: 320, sm: 880 } }}>
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
              paddingY: "10px",
              lineHeight: 'normal',
              color: value === index ? 'white' : 'black',
              backgroundColor: value === index ? 'black' : 'transparent',
              transform: value === index ? 'scale(1.05)' : 'scale(1)',
              opacity: value === index ? 1 : 0.8,
              transition: 'all 0.5s ease-in-out',
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
