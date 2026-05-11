"use client";

import { Input, Button, Select, Upload, Switch } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getTeacherList } from "@/services/teacher";
import { getCategoryList } from "@/services/category";
import { createCourseApi, CreateCourseForm } from "@/services/course";
import { toast } from "react-toastify";
import { PriceInput } from "@/components/base/PriceInput";
import FileUploader from "@/components/base/FileUploader";

export default function CreateCoursePage() {
  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCourseForm>({
    defaultValues: {
      status: false,
      discount: 0,
    },
  });

  const {
    data: TeacherData = [],
    isLoading: teacherLoading,
    error: teacherError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getTeacherList,
  });

  const {
    data: CategoryData = [],
    isLoading: categoryLoading,
    error: categoryError,
  } = useQuery({
    queryKey: ["category"],
    queryFn: getCategoryList,
  });

  const optionsTeacher =
    (TeacherData ?? []).map((item: any) => ({
      value: item.id,
      label: item.name,
    })) ?? [];

  const optionsCategory =
    (CategoryData ?? []).map((item: any) => ({
      value: item.id,
      label: item.title,
    })) ?? [];
  const addMutation = useMutation({
    mutationFn: createCourseApi,

    onSuccess: (data) => {
      toast.success("دوره با موفقیت ثبت شد 🎉");
      router.push("/courses");
    },

    onError: (error: any) => {
      console.log(error);
      toast.error(error?.response?.data?.message || "خطا در ثبت دوره");
    },
  });
  const onSubmit = (data: CreateCourseForm) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("discount", String(data.discount || 0));
    formData.append("description", data.description || "");
    formData.append("support", data.support || "");
    formData.append("href", data.href || "");
    formData.append("status", String(data.status));
    formData.append("category", data.category);
    formData.append("creator", data.creator);

    if (data.cover) {
      formData.append("cover", data.cover);
    }

    addMutation.mutate(formData);
  };

  return (
    <div className="w-full bg-white  rounded-lg shadow text-right pb-5">
      <div className="flex items-center justify-end  border-b border-gray-400 py-4 ">
        <h2 className="text-xl font-bold px-10">افزودن دوره</h2>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 px-10"
      >
        <div className="grid grid-cols-3 gap-4 py-3">
          <div>
            <label className="block mb-1">نام دوره</label>
            <Controller
              name="name"
              control={control}
              rules={{ required: "نام دوره الزامی است" }}
              render={({ field }) => <Input {...field} />}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col items-end">
            <label className="block mb-2">وضعیت</label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <div className="flex items-center gap-2">
                  <Switch
                    checked={field.value}
                    onChange={(checked) => field.onChange(checked)}
                  />
                </div>
              )}
            />
          </div>

          <div>
            <label className="block mb-1">قیمت</label>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <PriceInput
                  value={field.value || ""}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 py-3">
          <div>
            <label className="block mb-1">تخفیف (%)</label>
            <Input
              type="number"
              {...register("discount", {
                valueAsNumber: true,
                min: { value: 0, message: "تخفیف نمی‌تواند منفی باشد" },
                max: { value: 100, message: "حداکثر تخفیف 100٪ است" },
              })}
            />
            {errors.discount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.discount.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1">پشتیبانی</label>
            <Controller
              name="support"
              control={control}
              rules={{ required: "انتخاب پشتیبان الزامی است" }}
              render={({ field }) => (
                <Select
                  options={optionsTeacher}
                  className="w-full"
                  placeholder={
                    teacherLoading ? "در حال بارگذاری..." : "انتخاب پشتیبان"
                  }
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  loading={teacherLoading}
                  allowClear
                />
              )}
            />
            {errors.support && (
              <p className="text-red-500 text-sm mt-1">
                {errors.support.message as string}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block mb-1">توضیحات</label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input.TextArea
                dir="rtl"
                className="text-right"
                rows={4}
                {...field}
              />
            )}
          />
        </div>

        <div>
          <label className="block mb-1">لینک دوره</label>
          <Controller
            name="href"
            control={control}
            rules={{ required: "لینک دوره الزامی است" }}
            render={({ field }) => <Input {...field} />}
          />
          {errors.href && (
            <p className="text-red-500 text-sm mt-1">{errors.href.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">دسته بندی</label>
            <Controller
              name="category"
              control={control}
              rules={{ required: "دسته‌بندی الزامی است" }}
              render={({ field }) => (
                <Select
                  options={optionsCategory}
                  className="w-full"
                  placeholder={
                    categoryLoading ? "در حال بارگذاری..." : "انتخاب دسته‌بندی"
                  }
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  loading={categoryLoading}
                  allowClear
                />
              )}
            />
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message as string}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1">مدرس</label>
            <Controller
              name="creator"
              control={control}
              rules={{ required: "انتخاب مدرس الزامی است" }}
              render={({ field }) => (
                <Select
                  options={optionsTeacher}
                  className="w-full"
                  placeholder={
                    teacherLoading ? "در حال بارگذاری..." : "انتخاب مدرس"
                  }
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  loading={teacherLoading}
                  allowClear
                />
              )}
            />
            {errors.creator && (
              <p className="text-red-500 text-sm mt-1">
                {errors.creator.message as string}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block mb-1">کاور دوره</label>
          <Controller
            name="cover"
            control={control}
            rules={{ required: "تصویر الزامی است" }}
            render={({ field }) => (
              <FileUploader
                value={field.value}
                onChange={field.onChange}
                type="image"
                buttonText="آپلود تصویر"
              />
            )}
          />
          {errors.cover && (
            <p className="text-red-500 text-sm mt-1">
              {errors.cover.message as string}
            </p>
          )}
        </div>
        <div className="flex justify-end gap-3">
          <Button onClick={() => router.back()} className="!px-4">
            بازگشت
          </Button>
          <Button type="primary" htmlType="submit">
            ثبت دوره
          </Button>
        </div>
      </form>
    </div>
  );
}
