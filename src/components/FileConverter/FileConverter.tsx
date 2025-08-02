"use client";

import JSZip from "jszip";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { saveAs } from "file-saver";
import { useEffect, useRef, useState } from "react";
import FileListItem from "./FileListItem";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/Spinner";
import {
  convertImage,
  extensionToMimeType,
  FileConversionItem,
  getAcceptedFormat,
  ImageType,
} from "@/lib/fileConverter";
import { toast } from "sonner";

type FileConverterProps = {
  sourceFormat: ImageType;
  targetFormat?: ImageType;
};

const FileConverter = ({
  sourceFormat,
  targetFormat: _targetFormat,
}: FileConverterProps) => {
  const [files, setFiles] = useState<FileConversionItem[]>([]);
  const [submitDirty, setSubmitDirty] = useState(false);
  const [shouldScroll, setShouldScroll] = useState(false);
  const [converting, setConverting] = useState(false);
  const [targetFormat, setTargetFormat] = useState(_targetFormat);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (shouldScroll && files.length > 0) {
      const el = document.getElementById("download-converted-files-button");
      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
        setShouldScroll(false);
      }
    }
  }, [files, shouldScroll]);

  const handleSelectFiles = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubmitDirty(false);

    if (!e.target.files) return;

    setFiles(
      Array.from(e.target.files).map((file) => ({
        id: crypto.randomUUID(),
        format: targetFormat,
        file,
      })),
    );

    setShouldScroll(true);
  };

  const handleConvertAndDownload = async () => {
    setConverting(true);
    setSubmitDirty(true);

    const zip = new JSZip();

    const fileConversionItemWithMissingFormat = files.findLast(
      (fileConversionItem) => !fileConversionItem.format,
    );

    if (fileConversionItemWithMissingFormat) {
      setConverting(false);

      toast.error(
        `Please select a format for "${fileConversionItemWithMissingFormat.file.name}"`,
        {
          position: "bottom-left",
          richColors: true,
        },
      );

      const el = document.getElementById(
        fileConversionItemWithMissingFormat.id,
      );
      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
        setShouldScroll(false);
      }

      return;
    }

    for (const { file, format } of files) {
      const mimeType = extensionToMimeType[format!];
      const blob = await convertImage(file, mimeType);
      const filename = file.name.replace(/\.[^/.]+$/, `.${format}`);
      zip.file(filename, blob);
    }

    setConverting(false);

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "converted_images.zip");
  };

  const handleRemove = (index: number) => {
    const newFiles = [...files];

    newFiles.splice(index, 1);

    setFiles(newFiles);
  };

  const handleSelectFormat = (index: number, format: ImageType) => {
    setFiles((prevFiles) =>
      prevFiles.map((item, i) => (i === index ? { ...item, format } : item)),
    );
  };

  return (
    <div className="space-y-4">
      {files.length > 0 ? (
        <div className="animate-in slide-in-from-bottom-[20px] fade-in ease-out">
          <ul>
            {files.map((fileConversionIttem, index) => (
              <FileListItem
                key={fileConversionIttem.file.name}
                fileConversionItem={fileConversionIttem}
                dirty={submitDirty}
                sourceFormat={sourceFormat}
                converting={converting}
                onRemove={() => handleRemove(index)}
                onSelectFormat={(format) => handleSelectFormat(index, format)}
              />
            ))}
          </ul>
          <div className="flex justify-end gap-6 items-center ">
            <Select
              defaultValue={targetFormat}
              disabled={converting}
              onValueChange={(format) => setTargetFormat(format as ImageType)}
            >
              <SelectTrigger className={"max-w-fit cursor-pointer"}>
                <SelectValue placeholder="Format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="png" disabled={sourceFormat === "png"}>
                  PNG
                </SelectItem>
                <SelectItem
                  value="jpeg"
                  disabled={sourceFormat === "jpeg" || sourceFormat === "jpg"}
                >
                  JPEG/JPG
                </SelectItem>
                <SelectItem value="webp" disabled={sourceFormat === "webp"}>
                  WebP
                </SelectItem>
              </SelectContent>
            </Select>

            <Button
              id="download-converted-files-button"
              className="font-semibold"
              onClick={handleConvertAndDownload}
              disabled={converting}
            >
              {converting ? <Spinner /> : "Convert & Download"}
            </Button>
          </div>
        </div>
      ) : (
        <label htmlFor="file-upload" className="bg-transparent">
          <div className="p-2 bg-accent rounded-lg">
            <div className="block cursor-pointer rounded-xl border border-dashed border-muted-foreground p-4 py-10 text-center transition">
              <div className="py-20">
                <input
                  ref={fileInputRef}
                  id="file-upload"
                  type="file"
                  accept={getAcceptedFormat(sourceFormat)}
                  multiple
                  onChange={handleChange}
                  className="hidden"
                />
                <Button
                  onClick={handleSelectFiles}
                  className="font-medium"
                  variant="outline"
                >
                  Click to choose files
                </Button>
                <p className="text-sm text-muted-foreground">
                  .{sourceFormat} → .{targetFormat}
                </p>
              </div>
            </div>
          </div>
        </label>
      )}
    </div>
  );
};

export default FileConverter;
