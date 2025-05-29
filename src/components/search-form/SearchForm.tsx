'use client';

import { ChangeEvent, useState } from 'react';
import { SearchParams } from '@/shared/types';
import { useRecipeStore } from '@/stores/useRecipeStore';
import { useRouter } from 'next/navigation';

export const SearchForm = () => {
  const { searchRecipes } = useRecipeStore();
  const router = useRouter();

  const [formData, setFormData] = useState({
    query: '',
    cuisine: '',
    maxReadyTime: '',
  });

  const cuisineOptions = [
    { value: '', label: 'Select type cuisine' },
    { value: 'italian', label: 'Italian' },
    { value: 'mexican', label: 'Mexican' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'french', label: 'French' },
    { value: 'indian', label: 'Indian' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'thai', label: 'Thai' },
    { value: 'mediterranean', label: 'Mediterranean' },
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const searchParams: SearchParams = {};
    (Object.entries(formData) as [keyof SearchParams, string][]).forEach(([key, value]) => {
      if (value.trim()) {
        searchParams[key] = value.trim();
      }
    });
    searchRecipes(searchParams).then(() => {
      router.push('recipes');
    });
  };

  const isFormValid = Object.values(formData).some(value => value.trim());

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Find the perfect recipe</h2>
        <p className="text-gray-600 text-lg">Enter ingredients, select cuisine or specify cooking time</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="query" className="block text-sm font-medium text-gray-700">
              Search query
            </label>
            <input
              type="text"
              id="query"
              name="query"
              value={formData.query}
              onChange={handleInputChange}
              placeholder="For example: pasta, chicken, salad..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-gray-700"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="cuisine" className="block text-sm font-medium text-gray-700">
              Type of cuisine
            </label>
            <select
              id="cuisine"
              name="cuisine"
              value={formData.cuisine}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-gray-700"
            >
              {cuisineOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="maxReadyTime" className="block text-sm font-medium text-gray-700">
              Maximum cooking time (min)
            </label>
            <input
              type="number"
              id="maxReadyTime"
              name="maxReadyTime"
              value={formData.maxReadyTime}
              onChange={handleInputChange}
              min="1"
              max="300"
              placeholder="Example: 30"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-gray-700"
            />
          </div>

          <button
            type="button"
            disabled={!isFormValid}
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:from-orange-600 enabled:hover:to-red-600 transition-all duration-200 transform enabled:hover:scale-105"
          >
            Find recipes
          </button>
        </div>
      </div>
    </div>
  );
};
