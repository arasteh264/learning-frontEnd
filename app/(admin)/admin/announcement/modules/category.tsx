"use client";

import BaseTable from "@/src/components/admin/tables/BaseTable";
import { getannouncementColumns } from "@/src/components/admin/tables/tablesColumns/announcement.columns";
import { Button, Modal, Input } from "antd";
import { useMemo, useState } from "react";

import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { create, getAll, remove, update } from "@/src/services/announcement";

type AnnouncementForm = {
  title: string;
  href: string;
};

export default function AnnouncementPage() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["announcement"],
    queryFn: getAll,
  });
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const isEdit = !!editing?.id;

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<AnnouncementForm>({
    defaultValues: { title: "", href: "" },
  });

  const modalKey = useMemo(
    () => (isEdit ? `edit-${editing?.id}` : "add"),
    [isEdit, editing?.id],
  );

  const createMutation = useMutation({
    mutationFn: create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcement"] });
      toast.success("با موفقیت اضافه شد");
      setOpen(false);
      reset({ title: "", href: "" });
    },
    onError: (err: any) => {
      toast.error(err?.message || "خطا در ایجاد");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: AnnouncementForm }) =>
      update(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcement"] });
      toast.success("با موفقیت ویرایش شد");
      setOpen(false);
      setEditing(null);
    },
    onError: (err: any) => {
      toast.error(err?.message || "خطا در ویرایش");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcement"] });
      toast.success("با موفقیت حذف شد");
    },
    onError: (err: any) => {
      toast.error(err?.message || "خطا در حذف");
    },
  });

  const handleAdd = () => {
    setEditing(null);
    reset({ title: "", href: "" });
    setOpen(true);
  };

  const handleEdit = (record: any) => {
    setEditing(record);
    reset({
      title: record?.title || "",
      href: record?.href || "",
    });
    setOpen(true);
  };

  const handleDelete = (record: any) => {
    deleteMutation.mutate(record.id);
  };

  const onSubmit = (formData: AnnouncementForm) => {
    if (isEdit) {
      updateMutation.mutate({
        id: editing.id,
        data: formData,
      });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <section className="w-full px-10 flex flex-col mt-6">
      <Button type="primary" className="mb-4 self-end" onClick={handleAdd}>
        افزودن اعلان
      </Button>

      <BaseTable
        data={data}
        loading={isLoading}
        columns={getannouncementColumns(handleEdit, handleDelete)}
      />

      <Modal
        key={modalKey}
        open={open}
        onCancel={() => setOpen(false)}
        onOk={handleSubmit(onSubmit)}
        okText="ذخیره"
        cancelText="بستن"
        title={isEdit ? "ویرایش اعلان" : "افزودن اعلان"}
        width={420}
      >
        <div className="flex flex-col gap-3">
          {/* TITLE */}
          <div>
            <label>عنوان</label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="مثلاً: اخبار تکنولوژی" />
              )}
            />
            {errors.title && (
              <p className="text-red-500 text-xs">{errors.title.message}</p>
            )}
          </div>

          {/* HREF */}
          <div>
            <label>لینک</label>
            <Controller
              name="href"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="/tech-news" />
              )}
            />
            {errors.href && (
              <p className="text-red-500 text-xs">{errors.href.message}</p>
            )}
          </div>
        </div>
      </Modal>
    </section>
  );
}
