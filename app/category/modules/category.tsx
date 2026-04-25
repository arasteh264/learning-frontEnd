import BaseTable from "@/components/tables/BaseTable";
import { getCourseColumns } from "@/components/tables/tablesColumns/course.columns";
import { Button, Modal } from "antd";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Category() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const router = useRouter();
  const [data, setData] = useState([
    {
      id: 1,
      title: "React Next",
      teacher: "Ali",
      price: "500,000",
      status: true,
      cover:"/images/young-man.webp"
    },
  ]);

  const handleEdit = (record: any) => {
    console.log("edit:", record);
  };

  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <section className="w-full px-10 flex flex-col">
      <Button
        type="primary"
        className="mb-4 self-end"
        onClick={() => router.push("/courses/create")}
      >
        افزودن دسته بندی
      </Button>
<BaseTable
  data={data}
  columns={getCourseColumns(
    handleEdit,
    handleDelete,
    (cover) => {
      setPreviewImage(cover);
      setPreviewOpen(true);
    }
  )}
/>
<Modal
  open={previewOpen}
  footer={null}
  onCancel={() => setPreviewOpen(false)}
  centered
  width={300}
>
  {previewImage && (
    <img src={previewImage} className="w-full rounded-lg" />
  )}
</Modal>
    </section>
  );
}
