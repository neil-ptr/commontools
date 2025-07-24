import { CodeEditor } from "@/components/CodeEditor";
export default function FormatterPage() {
  return (
    <div className="px-5 max-w-3xl m-auto py-20">
      <div className="text-center">
        <h1 className="text-hero">JSON Formatter</h1>
        <p className="text-muted-foreground text-lg">
          JSON formatter that doesn&apos;t suck. Ad-free and fully private.
        </p>
      </div>

      <div className="pt-12">
        <CodeEditor />
      </div>
    </div>
  );
}
