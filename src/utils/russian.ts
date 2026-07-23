const genitiveMap: Record<string, string> = {
  'Яйцо куриное (сырое, целое)': 'яйца куриного (сырое, целое)',
  молоко: 'молока',
};

export const getGenitive = (word: string): string => {
  return genitiveMap[word] || word;
};
