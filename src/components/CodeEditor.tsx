"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import MonacoEditor from "react-monaco-editor";

function CodeEditor({
  className,
  ...props
}: React.ComponentProps<typeof MonacoEditor>) {
  return (
    <div>
      <div className="border-t border-x rounded-t-md px-3 py-2 flex">
        <Button size="sm">Format</Button>
      </div>
      <MonacoEditor
        className={cn("w-full border-b", className)}
        height="400"
        language="json"
        theme="vs-dark"
        {...props}
      />
    </div>
  );
}

export { CodeEditor };
