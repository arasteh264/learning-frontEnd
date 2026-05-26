"use client";

import BaseTable from "@/src/components/admin/tables/BaseTable";
import { getCategoryColumns } from "@/src/components/admin/tables/tablesColumns/category.columns";
import { Button, Modal, Input } from "antd";
import { useMemo, useState } from "react";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema } from "@/src/validation/category.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addCategory,
  getCategoryList,
  removeCategory,
  updateCategory,
} from "@/src/services/category";
import { toast } from "react-toastify";

type CategoryForm = {
  title: string;
  href: string;
};

export default function Category() {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["category"],
    queryFn: getCategoryList,
  });

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const isEdit = !!editing?.id;

  const {
    handleSubmit,
    reset,
    trigger,
    control,
    formState: { errors },
  } = useForm<CategoryForm>({
    resolver: zodResolver(categorySchema),
    defaultValues: { title: "", href: "" },
    mode: "onSubmit",
  });

  const modalKey = useMemo(
    () => (isEdit ? `edit-${editing?.id ?? "x"}` : "add"),
    [isEdit, editing?.id],
  );

  const handleAdd = () => {
    setEditing(null);
    reset({ title: "", href: "" });
    setOpen(true);
  };

  const handleEdit = (record: any) => {
    setEditing(record);
    const next = {
      title: record?.title ?? "",
      href: record?.href ?? "",
    };

    reset(next);
    trigger(["title", "href"]);
    setOpen(true);
  };

  const handleDelete = (record: any) => {
    removeMutation.mutate(record.id);
  };

  const addMutation = useMutation({
    mutationFn: (newCategory: CategoryForm) => addCategory(newCategory),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
      toast.success("دسته‌بندی با موفقیت اضافه شد.");
      setOpen(false);
    },
    onError: (err: any) => {
      toast.error(`خطا در افزودن دسته‌بندی: ${err.message || "خطای نامشخص"}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (payload: { newCategory: CategoryForm; id: number }) =>
      updateCategory(payload.newCategory, payload.id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
      toast.success("دسته‌بندی با موفقیت ویرایش شد.");
      setOpen(false);
    },
    onError: (err: any) => {
      toast.error(`خطا در ویرایش دسته‌بندی: ${err.message || "خطای نامشخص"}`);
    },
  });
  const removeMutation = useMutation({
    mutationFn: (id: number) => removeCategory(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
      toast.success("دسته‌بندی با موفقیت حذف شد.");
      setOpen(false);
    },
    onError: (err: any) => {
      toast.error(`خطا در حذف دسته‌بندی: ${err.message || "خطای نامشخص"}`);
    },
  });

  const onSubmit = (formData: CategoryForm) => {
    if (editing?.id) {
      updateMutation.mutate({ newCategory: formData, id: editing?.id });
    } else {
      addMutation.mutate(formData);
    }
  };

  return (
    <section className="w-full px-10 flex flex-col mt-6">
      <Button type="primary" className="mb-4 self-end" onClick={handleAdd}>
        افزودن دسته‌بندی
      </Button>

      <BaseTable
        data={data?.data || []}
        columns={getCategoryColumns(handleEdit, handleDelete)}
      />

      <Modal
        key={modalKey}
        open={open}
        onCancel={() => setOpen(false)}
        onOk={handleSubmit(onSubmit)}
        okText="ذخیره"
        cancelText="بستن"
        title={isEdit ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی"}
        width={400}
      >
        <div className="flex flex-col gap-3">
          <div>
            <label>عنوان</label>
            <Controller
              name="title"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input {...field} placeholder="مثلاً: تکنولوژی" />
              )}
            />
            {errors?.title && (
              <p className="text-red-500 text-xs">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label>لینک</label>
            <Controller
              name="href"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input {...field} placeholder="/tech-..." />
              )}
            />
            {errors?.href && (
              <p className="text-red-500 text-xs">{errors.href.message}</p>
            )}
          </div>
        </div>
      </Modal>
    </section>
  );
}
