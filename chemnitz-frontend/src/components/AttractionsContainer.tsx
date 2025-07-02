'use client';

import React, { useState, useEffect, useRef } from 'react';
import { getFeatureProperties } from '@/utilities/featureHelper';
import { MenuItemType } from '@/types/componentTypes';
import CardGridWithPagination from './CardGridWithPagination';
import Map from './map/Map';
import { getFeaturesByCategory } from '@/api/featureApi';
import { Feature } from '@/types/Features';
import HeaderContainer from './MapHeader/HeaderContainer';
import { getFeatureById } from '@/api/featureApi';


export default function AttractionsContainer() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('museum');
  const [selectedFeatureId, setSelectedFeatureId] = useState<string | null>(null);



  const mapRef = useRef<HTMLDivElement>(null); // Ref to scroll to

  const fetchFeatures = async (categoryField: string) => {
    setLoading(true);
    setError(null);
    try {
      const data: Feature[] = await getFeaturesByCategory(categoryField);
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

  const handleLocationClick = (featureId: string) => {
    setSelectedFeatureId(featureId);

    // Scroll to map smoothly
    if (mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSuggestionSelect = async (featureId: string) => {
    const feature = await getFeatureById(featureId);
    console.log("Selected feature ID:", featureId);
    setFeatures(feature ? [feature] : [] );
    setSelectedFeatureId(featureId);
    handleLocationClick(featureId);
  };


  return (
    <div>
      <div className="flex justify-center font-bold text-3xl p-5">Attractions</div>

      <div className="h-15 flex items-center px-2 md:px-10 py-2">
        <HeaderContainer onFilterChange={handleFilterChange} onSuggestionSelect={handleSuggestionSelect} />
      </div>

      <div className="w-full h-150 px-2 md:px-10 py-5 flex flex-col">
        <CardGridWithPagination
          selectedCategory={selectedCategory}
          features={features}
          onLocationClick={handleLocationClick}

        />
      </div>

      {/* Map section with ref */}
      <div
        ref={mapRef}
        className="w-full min-h-[250px] p-10 flex flex-col gap-4 px-2 pt-3 h-[700px]"
      >
        <div className="flex-1 w-full relative p-10">
          <Map features={features} selectedFeatureId={selectedFeatureId} />
        </div>
      </div>
    </div>
  );
}
