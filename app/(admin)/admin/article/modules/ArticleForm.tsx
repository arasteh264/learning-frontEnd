"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, Button } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { ArticleFormValues, articleSchema } from "@/src/validation/article.schema";
import { getCategoryList } from "@/src/services/category";
import { getTeacherList } from "@/src/services/teacher";
import CoverUpload from "./CoverUpload";
import ArticleEditor from "./ArticleEditor";


export interface ArticleFormProps {
  defaultValues?: Partial<ArticleFormValues> | undefined;
  isPending: boolean;
  onSubmit: (values: ArticleFormValues, cover: File | null) => void;
  existingCoverUrl?: string | undefined;
  onCancel: () => void;
}


function SectionCard({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-3 bg-gray-50 border-b border-gray-100">
        <span className="text-indigo-500 text-sm">{icon}</span>
        <span className="text-xs font-semibold text-gray-400 tracking-widest uppercase">
          {label}
        </span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function Field({
  label,
  required,
  hint,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-400 mr-0.5">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-gray-400">{hint}</p>}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

function StatusCard({
  value,
  current,
  onChange,
  icon,
  title,
  description,
}: {
  value: "draft" | "published";
  current: string;
  onChange: (v: string) => void;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  const isActive = current === value;
  const isDraft = value === "draft";

  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={[
        "flex-1 flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-right transition-all duration-150",
        isActive
          ? isDraft
            ? "border-gray-400 bg-gray-50"
            : "border-emerald-500 bg-emerald-50"
          : "border-gray-100 bg-white hover:border-gray-300",
      ].join(" ")}
    >
      <div
        className={[
          "w-9 h-9 rounded-lg flex items-center justify-center text-lg shrink-0",
          isActive
            ? isDraft
              ? "bg-gray-200 text-gray-600"
              : "bg-emerald-100 text-emerald-600"
            : "bg-gray-100 text-gray-400",
        ].join(" ")}
      >
        {icon}
      </div>
      <div className="flex-1">
        <p
          className={[
            "text-sm font-semibold",
            isActive
              ? isDraft
                ? "text-gray-700"
                : "text-emerald-700"
              : "text-gray-500",
          ].join(" ")}
        >
          {title}
        </p>
        <p className="text-xs text-gray-400">{description}</p>
      </div>
      <div
        className={[
          "w-4 h-4 rounded-full border-2 shrink-0 transition-all",
          isActive
            ? isDraft
              ? "border-gray-500 bg-gray-500"
              : "border-emerald-500 bg-emerald-500"
            : "border-gray-300 bg-white",
        ].join(" ")}
      />
    </button>
  );
}


export default function ArticleForm({
  defaultValues,
  existingCoverUrl,
  isPending,
  onSubmit,
  onCancel,
}: ArticleFormProps) {
  const [cover, setCover] = useState<File | null>(null);

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
    reset,
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

  useEffect(() => {
    if (defaultValues) {
      reset({ ...defaultValues });
    }
  }, [defaultValues, reset]);

  const inputBase =
    "w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-800 placeholder:text-gray-300 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100";

  const inputError =
    "w-full px-3 py-2 text-sm rounded-lg border border-red-300 bg-white text-gray-800 placeholder:text-gray-300 outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100";

  return (
    <form
      onSubmit={handleSubmit((values) => onSubmit(values, cover))}
      className="flex flex-col gap-4"
    >
      <SectionCard
        icon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        }
        label="اطلاعات پایه"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Field label="عنوان" required error={errors.title?.message}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="عنوان مقاله را وارد کنید"
                  className={errors.title ? inputError : inputBase}
                />
              )}
            />
          </Field>

          <Field label="اسلاگ" hint="در صورت خالی بودن، از روی عنوان ساخته می‌شود">
            <Controller
              name="slug"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="my-article-slug"
                  dir="ltr"
                  className={inputBase}
                />
              )}
            />
          </Field>
        </div>

        <Field label="خلاصه" error={errors.summary?.message}>
          <Controller
            name="summary"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                rows={2}
                placeholder="خلاصه‌ای کوتاه از مقاله..."
                className={`${errors.summary ? inputError : inputBase} resize-none leading-relaxed`}
              />
            )}
          />
        </Field>
      </SectionCard>

      <SectionCard
        icon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        }
        label="دسته‌بندی و نویسنده"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="دسته‌بندی" required error={errors.category?.message}>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="انتخاب دسته‌بندی"
                  className="w-full"
                  options={(categories || []).map((c: any) => ({
                    label: c.title,
                    value: c.id,
                  }))}
                />
              )}
            />
          </Field>

          <Field label="نویسنده" required error={errors.author?.message}>
            <Controller
              name="author"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="انتخاب نویسنده"
                  className="w-full"
                  options={(teachers || []).map((t: any) => ({
                    label: t.bio,
                    value: t.id,
                  }))}
                />
              )}
            />
          </Field>
        </div>
      </SectionCard>

      <SectionCard
        icon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        }
        label="تصویر کاور"
      >
        <CoverUpload value={cover} onChange={setCover} existingUrl={existingCoverUrl} />
      </SectionCard>

      <SectionCard
        icon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        }
        label="محتوای مقاله"
      >
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <ArticleEditor value={field.value} onChange={field.onChange} />
          )}
        />
        {errors.content && (
          <p className="text-xs text-red-500 mt-1">{errors.content.message}</p>
        )}
      </SectionCard>

      <SectionCard
        icon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
          </svg>
        }
        label="وضعیت انتشار"
      >
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <div className="flex gap-3">
              <StatusCard
                value="draft"
                current={field.value}
                onChange={field.onChange}
                icon="✏️"
                title="پیش‌نویس"
                description="ذخیره بدون انتشار"
              />
              <StatusCard
                value="published"
                current={field.value}
                onChange={field.onChange}
                icon="🌐"
                title="منتشر شود"
                description="قابل مشاهده برای همه"
              />
            </div>
          )}
        />
      </SectionCard>

      <div className="flex justify-start gap-3 pt-1 pb-6">
        <Button
          type="primary"
          htmlType="submit"
          loading={isPending}
          style={{ background: "#4f46e5", borderColor: "#4f46e5", fontWeight: 500 }}
        >
          ذخیره مقاله
        </Button>
        <Button onClick={onCancel}>انصراف</Button>
      </div>
    </form>
  );
}