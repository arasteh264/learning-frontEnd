// app/(admin)/admin/article/create/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Select, Radio, Button } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";



import { createArticleApi } from "@/src/services/article";
import { getCategoryList } from "@/src/services/category";
import { getTeacherList } from "@/src/services/teacher";
import { useState } from "react";
import { ArticleFormValues, articleSchema } from "@/src/validation/article.schema";
import CoverUpload from "../modules/CoverUpload";
import ArticleEditor from "../modules/ArticleEditor";

export default function CreateArticlePage() {
  const router = useRouter();

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategoryList,
  });

  const { data: teachers } = useQuery({
    queryKey: ["teachers"],
    queryFn: getTeacherList,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: "",
      slug: "",
      summary: "",
      content: "",
      status: "draft",
      category: "",
      author: "",
    },
  });

  const [cover, setCover] = useState<File | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: createArticleApi,
    onSuccess: () => {
      toast.success("مقاله با موفقیت ایجاد شد");
      router.push("/admin/article");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "خطا در ایجاد مقاله");
    },
  });

  const onSubmit = (values: ArticleFormValues) => {
    const formData = new FormData();
    formData.append("title", values.title);
    if (values.slug) formData.append("slug", values.slug);
    if (values.summary) formData.append("summary", values.summary);
    formData.append("content", values.content);
    formData.append("status", values.status);
    formData.append("category", values.category);
    formData.append("author", values.author);

    if (cover) {
      formData.append("cover", cover);
    }

    mutate(formData);
  };

  return (
    <section className="w-full px-10 flex flex-col mt-5 gap-6">
      <h2 className="text-xl font-bold">افزودن مقاله جدید</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">عنوان</label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="عنوان مقاله را وارد کنید" />
              )}
            />
            {errors.title && (
              <span className="text-xs text-red-500">{errors.title.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">اسلاگ (اختیاری)</label>
            <Controller
              name="slug"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="my-article-slug" dir="ltr" />
              )}
            />
            <span className="text-xs text-gray-400">
              در صورت خالی بودن، از روی عنوان ساخته می‌شود
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">خلاصه</label>
          <Controller
            name="summary"
            control={control}
            render={({ field }) => (
              <Input.TextArea {...field} rows={2} placeholder="خلاصه‌ای از مقاله..." />
            )}
          />
          {errors.summary && (
            <span className="text-xs text-red-500">{errors.summary.message}</span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">دسته‌بندی</label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="انتخاب دسته‌بندی"
                  options={(categories || []).map((c: any) => ({
                    label: c.title,
                    value: c.id,
                  }))}
                />
              )}
            />
            {errors.category && (
              <span className="text-xs text-red-500">{errors.category.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">نویسنده</label>
            <Controller
              name="author"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="انتخاب نویسنده"
                  options={(teachers || []).map((t: any) => ({
                    label: t.bio,
                    value: t.id,
                  }))}
                />
              )}
            />
            {errors.author && (
              <span className="text-xs text-red-500">{errors.author.message}</span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">کاور مقاله</label>
          <CoverUpload value={cover} onChange={setCover} />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">محتوای مقاله</label>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <ArticleEditor value={field.value} onChange={field.onChange} />
            )}
          />
          {errors.content && (
            <span className="text-xs text-red-500">{errors.content.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">وضعیت</label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Radio.Group {...field}>
                <Radio value="draft">پیش‌نویس</Radio>
                <Radio value="published">منتشر شود</Radio>
              </Radio.Group>
            )}
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button onClick={() => router.back()}>انصراف</Button>
          <Button type="primary" htmlType="submit" loading={isPending}>
            ذخیره مقاله
          </Button>
        </div>
      </form>
    </section>
  );
}