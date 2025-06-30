import axios from 'axios';
import { Feature } from '@/types/Features'; // Import the Feature type

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
  const categoryValue = categoryMap[category]; // Map category to value
  if (!categoryValue) {
    throw new Error('Invalid category');
  }

  try {
    const response = await axiosInstance.get(`/${categoryValue}/${category}`);
    return response.data as Feature[];
  } catch (error: unknown) {
    console.error(`Error fetching features for category: ${category}`, error);
    throw new Error('Failed to fetch features');
  }
};
