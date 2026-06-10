"use client";

import BaseTable from "@/src/components/admin/tables/BaseTable";
import { getSliderColumns } from "@/src/components/admin/tables/tablesColumns/slider.columns";
import { Button, Modal, Input } from "antd";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { create, getAll, remove, update } from "@/src/services/slider";

type SliderForm = {
  title: string;
  link: string;
  order: number;
  image: FileList;
};

export default function SliderPage() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const isEdit = !!editing?.id;

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["slider"],
    queryFn: getAll,
  });

  const { handleSubmit, reset, control, register, formState: { errors } } = useForm<SliderForm>();

  const createMutation = useMutation({
    mutationFn: create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["slider"] });
      toast.success("با موفقیت اضافه شد");
      cancelModal();
    },
    onError: (err: any) => toast.error(err?.message || "خطا در ایجاد"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) => update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["slider"] });
      toast.success("با موفقیت ویرایش شد");
      cancelModal();
    },
    onError: (err: any) => toast.error(err?.message || "خطا در ویرایش"),
  });

  const deleteMutation = useMutation({
    mutationFn: remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["slider"] });
      toast.success("با موفقیت حذف شد");
    },
    onError: (err: any) => toast.error(err?.message || "خطا در حذف"),
  });

  const handleAdd = () => {
    setEditing(null);
    setPreview(null);
    reset({ title: "", link: "", order: 0 });
    setOpen(true);
  };

  const handleEdit = async (record: any) => {
    setEditing(record);
    setPreview(record.image_url);
    reset({ title: record.title, link: record.link, order: record.order });
    setOpen(true);
  };

  const handleDelete = (record: any) => deleteMutation.mutate(record.id);

  const cancelModal = () => {
    setOpen(false);
    setEditing(null);
    setPreview(null);
    reset();
  };

  const onSubmit = (formData: SliderForm) => {
    const fd = new FormData();
    fd.append("title", formData.title);
    fd.append("link", formData.link || "");
    fd.append("order", String(formData.order || 0));
    if (formData.image?.[0]) fd.append("image", formData.image[0]);

    if (isEdit) {
      updateMutation.mutate({ id: editing.id, data: fd });
    } else {
      createMutation.mutate(fd);
    }
  };

  return (
    <section className="w-full px-10 flex flex-col mt-6">
      <Button type="primary" className="mb-4 self-end" onClick={handleAdd}>
        افزودن اسلایدر
      </Button>

      <BaseTable
        data={data}
        loading={isLoading || isFetching}
        columns={getSliderColumns(handleEdit, handleDelete)}
      />

      <Modal
        open={open}
        onCancel={cancelModal}
        onOk={handleSubmit(onSubmit)}
        okText="ذخیره"
        cancelText="بستن"
        title={isEdit ? "ویرایش اسلایدر" : "افزودن اسلایدر"}
        width={520}
      >
        <div className="flex flex-col gap-4">
          {/* عکس */}
          <div>
            <label className="text-sm font-medium text-gray-600">عکس:</label>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setPreview(URL.createObjectURL(file));
              }}
              className="mt-1 block w-full text-sm text-gray-500"
            />
            {preview && (
              <img src={preview} alt="preview" className="mt-2 rounded-lg w-full h-40 object-cover" />
            )}
          </div>

          {/* عنوان */}
          <div>
            <label className="text-sm font-medium text-gray-600">عنوان:</label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => <Input {...field} placeholder="عنوان اسلایدر" />}
            />
          </div>

          {/* لینک */}
          <div>
            <label className="text-sm font-medium text-gray-600">لینک:</label>
            <Controller
              name="link"
              control={control}
              render={({ field }) => <Input {...field} placeholder="مثلاً: /courses/python" />}
            />
          </div>

          {/* ترتیب */}
          <div>
            <label className="text-sm font-medium text-gray-600">ترتیب:</label>
            <Controller
              name="order"
              control={control}
              render={({ field }) => (
                <Input {...field} type="number" placeholder="مثلاً: 1" />
              )}
            />
          </div>
        </div>
      </Modal>
    </section>
  );
}