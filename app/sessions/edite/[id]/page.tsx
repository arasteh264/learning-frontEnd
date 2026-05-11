"use client";

import { useEffect, useState } from "react";
import { Input, Button, Select, Upload, Switch, Modal } from "antd";

import { UploadOutlined } from "@ant-design/icons";

import { useForm, Controller } from "react-hook-form";

import { useMutation, useQuery } from "@tanstack/react-query";

import { useRouter, useParams } from "next/navigation";

import { toast } from "react-toastify";

import {
  getAllCourse,
  getSessionDetail,
  updateSessionApi,
} from "@/services/course";
import FileUploader from "@/components/base/FileUploader";

type EditSessionForm = {
  title: string;
  time: string;
  free: number;
  video: any;
  course: string;
};

export default function EditSessionPage() {
  const router = useRouter();
  const params = useParams();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewVideo, setPreviewVideo] = useState("");

  const sessionId = params.id as string;

  const { control, handleSubmit, reset } = useForm<EditSessionForm>({
    defaultValues: {
      free: 1,
    },
  });

  const { data: courses = [], isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: getAllCourse,
  });

  const courseOptions = courses.map((c: any) => ({
    label: c.name,
    value: c.id,
  }));

  const { data: sessionData } = useQuery({
    queryKey: ["session-detail", sessionId],
    queryFn: () => getSessionDetail(sessionId),
    enabled: !!sessionId,
  });

  useEffect(() => {
    if (!sessionData) return;

    reset({
      title: sessionData.title,
      time: sessionData.time,
      free: sessionData.free,
      course: sessionData.course,
      video: sessionData.video,
    });
  }, [sessionData, reset]);

  const mutation = useMutation({
    mutationFn: async (data: EditSessionForm) => {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("time", data.time);
      formData.append("free", String(data.free));
    formData.append("course", String(data.course));
      if (data.video && typeof data.video !== "string") {
        formData.append("video", data.video?.originFileObj || data.video);
      }

      return updateSessionApi({
        id: sessionId,
        data: formData,
      });
    },

    onSuccess: (res) => {
      toast.success(res?.message || "جلسه با موفقیت ویرایش شد 🎉");

      router.push("/sessions");
    },

    onError: (error: any) => {
      console.log(error);

      toast.error(error?.response?.data?.message || "خطا در ویرایش جلسه");
    },
  });

  const onSubmit = (data: EditSessionForm) => {
    mutation.mutate(data);
  };

  return (
    <div className="w-[70%] bg-white p-6 rounded-lg shadow items-end mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Button type="primary" onClick={() => router.back()}>
          بازگشت
        </Button>

        <h2 className="text-xl font-bold">ویرایش جلسه</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">مدت زمان</label>

            <Controller
              name="time"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
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
    <FileUploader
      value={field.value}
      onChange={field.onChange}
      type="video"
      buttonText="آپلود ویدیو"
    />
  )}
/>
        </div>

        <Button
          type="primary"
          htmlType="submit"
          loading={mutation.isPending}
          size="large"
        >
          ویرایش جلسه
        </Button>
      </form>
      <Modal
  open={previewOpen}
  footer={null}
  onCancel={() => setPreviewOpen(false)}
  centered
  width={800}
>
  {previewVideo && (
    <video
      src={previewVideo}
      controls
      autoPlay
      className="w-full rounded-lg"
    />
  )}
</Modal>
    </div>
  );
}
