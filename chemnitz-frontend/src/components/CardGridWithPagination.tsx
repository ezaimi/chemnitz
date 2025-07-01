'use client';

import React, { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import { Feature } from '@/types/Features';
import CustomCard from './Card';

interface CardGridWithPaginationProps {
  features: Feature[];
  selectedCategory: string;
  onLocationClick: (id: string) => void;
}

export default function CardGridWithPagination({ features, selectedCategory, onLocationClick }: CardGridWithPaginationProps) {
  const [page, setPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(4);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const updateCardsPerPage = () => {
      const width = window.innerWidth;

      if (width < 640) setCardsPerPage(6);        // sm
      else if (width < 768) setCardsPerPage(8);   // sm+
      else if (width < 1024) setCardsPerPage(3);  // md
      else setCardsPerPage(4);                    // lg+
    };

    updateCardsPerPage();
    window.addEventListener('resize', updateCardsPerPage);
    return () => window.removeEventListener('resize', updateCardsPerPage);
  }, []);

  const totalPages = Math.ceil(features.length / cardsPerPage);
  const startIndex = (page - 1) * cardsPerPage;
  const visibleCards = features.slice(startIndex, startIndex + cardsPerPage);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setFade(false);
    setTimeout(() => {
      setPage(value);
      setFade(true);
    }, 200); // wait for fade-out before switching
  };

  const fadeClass = fade ? 'opacity-100' : 'opacity-0';

  return (
    <div className="w-full h-full py-5 flex flex-col">
      {/* Desktop view */}
      <div className={`hidden md:grid grid-cols-3 lg:grid-cols-4 gap-4 mb-4 transition-opacity duration-500 ${fadeClass}`}>
        {visibleCards.map((feature) => (
          <CustomCard
            key={feature.id} // Ensure each card has a unique key
            selectedCategory={selectedCategory}
            features={feature}
            onLocationClick={onLocationClick}// Pass single feature here
          />
        ))}
      </div>

      {/* Mobile view */}
      <div className={`flex justify-center overflow-y-scroll py-8 w-full md:hidden transition-opacity duration-500 ${fadeClass}`}>
        <div className="w-[90%] max-w-[25rem] grid gap-4 grid-cols-1 sm:grid-cols-2 sm:w-full sm:max-w-full mx-auto">
          {visibleCards.map((feature) => (
            <CustomCard
              key={feature.id} // Ensure each card has a unique key
              selectedCategory={selectedCategory}
              features={feature}
              onLocationClick={onLocationClick} // Pass single feature here
            />
          ))}
          <div className="h-6 sm:col-span-2"></div>
        </div>
      </div>

      <div className="flex justify-center mt-5">
        <Pagination count={totalPages} page={page} onChange={handleChange} />
      </div>
    </div>
  );
}