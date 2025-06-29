'use client';

import React, { useState } from 'react';
import CustomCard from './Card';
import Pagination from '@mui/material/Pagination';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const cardDataArray = [
  { id: 1, title: 'Card 1', img: '/assets/image/main/chemnitz-foto1.png' },
  { id: 2, title: 'Card 2', img: '/assets/image/main/sushi.png' },
  { id: 3, title: 'Card 3', img: '/assets/image/main/tacos.png' },
  { id: 4, title: 'Card 4', img: '/assets/image/main/burger.png' },
  { id: 5, title: 'Card 5', img: '/assets/image/main/salad.png' },
  { id: 6, title: 'Card 6', img: '/assets/image/main/pizza.png' },
  { id: 7, title: 'Card 7', img: '/assets/image/main/fries.png' },
];

export default function CardGridWithPagination() {
  const [page, setPage] = useState(1);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'lg'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  // Dynamic cards per page
  let cardsPerPage = 1;
  if (isTablet) cardsPerPage = 3;
  if (isDesktop) cardsPerPage = 4;

  const totalPages = Math.ceil(cardDataArray.length / cardsPerPage);
  const startIndex = (page - 1) * cardsPerPage;
  const visibleCards = cardDataArray.slice(startIndex, startIndex + cardsPerPage);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <div className="w-full h-full px-2 md:px-10 py-5 flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
        {visibleCards.map((card) => (
          <CustomCard key={card.id} title={card.title} img={card.img} />
        ))}
      </div>
      <div className="flex justify-center">
        <Pagination count={totalPages} page={page} onChange={handleChange} />
      </div>
    </div>
  );
}
