import { notFound } from "next/navigation";
import FileConverter, {
  ImageType,
} from "@/components/FileConverter/FileConverter";

interface Props {
  params: Promise<{ fileConversionPair: string }>;
}

const allowedPairs = new Set([
  "jpeg-to-png",
  "jpg-to-png",
  "png-to-jpg",
  "png-to-jpeg",
  "webp-to-png",
  "png-to-webp",
  "heic-to-jpg",
  "heic-to-png",
  "heic-to-jpeg",
]);

export default async function FileConversionPage({ params }: Props) {
  const { fileConversionPair } = await params;
  const [sourceFormat, targetFormat] = fileConversionPair.split("-to-");

  if (!allowedPairs.has(`${sourceFormat}-to-${targetFormat}`)) {
    notFound();
  }

  return (
    <div className="px-5 max-w-3xl m-auto py-20">
      <div className="text-center">
        <h1 className="text-hero">
          {sourceFormat.toUpperCase()} to {targetFormat.toUpperCase()}
        </h1>
        <p className="text-muted-foreground text-lg">
          Fast, local {sourceFormat.toUpperCase()} to{" "}
          {targetFormat.toUpperCase()} conversion. Ad-free and fully private.
        </p>
      </div>

      <div className="pt-12">
        <FileConverter
          sourceFormat={sourceFormat as ImageType}
          targetFormat={targetFormat as ImageType}
        />
      </div>
    </div>
  );
}
