import { ImageType } from "@/lib/fileConverter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectFormatProps = {
  sourceFormat: ImageType;
  targetFormat?: ImageType;
  converting: boolean;
  onSelectTargetFormat: (format: ImageType) => void;
};

const SelectFormat = ({
  sourceFormat,
  targetFormat,
  converting,
  onSelectTargetFormat,
}: SelectFormatProps) => {
  return (
    <Select
      defaultValue={targetFormat}
      value={targetFormat}
      disabled={converting}
      onValueChange={(format) => onSelectTargetFormat(format as ImageType)}
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
  );
};

export default SelectFormat;
