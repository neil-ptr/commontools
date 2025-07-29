import CodeFormatter from "@/components/CodeFormatter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Formatter",
  description:
    "Format JSON instantly in your browser. Ad-free, private, and runs locally.",
};

export default function FormatterPage() {
  return (
    <>
      {/* SSR-visible static header for crawlers */}
      <div className="sr-only">
        <h1>JSON Formatter</h1>
        <p>
          Format JSON instantly in your browser. Ad-free, private, and runs
          locally.
        </p>
      </div>
      <CodeFormatter />
    </>
  );
}
