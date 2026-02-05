// Boolean değerini (true/false) doğru algılayan fonksiyon
const parseBoolean = (number) => {
  if (!['true', 'false'].includes(number)) return undefined;
  return number === 'true';
};

// Kişi tipini (work/home/personal) kontrol eden fonksiyon
const parseContactType = (type) => {
  const isKnownType = ['work', 'home', 'personal'].includes(type);
  if (isKnownType) return type;
  return undefined;
};

export const parseFilterParams = (query) => {
  const { type, isFavourite, name } = query;

  const parsedType = parseContactType(type);
  const parsedIsFavourite = parseBoolean(isFavourite);

  return {
    type: parsedType,
    isFavourite: parsedIsFavourite,
    name: name,
  };
};
