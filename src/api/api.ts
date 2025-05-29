import { instance, API_KEY } from '@/shared/api/instance';
import { SearchParams } from '@/shared/types';

export const recipeApi = {
  getRecipes: async (params: SearchParams) => {
    try {
      const response = await instance.get('complexSearch', {
        params: {
          ...params,
          apiKey: API_KEY,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
  getRecipe: async (id: number) => {
    try {
      const response = await instance.get(`${id}/information`, {
        params: {
          apiKey: API_KEY,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
};
