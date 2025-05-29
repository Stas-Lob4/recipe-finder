'use client';

import { ErrorState, LoadingSpinner, NoResultsState, RecipeCard, SearchParameters } from '@/components';
import { useRouter } from 'next/navigation';
import { useRecipeStore } from '@/stores/useRecipeStore';

export const RecipesList = () => {
  const router = useRouter();
  const { recipes, loading, error, searchParams, handleRetry } = useRecipeStore();

  const navigateToStart = () => router.push('/');

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorState onRetry={handleRetry} />;
  }

  if (recipes.length === 0) {
    return <NoResultsState onNewSearch={navigateToStart} />;
  }

  const navigateToRecipe = (recipeId: number) => {
    router.push(`/recipes/${recipeId}`);
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Search results</h2>
        <SearchParameters params={searchParams} />
        <button
          onClick={navigateToStart}
          className="text-orange-500 hover:text-orange-600 transition-colors duration-200"
        >
          ← Back to Recipes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {recipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} onClick={navigateToRecipe} />
        ))}
      </div>
    </div>
  );
};
