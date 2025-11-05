import Fuse from 'fuse.js';

export const fuseOptions = {
  keys: [
    { name: 'title', weight: 0.5 },
    { name: 'description', weight: 0.3 },
    { name: 'tags', weight: 0.2 }
  ],
  threshold: 0.3,
  includeScore: true,
  minMatchCharLength: 2,
  ignoreLocation: true,
};

export const createFuseIndex = (resources) => {
  return new Fuse(resources, fuseOptions);
};

export const searchResources = (fuse, query) => {
  if (!query || query.trim() === '') {
    return null;
  }
  return fuse.search(query).map(result => result.item);
};

// Fisher-Yates shuffle algorithm
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const sortResources = (resources, sortBy) => {
  const sorted = [...resources];

  switch (sortBy) {
    case 'recent':
      return sorted.sort((a, b) =>
        new Date(b.submittedDate) - new Date(a.submittedDate)
      );
    case 'random':
      return shuffleArray(sorted);
    default:
      return sorted;
  }
};

export const filterByCategory = (resources, categories) => {
  if (!categories || categories.length === 0) {
    return resources;
  }
  return resources.filter(resource =>
    categories.includes(resource.category)
  );
};

export const filterByTags = (resources, tags) => {
  if (!tags || tags.length === 0) {
    return resources;
  }
  return resources.filter(resource =>
    tags.some(tag => resource.tags.includes(tag))
  );
};
