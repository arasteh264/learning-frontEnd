"use client";

import BaseTable from "@/src/components/admin/tables/BaseTable";
import { getSessionColumns } from "@/src/components/admin/tables/tablesColumns/sessions.columns";
import { Button, Modal } from "antd";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllSession, removeSession } from "@/src/services/course";
import { useState } from "react";
import { toast } from "react-toastify";

export default function SessionsPage() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewVideo, setPreviewVideo] = useState<string | null>(null);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["sessions"],
    queryFn: getAllSession,
  });

  const handleEdit = (id: string) => {
    router.push(`/sessions/edite/${id}`);
  };

  const { mutate: handleDeleteSession } = useMutation({
    mutationFn: removeSession,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
      toast.success("جلسه با موفقیت حذف شد.");
    },
    onError: (err) => {
      toast.error(`خطا در حذف: ${err.message || "خطای نامشخص"}`);
    },
  });

  const handleDelete = (id: string) => {
    handleDeleteSession(id);
  };

  return (
    <section className="w-full px-10 flex flex-col py-5">
      <div className="flex justify-between items-center mb-4">
        <Button
          type="primary"
          size="large"
          onClick={() => router.push("/admin/sessions/create")}
        >
          افزودن جلسه
        </Button>

        <h2 className="text-xl font-bold">لیست جلسات</h2>
      </div>

      <BaseTable
        data={data ?? []}
        columns={getSessionColumns(handleEdit, handleDelete, (cover) => {
          setPreviewVideo(cover);
          setPreviewOpen(true);
        })}
        loading={isLoading}
      />
      <Modal
        open={previewOpen}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
        centered
        width={600}
      >
        {previewVideo && (
          <video
            src={previewVideo}
            controls
            className="w-full rounded-lg py-6 border border-gray-200"
          />
        )}
      </Modal>
    </section>
  );
}
