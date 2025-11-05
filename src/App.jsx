import { useState } from 'react';
import Navbar from './components/Navbar';
import FilterPanel from './components/FilterPanel';
import FeedGrid from './components/FeedGrid';
import ResourceModal from './components/ResourceModal';
import { useResources } from './hooks/useResources';

function App() {
  const {
    resources,
    searchQuery,
    setSearchQuery,
    selectedCategories,
    selectedTags,
    toggleCategory,
    toggleTag,
    clearFilters,
    hasActiveFilters,
    categories,
    tags,
    sortBy,
    setSortBy,
  } = useResources();

  const [selectedResource, setSelectedResource] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleResourceClick = (resource) => {
    setSelectedResource(resource);
  };

  const handleCloseModal = () => {
    setSelectedResource(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        resourceCount={resources.length}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar - Desktop Only */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <FilterPanel
              categories={categories}
              tags={tags}
              selectedCategories={selectedCategories}
              selectedTags={selectedTags}
              onToggleCategory={toggleCategory}
              onToggleTag={toggleTag}
              onClearFilters={clearFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </aside>

          {/* Feed */}
          <main className="flex-1 min-w-0">
            <FeedGrid
              resources={resources}
              onResourceClick={handleResourceClick}
              isLoading={isLoading}
            />
          </main>
        </div>
      </div>

      {/* Resource Modal */}
      {selectedResource && (
        <ResourceModal
          resource={selectedResource}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default App;
