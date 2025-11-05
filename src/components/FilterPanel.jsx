import { useState } from 'react';
import { X, Filter, ChevronDown, ChevronUp } from 'lucide-react';

const FilterPanel = ({
  categories,
  tags,
  selectedCategories,
  selectedTags,
  onToggleCategory,
  onToggleTag,
  onClearFilters,
  hasActiveFilters,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const totalActiveFilters = selectedCategories.length + selectedTags.length;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-slate-900 flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          Filters
        </h2>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-primary hover:text-primary-700 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Active Filters - Always rendered with fixed space */}
      <div className="mb-6 pb-6 border-b border-slate-200 min-h-[80px]">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-slate-700">
            Active Filters
            {totalActiveFilters > 0 && (
              <span className="ml-2 text-xs text-slate-500">
                ({totalActiveFilters})
              </span>
            )}
          </h3>
          {totalActiveFilters > 3 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1"
            >
              {isExpanded ? (
                <>
                  Collapse <ChevronUp className="w-3 h-3" />
                </>
              ) : (
                <>
                  Expand <ChevronDown className="w-3 h-3" />
                </>
              )}
            </button>
          )}
        </div>

        {totalActiveFilters === 0 ? (
          <p className="text-xs text-slate-400 italic">No active filters</p>
        ) : (
          <div
            className={`flex flex-wrap gap-2 overflow-hidden transition-all duration-300 ${
              isExpanded ? 'max-h-[500px]' : 'max-h-[60px]'
            }`}
          >
            {selectedCategories.map((category) => (
              <button
                key={category}
                onClick={() => onToggleCategory(category)}
                className="inline-flex items-center px-3 py-1 bg-primary text-white text-xs font-medium rounded-full hover:bg-primary-700 transition-colors"
              >
                {category}
                <X className="w-3 h-3 ml-1" />
              </button>
            ))}
            {selectedTags.map((tag) => (
              <button
                key={tag}
                onClick={() => onToggleTag(tag)}
                className="inline-flex items-center px-3 py-1 bg-accent text-white text-xs font-medium rounded-full hover:bg-accent-600 transition-colors"
              >
                {tag}
                <X className="w-3 h-3 ml-1" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-slate-900 mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => onToggleCategory(category)}
                className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary focus:ring-2"
              />
              <span className="ml-3 text-sm text-slate-700 group-hover:text-slate-900">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div>
        <h3 className="text-sm font-semibold text-slate-900 mb-3">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => onToggleTag(tag)}
              className={`
                px-3 py-1 text-xs font-medium rounded-full transition-colors
                ${
                  selectedTags.includes(tag)
                    ? 'bg-accent text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }
              `}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
