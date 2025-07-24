import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X, Image as ImageIcon } from "lucide-react";
import { formatFileSize, ImageType, middleEllipsis } from "@/lib/fileConverter";

type FileListItemProps = {
  name: string;
  size: number;
  sourceFormat: ImageType;
  targetFormat: ImageType;
  converting: boolean;
  onRemove: () => void;
  onSelectFormat: (format: ImageType) => void;
};

const FileListItem = ({
  name,
  size,
  sourceFormat,
  targetFormat,
  onRemove,
  converting,
  onSelectFormat,
}: FileListItemProps) => {
  const displayName = middleEllipsis(name, 30);

  return (
    <li key={name} className="pb-4 animate min-w-fit">
      <div className="border p-4 flex items-center rounded-sm justify-between gap-4">
        <div className="flex items-center gap-1">
          <ImageIcon size={24} className="text-orange-500 shrink-0" />
          <div className="font-semibold">{displayName}</div>
          <div className="text-muted-foreground text-sm">
            {formatFileSize(size)}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Select
            defaultValue={targetFormat}
            disabled={converting}
            onValueChange={(format) => onSelectFormat(format as ImageType)}
          >
            <SelectTrigger className="max-w-fit cursor-pointer">
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
