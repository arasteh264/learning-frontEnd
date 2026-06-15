// app/(admin)/admin/article/edit/[id]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Select, Radio, Button } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import {
  articleSchema,
  ArticleFormValues,
} from "@/src/validation/article.schema";

import { getArticleById, updateArticleApi } from "@/src/services/article";
import { getCategoryList } from "@/src/services/category";
import { getTeacherList } from "@/src/services/teacher";

import CoverUpload from "../../modules/CoverUpload";
import ArticleEditor from "../../modules/ArticleEditor";

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();

  const articleId = params.id as string;

  const [cover, setCover] = useState<File | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema),
  });

  const { data: article, isLoading } = useQuery({
    queryKey: ["article", articleId],
    queryFn: () => getArticleById(articleId),
    enabled: !!articleId,
  });

  // categories
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategoryList,
  });

  // teachers
  const { data: teachers } = useQuery({
    queryKey: ["teachers"],
    queryFn: getTeacherList,
  });

  useEffect(() => {
    if (article) {
      reset({
        title: article.title,
        slug: article.slug || "",
        summary: article.summary || "",
        content: article.content || "",
        status: article.status,
        category: article.category?.id,
        author: article.author?.id,
      });
    }
  }, [article, reset]);

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) => updateArticleApi(articleId, formData),

    onSuccess: () => {
      toast.success("مقاله با موفقیت ویرایش شد");
      router.push("/admin/article");
    },

    onError: (err: any) => {
      toast.error(err.response?.data?.message || "خطا در ویرایش مقاله");
    },
  });

  const onSubmit = (values: ArticleFormValues) => {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("slug", values.slug || "");
    formData.append("summary", values.summary || "");
    formData.append("content", values.content);
    formData.append("status", values.status);
    formData.append("category", values.category);
    formData.append("author", values.author);

    if (cover) {
      formData.append("cover", cover);
    }

    mutate(formData);
  };

  if (isLoading) return <div>در حال دریافت اطلاعات...</div>;

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
              <span className="text-xs text-red-500">
                {errors.title.message}
              </span>
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
              <Input.TextArea
                {...field}
                rows={2}
                placeholder="خلاصه‌ای از مقاله..."
              />
            )}
          />
          {errors.summary && (
            <span className="text-xs text-red-500">
              {errors.summary.message}
            </span>
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
              <span className="text-xs text-red-500">
                {errors.category.message}
              </span>
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
              <span className="text-xs text-red-500">
                {errors.author.message}
              </span>
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
            <span className="text-xs text-red-500">
              {errors.content.message}
            </span>
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
