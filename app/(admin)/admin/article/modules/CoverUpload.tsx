// components/admin/article/CoverUpload.tsx
"use client";
import { useState } from "react";
import { Upload, message } from "antd";
import type { UploadProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export default function CoverUpload({
  value,
  onChange,
}: {
  value?: File | string | null;
  onChange: (file: File | null) => void;
}) {
  const [preview, setPreview] = useState<string | null>(
    typeof value === "string" ? value : null
  );

  const props: UploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("فقط فایل تصویری مجاز است");
        return false;
      }

      const url = URL.createObjectURL(file);
      setPreview(url);
      onChange(file);

      return false; 
    },
    showUploadList: false,
    accept: "image/*",
  };

  return (
    <Upload.Dragger {...props} className="!p-0">
      {preview ? (
        <img
          src={preview}
          alt="cover preview"
          className="w-full h-48 object-cover rounded-lg"
        />
      ) : (
        <div className="flex flex-col items-center justify-center py-10">
          <PlusOutlined className="text-2xl text-gray-400 mb-2" />
          <p className="text-sm text-gray-500">برای آپلود کاور کلیک یا فایل را بکشید</p>
        </div>
      )}
    </Upload.Dragger>
  );
}