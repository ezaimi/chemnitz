'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import InfoPanel from './InfoPanel';
import { Feature } from '@/types/Features';
import CustomPopup from './CustomPopup';

interface MapProps {
  features: Feature[];
  selectedFeatureId: string | null;
}

function FlyToSelected({
  features,
  selectedFeatureId,
  popupRefs,
}: {
  features: Feature[];
  selectedFeatureId: string | null;
  popupRefs: React.MutableRefObject<Record<string, L.Popup | null>>;
}) {
  const map = useMap();

  useEffect(() => {
    if (selectedFeatureId) {
      const selected = features.find((f) => f.id === selectedFeatureId);
      if (!selected) return;

      const coords = selected.geometry.coordinates;
      if (Array.isArray(coords) && coords.length === 2) {
        const [lng, lat] = coords;
        map.flyTo([lat, lng], 15, { duration: 1.5 });

        const tryOpenPopup = () => {
          const popup = popupRefs.current[selectedFeatureId];
          if (popup) {
            popup.openOn(map);
          } else {
            setTimeout(tryOpenPopup, 200);
          }
        };

        tryOpenPopup();
      }
    }
  }, [selectedFeatureId, features, map, popupRefs]);

  return null;
}

const Map = ({ features, selectedFeatureId }: MapProps) => {
  const popupRefs = useRef<Record<string, L.Popup | null>>({});
  const [localSelectedId, setLocalSelectedId] = useState<string | null>(selectedFeatureId);

  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
  }, []);

  const selectedFeature = features.find((f) => f.id === localSelectedId) ?? null;

  useEffect(() => {
    setLocalSelectedId(selectedFeatureId);
  }, [selectedFeatureId]);

  return (
    <div className="relative h-full w-full">
      <InfoPanel isPanelOpen={!!selectedFeature} feature={selectedFeature} />

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

        <FlyToSelected
          features={features}
          selectedFeatureId={localSelectedId}
          popupRefs={popupRefs}
        />

        {features.map((feature) => {
          const { geometry, id } = feature;
          const coords = geometry?.coordinates;
          if (Array.isArray(coords) && coords.length === 2) {
            const [lng, lat] = coords;
            return (
              <Marker
                key={id ?? `${lat}-${lng}`}
                position={[lat, lng]}
                eventHandlers={{
                  click: () => setLocalSelectedId(id),
                }}
              >
                <Popup
                  className="custom-popup w-[180px] h-[150px]"
                  offset={[0, -41]}
                  ref={(ref) => {
                    if (id) {
                      popupRefs.current[id] = ref;
                    }
                  }}
                  eventHandlers={{
                    remove: () => setLocalSelectedId(null),
                  }}
                >
                  <CustomPopup feature={feature} />
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
