import { cn } from "@/lib/utils";
import Link from "next/link";

type Tools = {
  href: string;
  label: string;
  comingSoon?: boolean;
};

const tools: Tools[] = [
  { href: "jpeg-to-png", label: "jpeg to png" },
  { href: "heic-to-png", label: "heic to png" },
  { href: "webp-to-png", label: "webp to png" },
  { href: "png-converter", label: "png converter" },
  { href: "formatter/json", label: "JSON formatter" },
  { href: "color-picker", label: "Color Picker" },
  {
    href: "image-cropper",
    label: "Image Cropper",
    comingSoon: true,
  },
  {
    href: "unix-timestamp-converter",
    label: "Unix Timestamp Converter",
    comingSoon: true,
  },
  {
    label: "Base64 Encoder/Decoder",
    href: "base64-encoder",
    comingSoon: true,
  },
  {
    label: "JWT Viewer",
    href: "jwt-viewer",
    comingSoon: true,
  },
  {
    label: "Number Base Converter",
    href: "number-converter",
    comingSoon: true,
  },
];

export default function LandingPage() {
  return (
    <div className="max-w-3xl m-auto">
      <section className="text-center pt-20">
        <div>
          <h1 className="text-hero">CommonTools</h1>

          <p className="text-muted-foreground text-lg">
            Fast, private and ad-free tools for developers and designers.
            Everything runs in your browser and nothing gets uploaded.
          </p>
        </div>

        <div className="pt-12">
          <div className="grid grid-cols-3 gap-4">
            {tools.map(({ href, label, comingSoon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "block p-6 border border-accent rounded-lg hover:bg-accent transition",
                  comingSoon && "border-dashed text-muted-foreground",
                )}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
