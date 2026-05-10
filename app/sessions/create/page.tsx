"use client";

import { Input, Button, Select, Upload, Switch } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createSessionApi, getAllCourse } from "@/services/course";
import { toast } from "react-toastify";

type CreateSessionForm = {
  title: string;
  time: string;
  free: number; // 0 or 1
  video: any;
  course: string;
};

export default function CreateSessionPage() {
  const { data: courses = [], isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: getAllCourse,
  });

  const courseOptions = courses.map((c: any) => ({
    label: c.name,
    value: c.id,
  }));
  const { control, register, handleSubmit } = useForm<CreateSessionForm>({
    defaultValues: {
      free: 1,
    },
  });

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (data: CreateSessionForm) => {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("time", data.time);
      formData.append("free", String(data.free));

      formData.append("video", data.video?.originFileObj || data.video);

      return createSessionApi({
        id: data.course,
        data: formData,
      });
    },

    onSuccess: (res) => {
      toast.success(res?.message || "جلسه با موفقیت ایجاد شد 🎉");

      router.push("/sessions");
    },

    onError: (error: any) => {
      console.log(error);

      const message = error?.response?.data?.message || "خطا در ایجاد جلسه";

      toast.error(message);
    },
  });

  const onSubmit = (data: CreateSessionForm) => {
    mutation.mutate(data);
  };

  return (
    <div className="w-[70%] bg-white p-6 rounded-lg shadow items-end mx-auto ">
      <div className="flex items-center justify-between mb-6">
        <Button type="primary" onClick={() => router.back()}>
          بازگشت
        </Button>

        <h2 className="text-xl font-bold">افزودن جلسه</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">مدت زمان</label>
            <Controller
              name="time"
              control={control}
              render={({ field }) => <Input {...field} />}
            />{" "}
          </div>
          <div>
            <label className="block mb-1">عنوان جلسه</label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span>رایگان باشد؟</span>

          <Controller
            name="free"
            control={control}
            render={({ field }) => (
              <Switch
                checked={field.value === 0}
                onChange={(checked) => {
                  field.onChange(checked ? 0 : 1);
                }}
              />
            )}
          />
        </div>

        <div>
          <label className="block mb-1">انتخاب دوره</label>

          <Controller
            name="course"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onChange={field.onChange}
                className="w-full"
                placeholder="انتخاب دوره"
                options={courseOptions}
                loading={isLoading}
              />
            )}
          />
        </div>

        <div>
          <label className="block mb-1">ویدیو جلسه</label>

          <Controller
            name="video"
            control={control}
            render={({ field }) => (
              <Upload
                beforeUpload={(file) => {
                  field.onChange(file);
                  return false;
                }}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>آپلود ویدیو</Button>
              </Upload>
            )}
          />
        </div>

        <Button
          type="primary"
          htmlType="submit"
          loading={mutation.isPending}
          size="large"
        >
          ثبت جلسه
        </Button>
      </form>
    </div>
  );
}
