const parseNumber = (value, defaultValue) => {
  const isString = typeof value === 'string';
  if (!isString) {
    return defaultValue;
  }
  const parsedNumber = parseInt(value, 10);
  if (Number.isNaN(parsedNumber)) {
    return defaultValue;
  }
  return parsedNumber;
};

export const parsePaginationParams = (query) => {
  const { page, perPage } = query;
  return {
    page: parseNumber(page, 1),
    perPage: parseNumber(perPage, 10),
  };
};
