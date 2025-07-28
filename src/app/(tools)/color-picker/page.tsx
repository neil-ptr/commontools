import {
  ColorPicker,
  ColorPickerAlpha,
  ColorPickerEyeDropper,
  ColorPickerFormat,
  ColorPickerHue,
  ColorPickerOutput,
  ColorPickerSelection,
} from "@/components/ui/shadcn-io/color-picker";

export default function ColorPickerPage() {
  return (
    <div className="px-5 max-w-3xl m-auto py-20">
      <div className="text-center">
        <h1 className="text-hero">Image Color Picker</h1>
        <p className="text-muted-foreground text-lg">
          Upload an image to pick individual colors or extract a full color
          palette. All processing happens in your browser. Ad-free, private, and
          free.
        </p>
      </div>

      <div className="pt-12 grid grid-cols-2 gap-4 h-[400px]">
        <div className="h-full border border-accent rounded-md p-4 flex justify-center items-center">
          image
        </div>

        <div className="flex flex-col gap-4">
          <div className="border border-accent rounded-md p-4">
            palette generator
          </div>

          <ColorPicker className="max-w-sm rounded-md border bg-background p-4 shadow-sm grow">
            <ColorPickerSelection />
            <div className="flex items-center gap-4">
              <ColorPickerEyeDropper />
              <div className="grid w-full gap-1">
                <ColorPickerHue />
                <ColorPickerAlpha />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ColorPickerOutput />
              <ColorPickerFormat />
            </div>
          </ColorPicker>
        </div>
      </div>
    </div>
  );
}
