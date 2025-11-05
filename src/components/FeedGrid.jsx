import ResourceCard from './ResourceCard';
import { Search } from 'lucide-react';

const FeedGrid = ({ resources, onResourceClick, isLoading, isBookmarked, onToggleBookmark }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm p-6 animate-pulse"
          >
            <div className="w-16 h-16 bg-slate-200 rounded-lg mb-4"></div>
            <div className="h-6 bg-slate-200 rounded mb-2 w-3/4"></div>
            <div className="h-4 bg-slate-200 rounded mb-2 w-full"></div>
            <div className="h-4 bg-slate-200 rounded mb-4 w-5/6"></div>
            <div className="flex gap-2 mb-4">
              <div className="h-6 bg-slate-200 rounded-full w-16"></div>
              <div className="h-6 bg-slate-200 rounded-full w-16"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (resources.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <Search className="w-10 h-10 text-slate-400" />
        </div>
        <h3 className="text-xl font-semibold text-slate-700 mb-2">
          No resources found
        </h3>
        <p className="text-slate-500 max-w-md">
          Try adjusting your filters or search query to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources.map((resource) => (
        <ResourceCard
          key={resource.id}
          resource={resource}
          onClick={onResourceClick}
          isBookmarked={isBookmarked(resource.id)}
          onToggleBookmark={onToggleBookmark}
        />
      ))}
    </div>
  );
};

export default FeedGrid;
