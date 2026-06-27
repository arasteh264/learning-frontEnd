"use client";

import { Input, Button, Select, Switch } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect } from "react";

import { getCourseDetail, updateCourseApi, Course, UpdateCoursePayload } from "@/src/services/course";
import { getTeacherList, Teacher } from "@/src/services/teacher";
import { getCategoryList, Category } from "@/src/services/category";
import { PriceInput } from "@/src/components/base/PriceInput";
import FileUploader from "@/src/components/admin/FileUploader";


type EditCourseForm = {
  name: string;
  price: number;
  discount: number;
  description: string;
  support: string;
  creator: string;
  href: string;
  status: boolean ;
  category: string;
  cover: File | string | null;
};

type ApiError = {
  response?: { data?: { message?: string } };
  message: string;
};



export default function EditCoursePage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.id as string;

  const { control, handleSubmit, reset, formState: { errors } } =
    useForm<EditCourseForm>();

  const { data } = useQuery<Course>({
    queryKey: ["course", courseId],
    queryFn: () => getCourseDetail(courseId),
  });

  const { data: teacherData = [] } = useQuery<Teacher[]>({
    queryKey: ["teachers"],
    queryFn: getTeacherList,
  });

  const { data: categoryData = [] } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategoryList,
  });

  const optionsTeacher = teacherData.map((t: Teacher) => ({
    value: t.id,
    label: t.name,
  }));

  const optionsCategory = categoryData.map((c: Category) => ({
    value: c.id,
    label: c.title,
  }));

useEffect(() => {
  if (!data) return;
  reset({
    name: data.name,
    price: Number(data.price),  
    discount: data.discount,
    description: data.description,
    support: data.support,
    href: data.href,
    status:  data.status === true,
    category: data.category_id,
    creator: data.creator_id,
    cover: data.cover,
  });
}, [data, reset]);

  const updateMutation = useMutation<Course, ApiError, UpdateCoursePayload>({
    mutationFn: updateCourseApi,
    onSuccess: () => {
      toast.success("دوره با موفقیت ویرایش شد 🎉");
      router.push("/admin/courses");
    },
    onError: (err: ApiError) => {
      toast.error(err?.response?.data?.message || "خطا در ویرایش");
    },
  });

  const onSubmit = (formData: EditCourseForm) => {
    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("price", String(Number(formData.price)));
    fd.append("discount", String(Number(formData.discount || 0)));
    fd.append("description", formData.description || "");
    // ✅ باگ: دو تا Controller با name="support" داشتی!
    // support = پشتیبان، creator = مدرس — جدا شدن
    fd.append("support", formData.support || "");
    fd.append("href", formData.href || "");
    fd.append("status", String(formData.status === true));
    fd.append("category", formData.category);
    fd.append("creator", formData.creator);
    if (formData.cover instanceof File) {
      fd.append("cover", formData.cover);
    }
    updateMutation.mutate({ id: courseId, data: fd });
  };

  return (
    <div className="w-full bg-white rounded-lg shadow text-right pb-5">
      <div className="flex items-center justify-end border-b border-gray-400 py-4">
        <h2 className="text-xl font-bold px-10">ویرایش دوره</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 px-10" dir="rtl">
        <div className="w-full flex gap-5 py-3">
          <div className="w-full flex flex-col gap-2">
            <span className="font-medium">تخفیف</span>
            <Controller name="discount" control={control}
              render={({ field }) => <Input {...field} type="number" placeholder="تخفیف" />} />
          </div>
          <div className="w-full flex flex-col gap-2">
            <span className="font-medium">قیمت</span>
            <Controller name="price" control={control}
              render={({ field }) => (
                <PriceInput value={field.value || ""} onChange={field.onChange} />
              )} />
          </div>
          <div className="w-full flex flex-col gap-2">
            <span className="font-medium">نام دوره</span>
            <Controller name="name" control={control}
              render={({ field }) => <Input {...field} placeholder="نام دوره" />} />
          </div>
        </div>

        <div className="w-full flex gap-5">
          <div className="w-full flex flex-col gap-2">
            <label className="block mb-1">لینک دوره</label>
            <Controller name="href" control={control}
              rules={{ required: "لینک دوره الزامی است" }}
              render={({ field }) => <Input {...field} />} />
            {errors.href && <p className="text-red-500 text-xs">{errors.href.message}</p>}
          </div>

          <div className="w-full flex flex-col gap-2 items-end">
            <span className="font-medium">وضعیت</span>
            <Controller name="status" control={control}
              render={({ field }) => (
                <Switch checked={field.value} onChange={field.onChange} />
              )} />
          </div>

          <div className="w-full flex flex-col gap-2">
            <span className="font-medium">دسته‌بندی</span>
            <Controller name="category" control={control}
              render={({ field }) => (
                <Select {...field} options={optionsCategory} placeholder="انتخاب دسته‌بندی" />
              )} />
          </div>
        </div>

        <div className="w-full flex gap-5">
          {/* ✅ باگ برطرف شد: مدرس = creator، پشتیبان = support */}
          <div className="w-full flex flex-col gap-2">
            <span className="font-medium">مدرس</span>
            <Controller name="creator" control={control}
              render={({ field }) => (
                <Select {...field} options={optionsTeacher} placeholder="انتخاب مدرس" />
              )} />
          </div>
          <div className="w-full flex flex-col gap-2">
            <span className="font-medium">پشتیبان</span>
            <Controller name="support" control={control}
              render={({ field }) => (
                <Select {...field} options={optionsTeacher} placeholder="انتخاب پشتیبان" />
              )} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-medium">تصویر دوره</span>
          <Controller name="cover" control={control}
            render={({ field }) => (
              <FileUploader value={field.value} onChange={field.onChange}
                type="image" buttonText="تغییر تصویر" />
            )} />
        </div>

        <div>
          <label className="block mb-1">توضیحات</label>
          <Controller name="description" control={control}
            render={({ field }) => (
              <Input.TextArea rows={4} dir="rtl" className="text-right" {...field} />
            )} />
        </div>

        <div className="flex justify-end gap-3">
          <Button onClick={() => router.back()}>بازگشت</Button>
          <Button type="primary" htmlType="submit" loading={updateMutation.isPending}>
            ویرایش دوره
          </Button>
        </div>
      </form>
    </div>
  );
}