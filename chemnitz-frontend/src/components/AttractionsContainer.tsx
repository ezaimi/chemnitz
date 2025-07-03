'use client';
import React, { useState, useEffect, useRef } from 'react';
import { getFeatureProperties } from '@/utilities/featureHelper';
import { MenuItemType } from '@/types/componentTypes';
import CardGridWithPagination from './CardGridWithPagination';
import Map from './map/Map';
import { getFeaturesByCategory, getFeatureById } from '@/api/featureApi';
import { Feature } from '@/types/Features';
import HeaderContainer from './MapHeader/HeaderContainer';

export default function AttractionsContainer() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>('museum');
  const [selectedFeatureId, setSelectedFeatureId] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string>(''); // for controlling the search input

  const mapRef = useRef<HTMLDivElement>(null);

  // Fetch category features
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

  // Fetch a single feature by ID (for search)
  const fetchFeatureById = async (featureId: string) => {
    setLoading(true);
    setError(null);
    try {
      const feature: Feature = await getFeatureById(featureId);
      setFeatures(feature ? [feature] : []);
    } catch (err) {
      setError('Failed to fetch the feature');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      fetchFeatures(selectedCategory);
    }
  }, [selectedCategory]);

  const handleFilterChange = (category: string) => {
    setSelectedCategory(category);
    setSearchValue(''); // clear the search input
  };

  const handleLocationClick = (featureId: string) => {
    setSelectedFeatureId(featureId);
    if (mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // ---- FIXED: Refresh after review ----
  const handleReviewSubmitted = () => {
    if (selectedCategory) {
      fetchFeatures(selectedCategory);
    } else if (features.length === 1 && features[0].id) {
      fetchFeatureById(features[0].id);
    }
  };

  // When a suggestion is selected, show just that feature and clear category selection
  const handleSuggestionSelect = async (featureId: string) => {
    await fetchFeatureById(featureId);
    setSelectedFeatureId(featureId);
    setSelectedCategory(null); // no category is selected when searching
    handleLocationClick(featureId);
  };

  const handleSearchChange = (val: string) => setSearchValue(val);

  return (
    <div>
      <div className="flex justify-center font-bold text-3xl p-5">Attractions</div>

      <div className="h-15 flex items-center px-2 md:px-10 py-2">
        <HeaderContainer
          onFilterChange={handleFilterChange}
          onSuggestionSelect={handleSuggestionSelect}
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          selectedCategory={selectedCategory}
        />
      </div>

      <div className="w-full h-150 px-2 md:px-10 py-5 flex flex-col">
        <CardGridWithPagination
          selectedCategory={selectedCategory ?? ''}
          features={features}
          onLocationClick={handleLocationClick}
          onReviewSubmitted={handleReviewSubmitted}
        />
      </div>

      <div
        ref={mapRef}
        className="w-full min-h-[250px] p-10 flex flex-col gap-4 px-2 pt-3 h-[700px]"
      >
        <div id='map' className="flex-1 w-full relative p-10">
          <Map features={features} selectedFeatureId={selectedFeatureId} />
        </div>
      </div>
    </div>
  );
}
