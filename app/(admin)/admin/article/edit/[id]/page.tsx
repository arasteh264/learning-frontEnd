"use client";

import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  getArticleById,
  updateArticleApi,
} from "@/src/services/article/article";
import { ArticleFormValues } from "@/src/validation/article.schema";
import LoadingPage from "../../../loading";
import ArticleForm from "../../modules/ArticleForm";
import { ApiError } from "@/src/types/globalType";

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : null;

  const { data: article, isLoading } = useQuery({
    queryKey: ["article", id],
    queryFn: () => getArticleById(id as string),
    enabled: !!id,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) =>
      updateArticleApi({ id: id!, data: formData }),
    onSuccess: () => {
      toast.success("مقاله با موفقیت ویرایش شد");
      router.push("/admin/article");
    },
    onError: (err: ApiError) => {
      toast.error(err.response?.data?.message || "خطا در ویرایش مقاله");
    },
  });

  const handleSubmit = (values: ArticleFormValues, cover: File | null) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("slug", values.slug || "");
    formData.append("summary", values.summary || "");
    formData.append("content", values.content);
    formData.append("status", values.status);
    formData.append("category", values.category);
    formData.append("author", values.author);
    if (cover) formData.append("cover", cover);
    mutate(formData);
  };

  const defaultValues: Partial<ArticleFormValues> | undefined = article
    ? {
        title: article.title,
        slug: article.slug || "",
        summary: article.summary || "",
        content: article.content || "",
        status: article.status,
        category: article.category_id ?? article.categories?.id ?? "",
        author: article.author_id ?? article.teachers?.id ?? "",
      }
    : undefined;

  const existingCoverUrl: string | undefined = article?.cover ?? undefined;

  if (isLoading) return <LoadingPage />;

  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-8" dir="rtl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center">
          <svg
            className="w-5 h-5 text-amber-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </div>
        <div>
          <h1 className="text-lg font-semibold text-gray-900">ویرایش مقاله</h1>
          <p className="text-sm text-gray-400">
            تغییرات را اعمال کنید و ذخیره کنید
          </p>
        </div>
      </div>
      <ArticleForm
        defaultValues={defaultValues}
        existingCoverUrl={existingCoverUrl}
        isPending={isPending}
        onSubmit={handleSubmit}
        onCancel={() => router.back()}
      />
    </section>
  );
}
