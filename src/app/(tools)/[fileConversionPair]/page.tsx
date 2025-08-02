import { notFound } from "next/navigation";
import FileConverter from "@/components/FileConverter/FileConverter";
import { fileConverterSlugs, ImageType } from "@/lib/fileConverter";
import { Metadata } from "next";

interface Props {
  params: Promise<{ fileConversionPair: string }>;
}

const allowedSlugs = new Set(fileConverterSlugs);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { fileConversionPair } = await params;

  let sourceFormat: string | undefined;
  let targetFormat: string | undefined;

  if (fileConversionPair.includes("-to-")) {
    [sourceFormat, targetFormat] = fileConversionPair.split("-to-");
  } else if (fileConversionPair.endsWith("-converter")) {
    sourceFormat = fileConversionPair.replace("-converter", "");
  }

  if (!allowedSlugs.has(fileConversionPair) || !sourceFormat) {
    return { title: "Not Found" };
  }

  const title = targetFormat
    ? `${sourceFormat.toUpperCase()} to ${targetFormat.toUpperCase()} Converter`
    : `${sourceFormat.toUpperCase()} Converter`;

  const description = targetFormat
    ? `Convert ${sourceFormat.toUpperCase()} to ${targetFormat.toUpperCase()} images instantly in your browser.`
    : `Convert ${sourceFormat.toUpperCase()} images instantly to multiple formats in your browser.`;

  return { title, description };
}

export default async function FileConversionPage({ params }: Props) {
  const { fileConversionPair } = await params;

  let sourceFormat: string | undefined;
  let targetFormat: string | undefined;

  if (fileConversionPair.includes("-to-")) {
    [sourceFormat, targetFormat] = fileConversionPair.split("-to-");
  } else if (fileConversionPair.endsWith("-converter")) {
    sourceFormat = fileConversionPair.replace("-converter", "");
  }

  if (!allowedSlugs.has(fileConversionPair)) {
    notFound();
  }

  return (
    <div className="px-5 max-w-3xl m-auto py-20 animate-in slide-in-from-bottom-[20px] fade-in ease-out">
      <div className="text-center">
        <h1 className="text-hero">
          {sourceFormat?.toUpperCase()}{" "}
          {targetFormat ? `to ${targetFormat.toUpperCase()}` : `Converter`}
        </h1>
        <p className="text-muted-foreground text-lg">
          Fast, local {sourceFormat?.toUpperCase()}{" "}
          {targetFormat ? `to ${targetFormat.toUpperCase()}` : "conversion"}.
          Ad-free and fully private.
        </p>
      </div>

      <div className="pt-12">
        <FileConverter
          sourceFormat={sourceFormat as ImageType}
          targetFormat={targetFormat as ImageType | undefined}
        />
      </div>
    </div>
  );
}
