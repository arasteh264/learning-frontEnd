"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createArticleApi } from "@/src/services/article";
import { ArticleFormValues } from "@/src/validation/article.schema";
import ArticleForm from "../modules/ArticleForm";
import { ApiError } from "@/src/types/globalType";

export default function CreateArticlePage() {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: createArticleApi,
    onSuccess: () => {
      toast.success("مقاله با موفقیت ایجاد شد");
      router.push("/admin/article");
    },
    onError: (err: ApiError) => {
      toast.error(err.response?.data?.message || "خطا در ایجاد مقاله");
    },
  });

  const handleSubmit = (values: ArticleFormValues, cover: File | null) => {
    const formData = new FormData();
    formData.append("title", values.title);
    if (values.slug) formData.append("slug", values.slug);
    if (values.summary) formData.append("summary", values.summary);
    formData.append("content", values.content);
    formData.append("status", values.status);
    formData.append("category", values.category);
    formData.append("author", values.author);
    if (cover) formData.append("cover", cover);
    mutate(formData);
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-8" dir="rtl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
          <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m-4-4h8M4 6h16" />
          </svg>
        </div>
        <div>
          <h1 className="text-lg font-semibold text-gray-900">افزودن مقاله جدید</h1>
          <p className="text-sm text-gray-400">اطلاعات مقاله را تکمیل کنید و ذخیره کنید</p>
        </div>
      </div>
      <ArticleForm isPending={isPending} onSubmit={handleSubmit} onCancel={() => router.back()} />
    </section>
  );
}