"use client";
import * as React from "react";
import CodeEditorPrimitive from "@uiw/react-textarea-code-editor";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

function CodeEditor({
  className,
  ...props
}: React.ComponentProps<typeof CodeEditorPrimitive>) {
  return (
    <div>
      <div className="border-t border-x rounded-t-md px-3 py-2 flex">
        <Button size="sm">Format</Button>
      </div>
      <CodeEditorPrimitive
        onPaste={() => console.log("attempt format")}
        language="json"
        style={{
          fontFamily:
            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
        }}
        data-slot="textarea"
        className={cn(
          // Self
          "text-monospace",
          "bg-transparent!",
          "text-base! md:text-sm! field-sizing-content!",
          "text-foreground! overflow-visible!",

          // Inner div
          "[&>.w-tc-editor-preview]:px-3! [&>.w-tc-editor-preview]:py-2! [&>.w-tc-editor-preview]:m-0! [&>.w-tc-editor-preview]:min-h-16!",
          "[&>.w-tc-editor-preview]:rounded-b-md! [&>.w-tc-editor-preview]:bg-transparent! [&>.w-tc-editor-preview]:dark:bg-input/30! [&>.w-tc-editor-preview]:shadow-xs! [&>.w-tc-editor-preview]:transition-[color,box-shadow]!",
          "[&>.w-tc-editor-preview]:text-base! [&>.w-tc-editor-preview]:md:text-sm! [&>.w-tc-editor-preview]:field-sizing-content!",
          "[&>.w-tc-editor-preview]:text-foreground! [&>.w-tc-editor-preview]:placeholder:text-muted-foreground!",
          "[&>.w-tc-editor-preview]:outline-none!",
          "[&>.w-tc-editor-preview]:border! [&>.w-tc-editor-preview]:border-input!",

          // Inner textarea
          "[&>.w-tc-editor-text]:px-3! [&>.w-tc-editor-text]:py-2! [&>.w-tc-editor-text]:m-0!",
          "[&>.w-tc-editor-text]:text-base! [&>.w-tc-editor-text]:md:text-sm! [&>.w-tc-editor-text]:field-sizing-content!",
          "[&>.w-tc-editor-text]:text-foreground! [&>.w-tc-editor-text]:placeholder:text-muted-foreground! [&>.w-tc-editor-text]:opacity-100!",
          "[&>.w-tc-editor-text]:subpixel-antialiased!",

          // React on inner textarea
          "[&>.w-tc-editor-text]:disabled:cursor-not-allowed! [&:has(>.w-tc-editor-text:disabled)]:opacity-50!",
          "[&:has(>.w-tc-editor-text:focus-visible)]:[&>.w-tc-editor-preview]:border-ring! [&:has(>.w-tc-editor-text:focus-visible)]:[&>.w-tc-editor-preview]:ring-ring/50! [&:has(>.w-tc-editor-text:focus-visible)]:[&>.w-tc-editor-preview]:ring-[3px]!",
          '[&:has(>.w-tc-editor-text[aria-invalid="true"])]:[&>.w-tc-editor-preview]:ring-destructive/20! dark:[&:has(>.w-tc-editor-text[aria-invalid="true"])]:[&>.w-tc-editor-preview]:ring-destructive/40! [&:has(>.w-tc-editor-text[aria-invalid="true"])]:[&>.w-tc-editor-preview]:border-destructive!',
          className,
        )}
        {...props}
      />
    </div>
  );
}

export { CodeEditor };
