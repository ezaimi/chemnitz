import axios from 'axios';
import { Feature } from '@/types/Features'; 
import { Suggestion } from '@/types/Features';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api/feature', // 👈 this part is fixed
  timeout: 5000, // 5-second timeout
});

const categoryMap: { [key: string]: string } = {
  museum: 'tourism',
  gallery: 'tourism',
  artwork: 'tourism',
  guest_house: 'tourism',
  hotel: 'tourism',
  restaurant: 'amenity',
  bench: 'amenity',
  theatre: 'amenity',
  clock: 'amenity',
  deli: 'shop',
};

export const getFeaturesByCategory = async (category: string): Promise<Feature[]> => {
  const categoryValue = categoryMap[category]; 
  if (!categoryValue) {
    throw new Error('Invalid category');
  }

  try {
    const response = await axiosInstance.get(`/category/${categoryValue}/${category}`);
    return response.data as Feature[];
  } catch (error: unknown) {
    console.error(`Error fetching features for category: ${category}`, error);
    throw new Error('Failed to fetch features');
  }
};



export const getFeatureById = async (featureId: string): Promise<Feature> => {
  try {
    const encodedId = encodeURIComponent(featureId);
    const response = await axiosInstance.get(`/id/${encodedId}`);
    return response.data as Feature;
  } catch (error: unknown) {
    console.error(`Error fetching feature by ID: ${featureId}`, error);
    throw new Error('Failed to fetch feature');
  }
};


export async function getFuzzySearchSuggestions(name: string): Promise<Suggestion[]> {
  try {
    const response = await axiosInstance.get<Suggestion[]>(`/search/${encodeURIComponent(name)}`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error: any) {
    console.error('Error fetching fuzzy name suggestions:', error?.response?.data || error.message || error);
    return [];
  }
}
