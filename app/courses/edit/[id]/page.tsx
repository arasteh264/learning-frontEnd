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

export default function EditCoursePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>();

  // 📌 گرفتن دیتای دوره
  const { isLoading } = useQuery({
    queryKey: ["course", id],
    queryFn: () => getCourseDetail(id),
    onSuccess: (data) => {
      reset({
        name: data.name,
        price: data.price,
        discount: data.discount,
        description: data.description,
        support: data.support,
        href: data.href,
        status: data.status,
        category: data.category?._id,
        creator: data.creator?._id,
      });
    },
  });

  // 📌 teachers
  const { data: TeacherData = [] } = useQuery({
    queryKey: ["users"],
    queryFn: getTeacherList,
  });

  // 📌 categories
  const { data: CategoryData = [] } = useQuery({
    queryKey: ["category"],
    queryFn: getCategoryList,
  });

  const optionsTeacher = (TeacherData?.data ?? []).map((i: any) => ({
    value: i.id,
    label: i.name,
  }));

  const optionsCategory = (CategoryData?.data ?? []).map((i: any) => ({
    value: i._id,
    label: i.title,
  }));

  // 📌 update mutation
  const updateMutation = useMutation({
    mutationFn: (formData: FormData) => updateCourseApi(id, formData),
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

    updateMutation.mutate(formData);
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow text-right">

      <div className="flex justify-between mb-6">
        <Button onClick={() => router.back()}>بازگشت</Button>
        <h2 className="text-xl font-bold">ویرایش دوره</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

        {/* name */}
        <Controller
          name="name"
          control={control}
          render={({ field }) => <Input {...field} placeholder="نام دوره" />}
        />

        {/* price */}
        <Controller
          name="price"
          control={control}
          render={({ field }) => <Input {...field} type="number" />}
        />

        {/* status */}
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Switch
              checked={field.value}
              onChange={field.onChange}
            />
          )}
        />

        {/* category */}
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={optionsCategory}
              onChange={field.onChange}
            />
          )}
        />

        {/* creator */}
        <Controller
          name="creator"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={optionsTeacher}
              onChange={field.onChange}
            />
          )}
        />

        {/* cover */}
        <Controller
          name="cover"
          control={control}
          render={({ field }) => (
            <Upload
              maxCount={1}
              beforeUpload={(file) => {
                field.onChange(file);
                return false;
              }}
              fileList={
                field.value && typeof field.value !== "string"
                  ? [
                      {
                        uid: "-1",
                        name: field.value.name,
                        status: "done",
                      } as any,
                    ]
                  : []
              }
            >
              <Button icon={<UploadOutlined />}>
                تغییر تصویر
              </Button>
            </Upload>
          )}
        />

        <Button type="primary" htmlType="submit">
          ویرایش دوره
        </Button>

      </form>
    </div>
  );
}