import { create } from 'zustand';
import { Recipe, SearchedRecipe, SearchParams } from '@/shared/types';
import { recipeApi } from '@/api/api';

type State = {
  currentPage: string;
  recipes: SearchedRecipe[];
  selectedRecipe: Recipe | null;
  searchParams: SearchParams;
  loading: boolean;
  error: boolean;
};

type Actions = {
  setCurrentPage: (page: string) => void;
  searchRecipes: (params: SearchParams) => Promise<void>;
  loadRecipeDetails: (id: number) => Promise<void>;
  handleRetry: () => void;
};

export const useRecipeStore = create<State & Actions>((set, get) => ({
  currentPage: 'home',
  recipes: [],
  selectedRecipe: null,
  searchParams: {},
  loading: false,
  error: false,

  setCurrentPage: page => {
    set({ currentPage: page });

    if (page === 'home') {
      set({
        recipes: [],
        selectedRecipe: null,
        error: false,
      });
    }
  },

  searchRecipes: async (params: SearchParams) => {
    set({ loading: true, error: false, searchParams: params });

    try {
      const data = await recipeApi.getRecipes(params);
      set({ recipes: data.results });
    } catch {
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  loadRecipeDetails: async id => {
    set({ loading: true, currentPage: 'details' });

    try {
      const { recipes } = get();
      const selectedRecipe = recipes.find(recipe => recipe.id === id);

      if (selectedRecipe) {
        const data = await recipeApi.getRecipe(id);

        set({ selectedRecipe: data });
      }
    } catch (err) {
      console.error('Ошибка загрузки рецепта:', err);
    } finally {
      set({ loading: false });
    }
  },

  handleRetry: () => {
    const { searchParams, searchRecipes } = get();
    searchRecipes(searchParams);
  },
}));
