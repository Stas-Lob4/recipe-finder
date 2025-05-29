import { SearchParams } from '@/shared/types';

type Props = {
  params: SearchParams;
};

export const SearchParameters = ({ params }: Props) => {
  const cuisineNames = {
    italian: 'Italian',
    mexican: 'Mexican',
    chinese: 'Chinese',
    french: 'French',
    indian: 'Indian',
    japanese: 'Japanese',
    thai: 'Thai',
    mediterranean: 'Mediterranean',
  };

  const paramsList = [];

  if (params.query) {
    paramsList.push(`Query: "${params.query}"`);
  }
  if (params.cuisine) {
    paramsList.push(`Cuisine: ${cuisineNames[params.cuisine]}`);
  }
  if (params.maxReadyTime) {
    paramsList.push(`Time: to ${params.maxReadyTime} min`);
  }

  return <div className="text-gray-600 mb-4">{paramsList.join(' • ')}</div>;
};
