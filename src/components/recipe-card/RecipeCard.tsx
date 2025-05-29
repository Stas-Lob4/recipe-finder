import Image from 'next/image';
import { SearchedRecipe } from '@/shared/types';

type Props = {
  recipe: SearchedRecipe;
  onClick: (id: number) => void;
};

export const RecipeCard = ({ recipe, onClick }: Props) => (
  <div
    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
    onClick={() => onClick(recipe.id)}
  >
    <Image src={recipe.image} width={300} height={200} alt={recipe.title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">{recipe.title}</h3>
    </div>
  </div>
);
