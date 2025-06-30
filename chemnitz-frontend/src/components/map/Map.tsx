'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import InfoPanel from './InfoPanel';
import { Feature } from '@/types/Features';

interface MapProps {
  features: Feature[];
}

const Map = ({ features }: MapProps) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl:
      'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl:
      'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });
}, []);


  return (
    <div className="relative h-full w-full">
      <button
        onClick={() => setIsPanelOpen(!isPanelOpen)}
        className="absolute top-4 left-4 z-[1000] bg-white px-4 py-2 rounded shadow"
      >
        {isPanelOpen ? 'Close' : 'Open'}
      </button>

      <InfoPanel isPanelOpen={isPanelOpen} />

      <MapContainer
        center={[50.8323, 12.9253]}
        zoom={13}
        scrollWheelZoom
        className="h-full w-full z-0 rounded-2xl"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {features.map((feature) => {
          const { geometry, properties, id } = feature;
          const coords = geometry?.coordinates;
          if (Array.isArray(coords) && coords.length === 2) {
            const [lng, lat] = coords;
            return (
              <Marker key={id ?? `${lat}-${lng}`} position={[lat, lng]}>
                <Popup>
                  <h3>{properties?.name ?? 'No name'}</h3>
                  <p>{properties?.description ?? 'No description'}</p>
                </Popup>
              </Marker>
            );
          }
          console.warn(`Skipping invalid feature`, feature);
          return null;
        })}
      </MapContainer>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Map), { ssr: false });
