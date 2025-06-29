'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import InfoPanel from './InfoPanel';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
 iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
 iconUrl: '/leaflet/images/marker-icon.png',
 shadowUrl: '/leaflet/images/marker-shadow.png',
});

const Map = () => {
 const [isPanelOpen, setIsPanelOpen] = useState(false);
 const [isClient, setIsClient] = useState(false);

 useEffect(() => {
  setIsClient(true);
 }, []);

 if (!isClient) return null;

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
    scrollWheelZoom={true}
    className="h-full w-full z-0 rounded-2xl"
   >
    <TileLayer
     attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[50.8323, 12.9253]}>
     <Popup>Chemnitz, Germany</Popup>
    </Marker>
   </MapContainer>
  </div>
 );
};

export default dynamic(() => Promise.resolve(Map), { ssr: false });

