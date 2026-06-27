"use client";

import BaseTable from "@/src/components/admin/tables/BaseTable";
import { getCategoryColumns } from "@/src/components/admin/tables/tablesColumns/category.columns";
import { Button, Modal, Input } from "antd";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema } from "@/src/validation/category.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addCategory, getCategoryList, removeCategory, updateCategory, Category } from "@/src/services/category";
import { toast } from "react-toastify";

// ============================================================
// 📦 TYPES
// ============================================================

type CategoryForm = {
  title: string;
  href: string;
};

// ✅ ApiError به جای any توی onError
type ApiError = {
  message: string;
};

// ============================================================
// 🖥️ COMPONENT
// ============================================================

export default function CategoryPage() {
  const queryClient = useQueryClient();

  // ✅ useQuery با type مشخص
  const { data, isLoading } = useQuery<Category[]>({
    queryKey: ["categories"],   // ✅ "category" → "categories" (با سرویس هماهنگ)
    queryFn: getCategoryList,
  });

  const [open, setOpen] = useState(false);
  // ✅ editing: any  →  Category | null
  const [editing, setEditing] = useState<Category | null>(null);
  const isEdit = !!editing?.id;

  const { handleSubmit, reset, trigger, control, formState: { errors } } =
    useForm<CategoryForm>({
      resolver: zodResolver(categorySchema),
      defaultValues: { title: "", href: "" },
      mode: "onSubmit",
    });

  const modalKey = useMemo(
    () => (isEdit ? `edit-${editing?.id ?? "x"}` : "add"),
    [isEdit, editing?.id]
  );

  // ============================================================
  // 🎯 HANDLERS
  // ============================================================

  const handleAdd = () => {
    setEditing(null);
    reset({ title: "", href: "" });
    setOpen(true);
  };

  const handleEdit = (record: Category) => {
    setEditing(record);
    reset({ title: record.title, href: record.href });
    trigger(["title", "href"]);
    setOpen(true);
  };

  const handleDelete = (record: Category) => {
    removeMutation.mutate(record.id);
  };

  const cancelModal = () => {
    setOpen(false);
    setEditing(null);
  };


  const addMutation = useMutation({
    mutationFn: (newCategory: CategoryForm) => addCategory(newCategory),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("دسته‌بندی با موفقیت اضافه شد");
      setOpen(false);
      reset({ title: "", href: "" });
    },
    onError: (err: ApiError) => {
      toast.error(`خطا در افزودن: ${err.message || "خطای نامشخص"}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: CategoryForm }) =>
      updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("دسته‌بندی با موفقیت ویرایش شد");
      setOpen(false);
      setEditing(null);
    },
    onError: (err: ApiError) => {
      toast.error(`خطا در ویرایش: ${err.message || "خطای نامشخص"}`);
    },
  });

  const removeMutation = useMutation({
    mutationFn: (id: number) => removeCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("دسته‌بندی با موفقیت حذف شد");
    },
    onError: (err: ApiError) => {
      toast.error(`خطا در حذف: ${err.message || "خطای نامشخص"}`);
    },
  });

  const onSubmit = (formData: CategoryForm) => {
    if (isEdit && editing) {
      updateMutation.mutate({ id: editing.id, data: formData });
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
        data={data ?? []}
        loading={isLoading}
        columns={getCategoryColumns(handleEdit, handleDelete)}
      />

      <Modal
        key={modalKey}
        open={open}
        onCancel={cancelModal}
        onOk={handleSubmit(onSubmit)}
        okText="ذخیره"
        cancelText="بستن"
        title={isEdit ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی"}
        width={400}
      >
        <div className="flex flex-col gap-3">
          <div>
            <label>عنوان</label>
            <Controller name="title" control={control}
              render={({ field }) => (
                <Input {...field} placeholder="مثلاً: تکنولوژی" />
              )} />
            {errors.title && (
              <p className="text-red-500 text-xs">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label>لینک</label>
            <Controller name="href" control={control}
              render={({ field }) => (
                <Input {...field} placeholder="/tech-..." />
              )} />
            {errors.href && (
              <p className="text-red-500 text-xs">{errors.href.message}</p>
            )}
          </div>
        </div>
      </Modal>
    </section>
  );
}