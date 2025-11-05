import { useState, useEffect, useMemo } from 'react';
import mockData from '../data/mockResources.json';
import {
  createFuseIndex,
  searchResources,
  sortResources,
  filterByCategory,
  filterByTags
} from '../utils/searchUtils';

export const useResources = () => {
  const [allResources] = useState(mockData.resources);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState('recent');

  // Create Fuse index for searching
  const fuseIndex = useMemo(() => createFuseIndex(allResources), [allResources]);

  // Get unique categories and tags
  const categories = useMemo(() => {
    const cats = new Set(allResources.map(r => r.category));
    return Array.from(cats).sort();
  }, [allResources]);

  const tags = useMemo(() => {
    const tagSet = new Set();
    allResources.forEach(r => r.tags.forEach(tag => tagSet.add(tag)));
    return Array.from(tagSet).sort();
  }, [allResources]);

  // Apply filters and search
  const filteredResources = useMemo(() => {
    let results = allResources;

    // Apply search first
    if (searchQuery.trim()) {
      const searchResults = searchResources(fuseIndex, searchQuery);
      if (searchResults) {
        results = searchResults;
      }
    }

    // Apply category filter
    results = filterByCategory(results, selectedCategories);

    // Apply tag filter
    results = filterByTags(results, selectedTags);

    // Apply sort
    results = sortResources(results, sortBy);

    return results;
  }, [allResources, searchQuery, selectedCategories, selectedTags, sortBy, fuseIndex]);

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedTags([]);
    setSearchQuery('');
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedTags.length > 0 || searchQuery.trim() !== '';

  return {
    resources: filteredResources,
    allResources,
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
  };
};
