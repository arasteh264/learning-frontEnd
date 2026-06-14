"use client";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function ArticleEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div data-color-mode="light" dir="ltr">
      <MDEditor
        value={value}
        onChange={(val) => onChange(val || "")}
        height={400}
        preview="live"
        textareaProps={{
          dir: "rtl",
          style: { textAlign: "right", fontFamily: "inherit" },
        }}
      />
    </div>
  );
}