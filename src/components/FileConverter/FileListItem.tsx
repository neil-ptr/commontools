import { Button } from "@/components/ui/button";
import { X, Image as ImageIcon } from "lucide-react";
import {
  FileConversionItem,
  formatFileSize,
  ImageType,
  middleEllipsis,
} from "@/lib/fileConverter";
import SelectFormat from "@/components/FileConverter/SelectFormat";

type FileListItemProps = {
  fileConversionItem: FileConversionItem;
  sourceFormat: ImageType;
  converting: boolean;
  dirty: boolean;
  onRemove: () => void;
  onSelectFormat: (format: ImageType) => void;
};

const FileListItem = ({
  fileConversionItem,
  sourceFormat,
  onRemove,
  converting,
  onSelectFormat,
}: FileListItemProps) => {
  const { id, file, format: targetFormat } = fileConversionItem;
  const displayName = middleEllipsis(fileConversionItem.file.name, 30);

  return (
    <li id={id} className="pb-4 animate min-w-fit">
      <div className="border p-4 flex items-center rounded-sm justify-between gap-4">
        <div className="flex items-center gap-1">
          <ImageIcon size={24} className="text-orange-500 shrink-0" />
          <div className="font-semibold">{displayName}</div>
          <div className="text-muted-foreground text-sm">
            {formatFileSize(file.size)}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <SelectFormat
            sourceFormat={sourceFormat}
            targetFormat={targetFormat}
            converting={converting}
            onSelectTargetFormat={onSelectFormat}
          />

          <Button
            className="cursor-pointer"
            onClick={() => onRemove()}
            variant="ghost"
            aria-label="remove file"
            disabled={converting}
          >
            <X className="text-destructive" />
          </Button>
        </div>
      </div>
    </li>
  );
};

export default FileListItem;
