type Props = {
  onRetry: () => void;
};

export const ErrorState = ({ onRetry }: Props) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
    <div className="text-red-500 text-4xl mb-4">⚠️</div>
    <h3 className="text-lg font-medium text-red-800 mb-2">Error loading recipes</h3>
    <p className="text-red-600 mb-4">Please try changing your search parameters or try again later.</p>
    <button
      onClick={onRetry}
      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
    >
      Try again
    </button>
  </div>
);
