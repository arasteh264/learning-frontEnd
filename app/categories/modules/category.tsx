"use client";

import BaseTable from "@/components/tables/BaseTable";
import { getCategoryColumns } from "@/components/tables/tablesColumns/category.columns";
import { Button, Modal, Input } from "antd";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema } from "@/validation/category.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addCategory, getCategoryList } from "@/services/category";
import { toast } from "react-toastify";

type CategoryForm = {
  title: string;
  href: string;
};

export default function Category() {
    const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["category"],
    queryFn: getCategoryList,
  });


  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const isEdit = !!editing?.id;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue, // Import setValue
  } = useForm<CategoryForm>({
    resolver: zodResolver(categorySchema),
  });

  const handleAdd = () => {
    
    setEditing(null);
    // reset({ title: "", href: "" });
    setOpen(true);
  };

  const handleEdit = (record: any) => {
    setEditing(record);
    reset(record);
    setOpen(true);
  };


  const handleDelete = (id: number) => {
    // setData((prev) => prev.filter((c) => c.id !== id));
  };


    const addMutation = useMutation({
    mutationFn: (newCategory: CategoryForm) => addCategory(newCategory),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category"] });
      toast.success("دسته‌بندی با موفقیت اضافه شد."); 
      setOpen(false);
    },
    onError: (err: any) => {
      toast.error(`خطا در افزودن دسته‌بندی: ${err.message || 'خطای نامشخص'}`);
    },
  });


  const onSubmit = (formData: CategoryForm) => {

    if (isEdit && editing?.id) {
      // updateMutation.mutate({ id: editing.id, data: formData });
    } else {
      debugger
      addMutation.mutate(formData);
    }
  };

  return (
    <section className="w-full px-10 flex flex-col">

      <Button
        type="primary"
        className="mb-4 self-end"
        onClick={handleAdd}
      >
        افزودن دسته‌بندی
      </Button>

      <BaseTable
        data={data?.data || []}
        columns={getCategoryColumns(handleEdit, handleDelete)}
      />

      <Modal
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
            <Input {...register("title")} />
            {errors.title && (
              <p className="text-red-500 text-xs">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label>لینک</label>
            <Input {...register("href")} />
            {errors.href && (
              <p className="text-red-500 text-xs">
                {errors.href.message}
              </p>
            )}
          </div>

        </div>
      </Modal>

    </section>
  );
}