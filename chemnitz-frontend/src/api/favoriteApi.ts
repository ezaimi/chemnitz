import axiosInstance from "@/config/axiosConfig";

export const addToFavorites = async (featureId: string): Promise<void> => {
  await axiosInstance.post(
    '/user/favorites',
    { featureId },
    { withCredentials: true }
  );
};

export const removeFromFavorites = async (featureId: string): Promise<void> => {
  try {
    await axiosInstance.delete(
      `/user/favorites/${encodeURIComponent(featureId)}`,
      { withCredentials: true }
    );
  } catch (error) {
    console.error('Error removing from favorites:', error);
    throw new Error('Failed to remove from favorites');
  }
};


export const getFavorites = async (): Promise<string[]> => {
  try {
    const response = await axiosInstance.get<{ id: string }[]>('/users/favorites');
    return response.data.map((f) => f.id);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    throw new Error('Failed to fetch favorites');
  }
};
