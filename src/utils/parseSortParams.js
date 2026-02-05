// Sıralama yönünü kontrol eden fonksiyon
const parseSortOrder = (sortOrder) => {
  const isKnownOrder = ['asc', 'desc'].includes(sortOrder);
  if (isKnownOrder) {
    return sortOrder;
  }
  return 'asc';
};

// Sıralacanak alanı kontrol eden fonksiyon
const parseSortBy = (sortBy) => {
  const keys = ['_id', 'name', 'createdAt', 'updatedAt'];
  if (keys.includes(sortBy)) {
    return sortBy;
  }
  return '_id';
};

// Ana fonksiyon: Sıralama parametrelerini ayrıştırır
export const parseSortParams = (query) => {
  const { sortOrder, sortBy } = query;
  const parsedSortOrder = parseSortOrder(sortOrder);
  const parsedSortBy = parseSortBy(sortBy);
  return { sortOrder: parsedSortOrder, sortBy: parsedSortBy };
};
