"use client";

import { Input, Button, Select, Upload, Switch } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";

import { getCourseDetail, updateCourseApi } from "@/services/course";
import { getTeacherList } from "@/services/teacher";
import { getCategoryList } from "@/services/category";
import { useEffect } from "react";

export default function EditCoursePage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.id as string;

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>();

  const { data, isLoading } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => getCourseDetail(courseId),
  });

  useEffect(() => {
    if (!data) return;

    reset({
      name: data.name,
      price: data.price,
      discount: data.discount,
      description: data.description,
      support: data.support,
      href: data.href,
      status: data.status,
      category: data.categoryId,
      creator: data.creatorId,
      cover: data.cover,
    });
  }, [data, reset]);

  const { data: TeacherData = [] } = useQuery({
    queryKey: ["users"],
    queryFn: getTeacherList,
  });

  const { data: CategoryData = [] } = useQuery({
    queryKey: ["category"],
    queryFn: getCategoryList,
  });

  const optionsTeacher = (TeacherData ?? []).map((i: any) => ({
    value: i.id,
    label: i.name,
  }));

  const optionsCategory = (CategoryData ?? []).map((i: any) => ({
    value: i._id,
    label: i.title,
  }));

  const updateMutation = useMutation({
    mutationFn: updateCourseApi,
    onSuccess: () => {
      toast.success("دوره با موفقیت ویرایش شد 🎉");
      router.push("/courses");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "خطا در ویرایش");
    },
  });

  const onSubmit = (data: any) => {
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

    if (data.cover instanceof File) {
      formData.append("cover", data.cover);
    }

    updateMutation.mutate({
      id: courseId,
      data: formData,
    });
  };

  return (
    <div className="w-full bg-white  rounded-lg shadow text-right pb-5">
      <div className="flex items-center justify-end  border-b border-gray-400 py-4 ">
        <h2 className="text-xl font-bold px-10">ویرایش دوره</h2>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 px-10">
        <div className="w-full flex gap-5">
          <div className="w-full flex flex-col gap-2 ">
            <span className="font-medium">تخفیف</span>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <Input {...field} type="number" placeholder="تخفیف" />
              )}
            />
          </div>
          <div className="w-full flex flex-col gap-2 ">
            <span className="font-medium">قیمت</span>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <Input {...field} type="number" placeholder="قیمت" />
              )}
            />
          </div>
          <div className="w-full flex flex-col gap-2 ">
            <span className="font-medium">نام دوره</span>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="نام دوره" />
              )}
            />
          </div>
        </div>
        <div className="w-full flex gap-5">
          <div className="w-full flex flex-col gap-2">
            <label className="block mb-1">لینک دوره</label>
            <Controller
              name="href"
              control={control}
              rules={{ required: "لینک دوره الزامی است" }}
              render={({ field }) => <Input {...field} />}
            />
          </div>
          <div className="w-full flex flex-col gap-2 items-end">
            <span className="font-medium">وضعیت</span>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  className="w-1/9 "
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <div className="w-full flex flex-col gap-2">
            <span className="font-medium">دسته‌بندی</span>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={optionsCategory}
                  onChange={field.onChange}
                  placeholder="انتخاب دسته‌بندی"
                />
              )}
            />
          </div>
        </div>

        <div className="w-full flex gap-5">
          <div className="w-full flex flex-col gap-2">
            <span className="font-medium">مدرس</span>
            <Controller
              name="creator"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={optionsTeacher}
                  onChange={field.onChange}
                  placeholder="انتخاب مدرس"
                />
              )}
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <span className="font-medium">پشتیبان</span>
            <Controller
              name="support"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={optionsTeacher}
                  onChange={field.onChange}
                  placeholder="انتخاب پشتیبان"
                />
              )}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-medium">تصویر دوره</span>

          <Controller
            name="cover"
            control={control}
            render={({ field }) => {
              const fileList: any[] = [];

              if (typeof field.value === "string" && field.value) {
                fileList.push({
                  uid: "-1",
                  name: "cover",
                  status: "done",
                  url: field.value,
                });
              }

              if (field.value && typeof field.value !== "string") {
                fileList.push({
                  uid: "-1",
                  name: field.value.name,
                  status: "done",
                  originFileObj: field.value,
                });
              }

              return (
                <Upload
                  listType="picture-card"
                  maxCount={1}
                  beforeUpload={(file) => {
                    field.onChange(file);
                    return false;
                  }}
                  onRemove={() => field.onChange(null)}
                  fileList={fileList}>
                  {fileList.length === 0 && (
                    <Button icon={<UploadOutlined />}>تغییر تصویر</Button>
                  )}
                </Upload>
              );
            }}
          />
        </div>
        <div>
          <label className="block mb-1">توضیحات</label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => <Input.TextArea rows={4} {...field} />}
          />
        </div>
        <div className="flex justify-end gap-3">
          <Button onClick={() => router.back()}>بازگشت</Button>

          <Button type="primary" htmlType="submit">
            ویرایش دوره
          </Button>
        </div>
      </form>
    </div>
  );
}
