"use client";

import { useEffect, useState } from "react";
import { Upload, message } from "antd";
import type { UploadProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Image from "next/image";

export default function CoverUpload({
  value,
  onChange,
  existingUrl,
}: {
  value?: File | null;
  onChange: (file: File | null) => void;
  existingUrl?: string | undefined;
}) {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!value && existingUrl) {
      setPreview(existingUrl);
    }
  }, [existingUrl, value]);

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
        <div className="relative group">
          <Image
            src={preview}
            alt="cover preview"
            width={800}
            height={400}
            className="rounded-lg object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
            <p className="text-white text-sm">برای تغییر کلیک کنید</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10">
          <PlusOutlined className="text-2xl text-gray-400 mb-2" />
          <p className="text-sm text-gray-500">
            برای آپلود کاور کلیک یا فایل را بکشید
          </p>
        </div>
      )}
    </Upload.Dragger>
  );
}
