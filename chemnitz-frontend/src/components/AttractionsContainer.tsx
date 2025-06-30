// attractions/AttractionsContainer.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { getFeatureProperties } from '@/utilities/getFeatureProperties'; // Import the helper
import { MenuItemType } from '@/types/componentTypes';
import CardGridWithPagination from './CardGridWithPagination';
import Map from './map/Map';
import { getFeaturesByCategory } from '@/api/featureApi';
import { Feature } from '@/types/Features'; // Import the Feature type
import HeaderContainer from './MapHeader/HeaderContainer';

export default function AttractionsContainer() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('museum'); 

  const fetchFeatures = async (categoryField: string) => {
    setLoading(true);
    setError(null);
    try {
      const data:Feature[] = await getFeaturesByCategory(categoryField);
     console.log("Data: ", data[0].properties)
      setFeatures(data);
    } catch (err) {
      setError('Failed to fetch features');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeatures(selectedCategory);
  }, [selectedCategory]);

  const handleFilterChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <div className="flex justify-center font-bold text-3xl p-5">Attractions</div>

      <div className="h-15 flex items-center px-2 md:px-10 py-2">
        <HeaderContainer onFilterChange={handleFilterChange} />
      </div>

      <div className="w-full h-150 px-2 md:px-10 py-5 flex flex-col">
        <CardGridWithPagination selectedCategory={selectedCategory} features={features} />
      </div>

      <div className="w-full min-h-[250px] p-10 flex flex-col gap-4 px-2 pt-3 h-[800px]">
        <div className="flex-1 w-full relative p-10">
          <Map features={features} />
        </div>
      </div>
    </div>
  );
}
