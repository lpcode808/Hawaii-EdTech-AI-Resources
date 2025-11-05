import { useState } from 'react';
import Navbar from './components/Navbar';
import FilterPanel from './components/FilterPanel';
import FeedGrid from './components/FeedGrid';
import ResourceModal from './components/ResourceModal';
import SubmissionForm from './components/SubmissionForm';
import { AuthProvider } from './contexts/AuthContext';
import { useResources } from './hooks/useResources';
import { useBookmarks } from './hooks/useBookmarks';
import { submitResourceToAirtable } from './services/airtable';

function AppContent() {
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

  const { isBookmarked, toggleBookmark } = useBookmarks();

  const [selectedResource, setSelectedResource] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmissionFormOpen, setIsSubmissionFormOpen] = useState(false);

  const handleResourceClick = (resource) => {
    setSelectedResource(resource);
  };

  const handleCloseModal = () => {
    setSelectedResource(null);
  };

  const handleSubmitResource = async (resourceData) => {
    try {
      await submitResourceToAirtable(resourceData);
      alert('Resource submitted successfully! It will be reviewed before being published.');
    } catch (error) {
      console.error('Error submitting resource:', error);
      throw error;
    }
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
        onSubmitClick={() => setIsSubmissionFormOpen(true)}
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
              isBookmarked={isBookmarked}
              onToggleBookmark={toggleBookmark}
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

      {/* Submission Form */}
      <SubmissionForm
        isOpen={isSubmissionFormOpen}
        onClose={() => setIsSubmissionFormOpen(false)}
        onSubmit={handleSubmitResource}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
