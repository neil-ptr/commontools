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
  const [sourceFormat, targetFormat] = fileConversionPair.split("-to-");

  if (!allowedSlugs.has(fileConversionPair)) {
    return {
      title: "not found",
    };
  }

  const title = `${sourceFormat.toUpperCase()} to ${targetFormat.toUpperCase()} Converter`;
  const description = `Convert ${sourceFormat.toUpperCase()} to ${targetFormat.toUpperCase()} images instantly in your browser. Fast, private, and ad-free.`;

  return {
    title,
    description,
  };
}

export default async function FileConversionPage({ params }: Props) {
  const { fileConversionPair } = await params;
  const [sourceFormat, targetFormat] = fileConversionPair.split("-to-");

  if (!allowedSlugs.has(`${sourceFormat}-to-${targetFormat}`)) {
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
