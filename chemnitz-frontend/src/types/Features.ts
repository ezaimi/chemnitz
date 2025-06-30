// types/FeatureType.ts
export interface FeatureProperties {
  [key: string]: string | number | boolean | undefined; // This can store different types of property values (e.g., strings, numbers, booleans)
  name?: string;
  addr?: string;
  cuisine?: string;
  opening_hours?: string;
  website?: string;
  phone?: string;
  wheelchair?: boolean;
  outdoor_seating?: boolean;
  indoor_seating?: boolean;
  // Add more properties as necessary
}

export interface Feature {
  id: string;
  type: string; // e.g., 'restaurant', 'museum', etc.
  properties: FeatureProperties;
  geometry: { type: string; coordinates: [number, number] };
}
