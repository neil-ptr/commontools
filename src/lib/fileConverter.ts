export type ImageType = "jpg" | "jpeg" | "png" | "webp" | "heic";

export type FileConversionItem = {
  id: string;
  file: File;
  format?: ImageType;
};

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

export const fileConverterSlugs = [
  "jpeg-to-jpg",
  "jpeg-to-png",
  "jpeg-to-webp",
  "jpg-to-jpeg",
  "jpg-to-png",
  "jpg-to-webp",

  "png-to-jpeg",
  "png-to-jpg",
  "png-to-webp",

  "webp-to-jpeg",
  "webp-to-jpg",
  "webp-to-png",

  "heic-to-jpg",
  "heic-to-png",
  "heic-to-jpeg",

  "png-converter",
  "jpg-converter",
  "jpeg-converter",
  "heic-converter",
];

export const getAcceptedFormat = (imageType: ImageType) => {
  if (imageType === "jpg" || imageType === "jpeg") return ".jpg,.jpeg";
  return `.${imageType}`;
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

export const convertImage = async (file: File, toFormat: ImageMimeType) => {
  const img = new Image();
  img.src = URL.createObjectURL(file);

  await new Promise((res) => {
    img.onload = res;
  });

  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0);

  return new Promise<Blob>((resolve) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
      },
      toFormat,
      1,
    );
  });
};
