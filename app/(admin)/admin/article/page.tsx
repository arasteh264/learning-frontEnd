// "use client";
// import dynamic from "next/dynamic";
// import { useRef, useState } from "react";
// import "@uiw/react-md-editor/markdown-editor.css";
// import "@uiw/react-markdown-preview/markdown.css";
// import { commands, ICommand, TextAreaTextApi, TextState } from "@uiw/react-md-editor";

// import { ImageIcon, Loader2 } from "lucide-react";
// import { uploadContentImage } from "@/src/services/upload";

// const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

// export default function ArticleEditor({
//   value,
//   onChange,
// }: {
//   value: string;
//   onChange: (v: string) => void;
// }) {
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const apiRef = useRef<TextAreaTextApi | null>(null);
//   const [uploading, setUploading] = useState(false);

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file || !apiRef.current) return;

//     setUploading(true);
//     try {
//       const { url } = await uploadContentImage(file);
//       apiRef.current.replaceSelection(`![تصویر](${url})`);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setUploading(false);
//       e.target.value = "";
//     }
//   };

//   const uploadImageCommand: ICommand = {
//     name: "upload-image",
//     keyCommand: "upload-image",
//     buttonProps: { "aria-label": "افزودن عکس", title: "افزودن عکس" },
//     icon: uploading ? (
//       <Loader2 size={13} className="animate-spin" />
//     ) : (
//       <ImageIcon size={13} />
//     ),
//     execute: (_state: TextState, api: TextAreaTextApi) => {
//       apiRef.current = api;
//       fileInputRef.current?.click();
//     },
//   };

//   return (
//     <div data-color-mode="light" dir="ltr" className="px-5 py-5">
//       <input
//         ref={fileInputRef}
//         type="file"
//         accept="image/*"
//         onChange={handleFileChange}
//         className="hidden"
//       />

//       <MDEditor
//         value={value}
//         onChange={(val) => onChange(val || "")}
//         height={450}
//         preview="live"
//         commands={[
//           commands.bold,
//           commands.italic,
//           commands.strikethrough,
//           commands.divider,
//           commands.title1,
//           commands.title2,
//           commands.title3,
//           commands.divider,
//           commands.link,
//           commands.quote,
//           commands.code,
//           commands.divider,
//           commands.unorderedListCommand,
//           commands.orderedListCommand,
//           commands.divider,
//           commands.table,
//           commands.divider,
//           uploadImageCommand,
//         ]}
//         extraCommands={[
//           commands.codeEdit,
//           commands.codeLive,
//           commands.codePreview,
//         ]}
//         textareaProps={{
//           dir: "rtl",
//           placeholder: "متن مقاله را اینجا بنویسید...",
//           style: { textAlign: "right", fontFamily: "inherit", fontSize: 14 },
//         }}
//       />
//     </div>
//   );
// }

"use client";

import BaseTable from "@/src/components/admin/tables/BaseTable";

import { Button, Select } from "antd";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllArticles, removeArticle } from "@/src/services/article";
import { toast } from "react-toastify";
import { getArticleColumns } from "@/src/components/admin/tables/tablesColumns/articles.columns";
import { useState } from "react";

export default function ArticlesPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
const [status, setStatus] = useState("published");
  const { data, isLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: () => getAllArticles(status),
  });

  const handleEdit = (id: string) => {
    router.push(`/articles/edit/${id}`);
  };

  const { mutate: handleDeleteArticle } = useMutation({
    mutationFn: removeArticle,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["articles"],
      });

      toast.success("مقاله با موفقیت حذف شد.");
    },

    onError: (err: any) => {
      toast.error(`خطا در حذف: ${err.message || "خطای نامشخص"}`);
    },
  });

  const handleDelete = (id: string) => {
    handleDeleteArticle(id);
  };

  return (
<div className="flex justify-between items-center mb-4">
  <Button
    type="primary"
    size="large"
    onClick={() => router.push("/articles/create")}
  >
    افزودن مقاله
  </Button>

  <div className="flex items-center gap-3">
    <Select
      value={status}
      onChange={setStatus}
      style={{ width: 180 }}
      options={[
        {
          label: "منتشر شده",
          value: "published",
        },
        {
          label: "پیش نویس",
          value: "draft",
        },
      ]}
    />

    <h2 className="text-xl font-bold">لیست مقالات</h2>
  </div>
</div>
  );
}