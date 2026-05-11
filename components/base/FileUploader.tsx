"use client";

import { useState } from "react";

import {
  Upload,
  Button,
  Modal,
  Image,
} from "antd";

import {
  UploadOutlined,
  EyeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

type Props = {
  value?: any;
  onChange?: (file: any) => void;
  type?: "image" | "video";
  buttonText?: string;
};

export default function FileUploader({
  value,
  onChange,
  type = "image",
  buttonText = "آپلود فایل",
}: Props) {
  const [previewOpen, setPreviewOpen] =
    useState(false);

  const getFileUrl = () => {
    if (!value) return "";

    if (typeof value === "string") {
      return value;
    }

    return URL.createObjectURL(
      value.originFileObj || value
    );
  };

  const fileUrl = getFileUrl();

  const fileList = value
    ? [
        {
          uid: "-1",
          name:
            typeof value === "string"
              ? `${type}`
              : value.name,
          status: "done",
          url:
            typeof value === "string"
              ? value
              : undefined,
          originFileObj:
            typeof value !== "string"
              ? value.originFileObj || value
              : undefined,
        },
      ]
    : [];

  return (
    <>
      <div className="flex flex-col gap-3">

        <Upload
          maxCount={1}
          beforeUpload={(file) => {
            onChange?.(file);
            return false;
          }}
          onRemove={() => onChange?.(null)}
          fileList={fileList as any}
          showUploadList={false}
        >
          {!value && (
            <Button icon={<UploadOutlined />}>
              {buttonText}
            </Button>
          )}
        </Upload>

        {value && (
          <div className="border border-gray-200 rounded-xl p-3 flex items-center justify-between">

            <div className="flex items-center gap-3">

              {type === "image" ? (
                <img
                  src={fileUrl}
                  alt="preview"
                  className="w-20 h-20 object-cover rounded-lg border"
                />
              ) : (
                <video
                  src={fileUrl}
                  className="w-24 h-16 rounded-lg  object-cover"
                />
              )}

              <span className="text-sm">
                {typeof value === "string"
                  ? `${type} uploaded`
                  : value.name}
              </span>

            </div>

            <div className="flex items-center gap-2">

              <Button
                icon={<EyeOutlined />}
                onClick={() =>
                  setPreviewOpen(true)
                }
              >
                مشاهده
              </Button>

              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => onChange?.(null)}
              >
                حذف
              </Button>

            </div>

          </div>
        )}
      </div>

      <Modal
        open={previewOpen}
        footer={null}
        onCancel={() =>
          setPreviewOpen(false)
        }
        centered
        width={800}
      >
        {type === "image" ? (
          <Image
            src={fileUrl}
            preview={false}
            className="rounded-lg"
          />
        ) : (
          <video
            src={fileUrl}
            controls
            className="w-full rounded-lg"
          />
        )}
      </Modal>
    </>
  );
}