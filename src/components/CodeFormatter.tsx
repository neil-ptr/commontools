"use client";

import { Button } from "./ui/button";
import { motion } from "motion/react";
import * as React from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import type * as monaco from "monaco-editor";
import { useEffect, useRef, useState } from "react";
import {
  BrushCleaning,
  CircleCheck,
  Clipboard,
  Expand,
  Minimize,
} from "lucide-react";
import { toast } from "sonner";

const CodeFormatter = () => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const [formatSuccess, setFormatSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isFullScreen, setExpanded] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      editorRef.current?.layout();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleEditorMount: OnMount = (editor) => {
    editorRef.current = editor;

    // Listen for paste or content change
    editor.onDidPaste(() => {
      scrollToBottomLeft(editor);
    });

    // Optional: Also handle manual typing that adds lines
    // editor.onDidChangeModelContent(() => {
    //   scrollToBottomLeft(editor);
    // });
  };

  const scrollToBottomLeft = (editor: monaco.editor.IStandaloneCodeEditor) => {
    const model = editor.getModel();
    if (!model) return;

    const lastLine = model.getLineCount();

    editor.revealLineNearTop(lastLine);

    editor.setScrollPosition({
      scrollLeft: 0,
    });
  };

  const handleFormat = () => {
    const code = editorRef.current?.getValue() || "";

    let formatted;
    try {
      formatted = JSON.parse(code);
    } catch (err) {
      setErrorMsg(String(err));

      setTimeout(() => {
        setErrorMsg("");
      }, 3000);

      return;
    }

    setFormatSuccess(true);
    setTimeout(() => {
      setFormatSuccess(false);
    }, 3000);

    editorRef.current?.setValue(JSON.stringify(formatted, null, 2));
  };

  const handleCopyToClipboard = async () => {
    try {
      const code = editorRef.current?.getValue() || "";
      await navigator.clipboard.writeText(code);
      toast("Code successfully copied to clipboard!", {
        position: "bottom-left",
      });
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleToggleExpanded = async () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div className="h-full">
      <motion.div
        layout
        layoutDependency={isFullScreen}
        initial={{ opacity: 1, paddingTop: "5rem", paddingBottom: "3rem" }}
        animate={isFullScreen ? "collapsed" : "open"}
        variants={{
          open: { opacity: 1, paddingTop: "5rem", paddingBottom: "3rem" },
          collapsed: {
            opacity: 0,
            paddingTop: 0,
            height: 0,
            paddingBottom: 0,
          },
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="text-center max-w-3xl m-auto overflow-hidden px-4"
      >
        <h1 className="text-hero">JSON Formatter</h1>
        <p className="text-muted-foreground text-lg">
          A fast, ad-free JSON formatter that runs entirely in your browser.
          Your data never leaves your device.
        </p>
      </motion.div>

      <motion.div
        layout
        layoutDependency={isFullScreen}
        animate={isFullScreen ? "fullScreen" : "collapsed"}
        initial={{
          maxWidth: "66%",
          margin: "auto",
          padding: "0 1rem",
          height: "400px",
        }}
        variants={{
          collapsed: {
            maxWidth: "66%",
            padding: "0 1rem",
            margin: "auto",
            height: "400px",
          },
          fullScreen: {
            maxWidth: "100%",
            padding: 0,
            height: "100%",
          },
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex flex-col"
      >
        <div className="border-t border-x rounded-t-md px-3 py-2 flex items-center justify-between min-w-fit gap-6">
          <div className="flex gap-2 items-center">
            <Button
              size="sm"
              onClick={handleFormat}
              className="font-semibold flex items-center"
            >
              <BrushCleaning size={16} fontWeight={500} />
              Format
            </Button>

            <Button onClick={handleCopyToClipboard} variant="ghost">
              <Clipboard />
            </Button>
          </div>

          {errorMsg && (
            <div className="text-red-500 font-mono line-clamp-1 text-ellipsis text-sm justify-self-start grow">
              {errorMsg}
            </div>
          )}

          {formatSuccess && (
            <div className="justify-self-start flex items-center gap-1 grow">
              <CircleCheck className="text-green-500" size={16} />
              <span className="font-mono line-clamp-1 text-ellipsis text-sm">
                Formatted Successfully
              </span>
            </div>
          )}

          <Button onClick={handleToggleExpanded} variant="ghost">
            {isFullScreen ? <Minimize /> : <Expand />}
          </Button>
        </div>
        <div className="grow min-h-0">
          <Editor
            language="json"
            theme="vs-dark"
            height="100%"
            className="border border-input"
            onMount={handleEditorMount}
            options={{
              automaticLayout: true,
              suggestOnTriggerCharacters: false,
              quickSuggestions: false,
              wordBasedSuggestions: "off",
              parameterHints: { enabled: false },
              tabCompletion: "off",
              inlineSuggest: { enabled: false },
              fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
              fontSize: 14,
              lineNumbers: "on",
            }}
          />
        </div>

        <div className="border-b border-x rounded-b-md px-3 py-2 flex items-center justify-between min-w-fit"></div>
      </motion.div>
    </div>
  );
};

export default CodeFormatter;
