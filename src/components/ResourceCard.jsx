import { ArrowRight, Sparkles } from 'lucide-react';

const ResourceCard = ({ resource, onClick }) => {
  const truncateText = (text, lines) => {
    return text;
  };

  return (
    <div
      onClick={() => onClick(resource)}
      className={`
        relative bg-white rounded-lg shadow-sm p-6 cursor-pointer
        transition-all duration-200 ease-in-out
        hover:shadow-lg hover:scale-[1.02]
        ${resource.featured ? 'ring-2 ring-transparent bg-gradient-to-br from-blue-50 to-purple-50' : ''}
      `}
    >
      {/* Featured Badge */}
      {resource.featured && (
        <div className="absolute top-3 right-3">
          <Sparkles className="w-5 h-5 text-amber-500" fill="currentColor" />
        </div>
      )}

      {/* Icon Placeholder */}
      <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-400 rounded-lg mb-4 flex items-center justify-center">
        <span className="text-2xl text-white font-bold">
          {resource.title.charAt(0)}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-slate-900 mb-2 line-clamp-2">
        {resource.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-slate-600 mb-4 line-clamp-3">
        {resource.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4 min-h-[2rem]">
        {resource.tags.slice(0, 3).map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-full"
          >
            {tag}
          </span>
        ))}
        {resource.tags.length > 3 && (
          <span className="px-2 py-1 text-xs font-medium text-slate-500">
            +{resource.tags.length - 3}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-primary rounded-full">
          {resource.type}
        </span>
        <div className="flex items-center text-primary text-sm font-medium">
          View
          <ArrowRight className="w-4 h-4 ml-1" />
        </div>
      </div>

      {/* Local Relevance Indicator */}
      {resource.localRelevance && (
        <div className="mt-3 pt-3 border-t border-slate-100">
          <p className="text-xs text-amber-600 flex items-center">
            <span className="mr-1">🌺</span>
            {resource.localRelevance}
          </p>
        </div>
      )}
    </div>
  );
};

export default ResourceCard;
