"use client";

import { Input, Button, Select, Upload, Switch } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type CreateSessionForm = {
  title: string;
  time: string;
  free: number; // 0 or 1
  video: any;
  course: string;
};

export default function CreateSessionPage() {
  const { control, register, handleSubmit } = useForm<CreateSessionForm>({
    defaultValues: {
      free: 1, // پیشفرض غیر رایگان
    },
  });

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (data: CreateSessionForm) => {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("time", data.time);
      formData.append("free", String(data.free));
      formData.append("course", data.course);
      formData.append("video", data.video);

      const res = await fetch("/api/sessions", {
        method: "POST",
        body: formData,
      });

      return res.json();
    },
    onSuccess: () => {
      router.push("/sessions");
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
            <Input placeholder="مثلاً 12:30" {...register("time")} />
          </div>
          <div>
            <label className="block mb-1">عنوان جلسه</label>
            <Input {...register("title")} />
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
                {...field}
                className="w-full"
                placeholder="انتخاب دوره"
                options={[
                  { label: "React Next", value: "1" },
                  { label: "Node.js", value: "2" },
                ]}
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
