import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { ImageType } from "./FileConverter";
import { formatSize, middleEllipsis } from "@/lib/fileConverter";

type FileListItemProps = {
  name: string;
  size: number;
  sourceFormat: ImageType;
  targetFormat: ImageType;
  onRemove: () => void;
  onSelectFormat: (format: ImageType) => void;
};

const FileListItem = ({
  name,
  size,
  sourceFormat,
  targetFormat,
  onRemove,
  onSelectFormat,
}: FileListItemProps) => {
  const displayName = middleEllipsis(name, 30);

  return (
    <li key={name} className="pb-4 animate">
      <div className="border p-4 flex items-center rounded-sm justify-between">
        <div className="flex items-center gap-1">
          <div className="font-semibold">{displayName}</div>
          <div className="text-muted-foreground text-sm">
            {formatSize(size)}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Select
            defaultValue={targetFormat}
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
          >
            <X className="text-destructive" />
          </Button>
        </div>
      </div>
    </li>
  );
};

export default FileListItem;
