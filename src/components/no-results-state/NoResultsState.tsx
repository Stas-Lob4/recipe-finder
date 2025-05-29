type Props = {
  onNewSearch: () => void;
};

export const NoResultsState = ({ onNewSearch }: Props) => (
  <div className="text-center py-12">
    <div className="text-gray-400 text-6xl mb-4">🔍</div>
    <h3 className="text-xl font-medium text-gray-800 mb-2">Рецепты не найдены</h3>
    <p className="text-gray-600 mb-6">Попробуйте изменить параметры поиска</p>
    <button
      onClick={onNewSearch}
      className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors duration-200"
    >
      Новый поиск
    </button>
  </div>
);
