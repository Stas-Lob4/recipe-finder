'use client';

import { LoadingSpinner } from '@/components';
import Image from 'next/image';
import { useRecipeStore } from '@/stores/useRecipeStore';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const RecipeDetails = () => {
  const { selectedRecipe: recipe, loadRecipeDetails } = useRecipeStore();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      loadRecipeDetails(Number(id));
    }
  }, [id, loadRecipeDetails]);

  const router = useRouter();

  if (!recipe) {
    return (
      <div className="max-w-4xl mx-auto">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => router.push('/recipes')}
        className="mb-6 text-orange-500 hover:text-orange-600 transition-colors duration-200"
      >
        ← Back to Recipes
      </button>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <Image
          src={recipe.image}
          width={400}
          height={500}
          alt={recipe.title}
          className="w-full h-64 md:h-80 object-cover"
        />
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{recipe.title}</h1>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center bg-orange-100 px-3 py-1 rounded-full">
              <span className="mr-2">⏱️</span>
              <span className="text-orange-800 font-medium">{recipe.readyInMinutes} minutes</span>
            </div>
            <div className="flex items-center bg-blue-100 px-3 py-1 rounded-full">
              <span className="mr-2">👥</span>
              <span className="text-blue-800 font-medium">{recipe.servings} portions</span>
            </div>
          </div>

          {recipe.summary && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Detail</h2>
              <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: recipe.summary }} />
            </div>
          )}

          {recipe.extendedIngredients && recipe.extendedIngredients.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Ingredients</h2>
              <ul className="space-y-2">
                {recipe.extendedIngredients?.map((ingredient, index) => (
                  <li key={index} className="flex items-center bg-gray-50 p-3 rounded-lg">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    <span className="font-medium text-gray-800 mr-2">{ingredient.name}</span>
                    <span className="text-gray-600">
                      — {ingredient.amount} {ingredient.unit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {recipe.instructions && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Instruction</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: recipe.instructions }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
