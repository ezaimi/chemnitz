import axiosInstance from '@/config/axiosConfig';
import { Feature } from '@/types/Features'; 
import { Suggestion } from '@/types/Features';


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
    const response = await axiosInstance.get(`feature/category/${categoryValue}/${category}`);
    return response.data as Feature[];
  } catch (error: unknown) {
    console.error(`Error fetching features for category: ${category}`, error);
    throw new Error('Failed to fetch features');
  }
};



export const getFeatureById = async (featureId: string): Promise<Feature> => {
  try {
    const encodedId = encodeURIComponent(featureId);
    const response = await axiosInstance.get(`feature/id/${encodedId}`);
    return response.data as Feature;
  } catch (error: unknown) {
    console.error(`Error fetching feature by ID: ${featureId}`, error);
    throw new Error('Failed to fetch feature');
  }
};


export async function getFuzzySearchSuggestions(name: string): Promise<Suggestion[]> {
  try {
    const response = await axiosInstance.get<Suggestion[]>(`feature/search/${encodeURIComponent(name)}`);
    return Array.isArray(response.data) ? response.data : [];
  } catch (error: any) {
    console.error('Error fetching fuzzy name suggestions:', error?.response?.data || error.message || error);
    return [];
  }
}
