export const middleEllipsis = (str: string, maxLength: number) => {
  if (str.length <= maxLength) return str;
  const sliceLength = Math.floor((maxLength - 3) / 2);
  return `${str.slice(0, sliceLength)}...${str.slice(-sliceLength)}`;
};

export const formatSize = (size: number) => {
  return `${Math.round(size / 1024)} KB`;
};
