"use client";

import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useEffect, useState } from "react";
import FileListItem from "./FileListItem";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/Spinner";
import {
  extensionToMimeType,
  getAcceptedFormat,
  ImageMimeType,
  ImageType,
} from "@/lib/fileConverter";

type FileConverterProps = {
  sourceFormat: ImageType;
  targetFormat: ImageType;
};

type FileConversionItem = { file: File; format: ImageType };

const FileConverter = ({ sourceFormat, targetFormat }: FileConverterProps) => {
  const [files, setFiles] = useState<FileConversionItem[]>([]);
  const [shouldScroll, setShouldScroll] = useState(false);
  const [converting, setConverting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    setFiles(
      Array.from(e.target.files).map((file) => ({
        format: targetFormat,
        file,
      })),
    );

    setShouldScroll(true);
  };

  useEffect(() => {
    if (shouldScroll && files.length > 0) {
      const el = document.getElementById("download-converted-files-button");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setShouldScroll(false);
      }
    }
  }, [files, shouldScroll]);

  const convertImage = async (file: File, toFormat: ImageMimeType) => {
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

  const convert = async () => {
    setConverting(true);

    await new Promise((r) => requestAnimationFrame(r));

    const zip = new JSZip();

    for (const { file, format } of files) {
      const mimeType = extensionToMimeType[format];
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
        <div>
          <ul className="">
            {files.map(({ file, format }, index) => (
              <FileListItem
                key={file.name}
                size={file.size}
                name={file.name}
                sourceFormat={sourceFormat}
                targetFormat={format}
                converting={converting}
                onRemove={() => handleRemove(index)}
                onSelectFormat={(format) => handleSelectFormat(index, format)}
              />
            ))}
          </ul>
          <div className="flex justify-end">
            <Button
              id="download-converted-files-button"
              className="font-semibold"
              onClick={() => convert()}
              disabled={converting}
            >
              {converting ? <Spinner /> : "Convert & Download"}
            </Button>
          </div>
        </div>
      ) : (
        <label htmlFor="file-upload" className="bg-transparent">
          <div className="p-2 rounded-lg">
            <div className="block cursor-pointer rounded-xl border border-dashed border-accent p-4 py-10 text-center transition">
              <div className="py-20">
                <input
                  id="file-upload"
                  type="file"
                  accept={getAcceptedFormat(sourceFormat)}
                  multiple
                  onChange={handleChange}
                  className="hidden"
                />
                <p className="text-foreground font-medium">
                  Click to choose files
                </p>
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
