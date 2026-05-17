import BaseTable from "@/components/admin/tables/BaseTable";
import { getCourseColumns } from "@/components/admin/tables/tablesColumns/course.columns";
import { getAllCourse, removeCourse } from "@/services/course";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Modal } from "antd";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Courses() {
  const queryClient = useQueryClient();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const router = useRouter();

  const { data: courseData = [], isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: getAllCourse,
  });

  const handleEdit = (id: string) => {
    router.push(`/courses/edit/${id}`);
  };

  const { mutate: handleDeleteUCourse } = useMutation({
    mutationFn: removeCourse,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success("کاربر با موفقیت حذف شد.");
    },
    onError: (err) => {
      toast.error(`خطا در حذف: ${err.message || "خطای نامشخص"}`);
    },
  });

  const handleDelete = (id: string) => {
    handleDeleteUCourse(id);
  };

  return (
    <section className="w-full px-10 flex flex-col py-5">
      <Button
        type="primary"
        className="mb-4 self-end"
        onClick={() => router.push("/courses/create")}
      >
        افزودن دوره
      </Button>
      <BaseTable
        data={courseData}
        columns={getCourseColumns(handleEdit, handleDelete, (cover) => {
          setPreviewImage(cover);
          setPreviewOpen(true);
        })}
      />
      <Modal
        open={previewOpen}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
        centered
        width={600}
      >
        {previewImage && (
          <img
            src={previewImage}
            className="w-full rounded-lg   py-6 border border-gray-200"
          />
        )}
      </Modal>
    </section>
  );
}
