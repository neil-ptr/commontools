export type ImageType = "jpg" | "jpeg" | "png" | "webp" | "heic";

export type ImageMimeType =
  | "image/jpeg"
  | "image/png"
  | "image/webp"
  | "image/jpeg"
  | "image/heic";

export const extensionToMimeType: Record<ImageType, ImageMimeType> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  heic: "image/heic",
};

export const getAcceptedFormat = (imageType: ImageType) => {
  if (imageType === "jpg" || imageType === "jpeg") return ".jpg,.jpeg";
  return imageType;
};

export const middleEllipsis = (str: string, maxLength: number) => {
  if (str.length <= maxLength) return str;
  const sliceLength = Math.floor((maxLength - 3) / 2);
  return `${str.slice(0, sliceLength)}...${str.slice(-sliceLength)}`;
};

const KB = 1024;
const MB = KB * 1024;
const GB = MB * 1024;

export const formatFileSize = (bytes: number): string => {
  if (bytes >= GB) return `(${(bytes / GB).toFixed(1)} GB)`;
  if (bytes >= MB) return `(${(bytes / MB).toFixed(1)} MB)`;
  if (bytes >= KB) return `(${(bytes / KB).toFixed(1)} KB)`;
  return `(${bytes.toFixed(1)} B)`;
};
