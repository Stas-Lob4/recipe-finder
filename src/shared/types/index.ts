type Ingredient = {
  name: string;
  amount: number;
  unit: string;
};

export type Recipe = {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  summary: string;
  extendedIngredients: Ingredient[];
  instructions: string;
};

export type SearchedRecipe = {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  summary: string;
};

type CuisineType = 'italian' | 'mexican' | 'chinese' | 'french' | 'indian' | 'japanese' | 'thai' | 'mediterranean';

export type SearchParams = {
  query?: string;
  cuisine?: CuisineType;
  maxReadyTime?: string;
  [key: string]: string | undefined;
};
