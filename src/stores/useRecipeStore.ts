import { create } from 'zustand';
import { Recipe, SearchedRecipe, SearchParams } from '@/shared/types';
import { recipeApi } from '@/api/api';

type CachedItem<T> = {
  data: T;
  timestamp: number;
};

type State = {
  currentPage: string;
  recipes: SearchedRecipe[];
  selectedRecipe: Recipe | null;
  searchParams: SearchParams;
  loading: boolean;
  error: boolean;
  recipesCache: Record<string, CachedItem<SearchedRecipe[]>>;
  recipeDetailsCache: Record<number, CachedItem<Recipe>>;
};

type Actions = {
  setCurrentPage: (page: string) => void;
  searchRecipes: (params: SearchParams) => Promise<void>;
  loadRecipeDetails: (id: number) => Promise<void>;
  handleRetry: () => void;
};

const CACHE_TTL = 60 * 1000; // 1 минута

export const useRecipeStore = create<State & Actions>((set, get) => ({
  currentPage: 'home',
  recipes: [],
  selectedRecipe: null,
  searchParams: {},
  loading: false,
  error: false,
  recipesCache: {},
  recipeDetailsCache: {},

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

    const cacheKey = JSON.stringify(params);
    const { recipesCache } = get();
    const cached = recipesCache[cacheKey];
    const now = Date.now();

    if (cached && now - cached.timestamp < CACHE_TTL) {
      set({ recipes: cached.data, loading: false });
      return;
    }

    try {
      const data = await recipeApi.getRecipes(params);
      set(state => ({
        recipes: data.results,
        recipesCache: {
          ...state.recipesCache,
          [cacheKey]: { data: data.results, timestamp: now },
        },
      }));
    } catch {
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  loadRecipeDetails: async id => {
    set({ loading: true, currentPage: 'details' });

    const { recipeDetailsCache } = get();
    const cached = recipeDetailsCache[id];
    const now = Date.now();

    if (cached && now - cached.timestamp < CACHE_TTL) {
      set({ selectedRecipe: cached.data, loading: false });
      return;
    }

    try {
      const data = await recipeApi.getRecipe(id);
      set(state => ({
        selectedRecipe: data,
        recipeDetailsCache: {
          ...state.recipeDetailsCache,
          [id]: { data, timestamp: now },
        },
      }));
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
