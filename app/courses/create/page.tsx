"use client";

import { Input, Button, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getTeacherList } from "@/services/teacher";
import { getCategoryList } from "@/services/category";
type CreateCourseForm = {
  name: string;
  price: string;
  discount: number;
  description: string;
  support: string;
  href: string;
  status: boolean;
  category: string;
  creator: string;
  cover: any;
};

export default function CreateCoursePage() {



  const { control, register, handleSubmit } = useForm<CreateCourseForm>();
      const { data:TeacherData = [], isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: getTeacherList,
  });
       const { data:CateoryData = []} = useQuery({
    queryKey: ["category"],
    queryFn: getCategoryList,
  });
  debugger
  const optionsTeacher = (TeacherData?.data ?? []).map((teacher: any) => ({
  value: teacher._id,
  label: teacher.userId.name,
}));
  const optionsCategory = (CateoryData?.data ?? []).map((teacher: any) => ({
  value: teacher._id,
  label: teacher.userId.name,
}));
  const mutation = useMutation({
    mutationFn: async (data: CreateCourseForm) => {
      const res = await fetch("/api/courses", {
        method: "POST",
        body: JSON.stringify(data),
      });
      return res.json();
    },
  });

  const onSubmit = (data: CreateCourseForm) => {
    mutation.mutate(data);
  };
  const router = useRouter();
  return (
    <div className="w-full bg-white p-6 rounded-lg shadow text-right">
      <div className="flex items-center justify-between mb-6">
        <Button type="primary" onClick={() => router.back()} className="!px-4">
          بازگشت
        </Button>
        <h2 className="text-xl font-bold">افزودن دوره</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-4 py-3">
          <div>
            <label className="block mb-1">نام دوره</label>
            <Input {...register("name")} />
          </div>

          <div>
            <label className="block mb-1">قیمت</label>
            <Input {...register("price")} />
          </div>
          <div>
            <label className="block mb-1">وضعیت</label>
            <Input {...register("status")} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 py-3">
          <div>
            <label className="block mb-1">تخفیف</label>
            <Input {...register("discount")} />
          </div>

          <div>
            <label className="block mb-1">پشتیبانی</label>
            <Input {...register("support")} />
          </div>
        </div>

        <div>
          <label className="block mb-1">توضیحات</label>
          <Input.TextArea rows={4} {...register("description")} />
        </div>

        <div>
          <label className="block mb-1">لینک دوره</label>
          <Input {...register("href")} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">دسته بندی</label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => <Select {...field} className="w-full" />}
            />
          </div>

          <div>
            <label className="block mb-1">مدرس</label>
               <Controller
        name="creator"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={optionsTeacher}
            className="w-full"
            placeholder="انتخاب مدرس"
            onChange={(selectedOption) => field.onChange(selectedOption?.value)}
            value={optionsTeacher.find((opt:any) => opt.value === field.value) || null}
          />
        )}
      />
          </div>
        </div>

        {/* ===== آپلود ===== */}
        <div>
          <label className="block mb-1">کاور دوره</label>
          <Controller
            name="cover"
            control={control}
            render={({ field }) => (
              <Upload
                beforeUpload={(file) => {
                  field.onChange(file);
                  return false;
                }}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>آپلود تصویر</Button>
              </Upload>
            )}
          />
        </div>

        {/* ===== دکمه ===== */}
        <Button type="primary" htmlType="submit" loading={mutation.isPending}>
          ثبت دوره
        </Button>
      </form>
    </div>
  );
}
