"use client";

import JSZip from "jszip";

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
import SelectFormat from "./SelectFormat";
import { ImageOff } from "lucide-react";

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

    const newFiles = Array.from(e.target.files).map((file) => ({
      id: crypto.randomUUID(),
      format: targetFormat,
      file,
    }));

    setFiles((prevFiles) => {
      return [...prevFiles, ...newFiles];
    });

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

  const handleSelectIndividualFileFormat = (
    index: number,
    format: ImageType,
  ) => {
    setFiles((prevFiles) =>
      prevFiles.map((item, i) => (i === index ? { ...item, format } : item)),
    );
  };

  const handleSelectTargetFormat = (format: ImageType) => {
    setTargetFormat(format);

    setFiles((prevFiles) =>
      prevFiles.map((fileConversionItem) => ({
        ...fileConversionItem,
        format,
      })),
    );
  };

  console.log(files);

  return (
    <div className="space-y-4">
      {files.length > 0 ? (
        <div className="animate-in slide-in-from-bottom-[20px] fade-in ease-out">
          <ul>
            {files.map((fileConversionItem, index) => (
              <FileListItem
                key={fileConversionItem.id}
                fileConversionItem={fileConversionItem}
                dirty={submitDirty}
                sourceFormat={sourceFormat}
                converting={converting}
                onRemove={() => handleRemove(index)}
                onSelectFormat={(format) =>
                  handleSelectIndividualFileFormat(index, format)
                }
              />
            ))}
          </ul>
          <div className="flex justify-between">
            <div className="flex gap-4">
              <Button className="font-semibold" onClick={handleSelectFiles}>
                <input
                  ref={fileInputRef}
                  id="file-upload"
                  type="file"
                  accept={getAcceptedFormat(sourceFormat)}
                  multiple
                  onChange={handleChange}
                  className="hidden"
                />
                Add More
              </Button>
              <Button className="font-semibold" onClick={() => setFiles([])}>
                <ImageOff /> Clear
              </Button>
            </div>

            <div className="flex justify-end gap-4 items-center ">
              <SelectFormat
                sourceFormat={sourceFormat}
                targetFormat={targetFormat}
                converting={converting}
                onSelectTargetFormat={handleSelectTargetFormat}
              />

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
        </div>
      ) : (
        <label
          htmlFor="file-upload"
          className="bg-transparent animate-in fade-in"
        >
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
