import Link from "next/link";

export default function LandingPage() {
  const tools = [
    { href: "jpeg-to-png", label: "jpeg to png" },
    { href: "heic-to-png", label: "heic to png" },
    { href: "webp-to-png", label: "webp to png" },
    { href: "formatter/json", label: "JSON formatter" },
    { href: "color-picker", label: "Color Picker" },
    { href: "image-cropper", label: "Image Cropper" },
  ];

  return (
    <div className="max-w-3xl m-auto">
      <section className="text-center pt-20">
        <div>
          <h1 className="text-hero">CommonTools</h1>

          <p className="text-muted-foreground text-lg">
            Useful tools that run entirely in your browser. Built for developers
            and designers. Free to use, no ads, and fully private. Your files
            never leave your device.
          </p>
        </div>

        <div className="pt-12">
          <div className="grid grid-cols-3 gap-4">
            {tools.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="block p-6 border border-accent rounded-lg hover:bg-accent transition"
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
