// components/CustomPopup.tsx
import React from 'react';
import { Feature } from '@/types/Features';

interface CustomPopupProps {
  feature: Feature;
}

const CustomPopup: React.FC<CustomPopupProps> = ({ feature }) => {
  const { properties } = feature;
  const imageUrl =
    properties?.image ||
    properties?.photo ||
    'https://placehold.co/220x110?text=No+Image';

  return (
    <>
      <img
        src={imageUrl}
        alt={properties?.name ?? 'No name'}
        className="w-full h-[90px] object-cover rounded-xl"
      />
      <div className="p-1">
        <h3 className="font-semibold text-base mb-0.5 line-clamp-2 ">
          {properties?.name ?? 'No name'}
        </h3>
        <p className="mb-1 text-xs text-gray-600 line-clamp-3">
          {properties?.description ?? 'No description'}
        </p>
        {properties?.website && (
          <a
            href={properties.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 text-xs underline"
          >
            Website
          </a>
        )}
      </div>
    </>
  );
};

export default CustomPopup;
