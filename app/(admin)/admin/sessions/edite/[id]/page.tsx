"use client";

import { useEffect, useState } from "react";
import { Input, Button, Select, Switch, Modal } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";
import { PlayCircle } from "lucide-react";
import {
  getAllCourse,
  getSessionDetail,
  updateSessionApi,
} from "@/src/services/course";
import FileUploader from "@/src/components/admin/FileUploader";

type EditSessionForm = {
  title: string;
  time: string;
  free: boolean;
  video: any;
  course: string; // course_id
};

export default function EditSessionPage() {
  const router = useRouter();
  const params = useParams();
  const sessionId = params.id as string;

  const [previewOpen, setPreviewOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>("");

  const { control, handleSubmit, reset, watch } = useForm<EditSessionForm>({
    defaultValues: { free: false },
  });

  const { data: courses = [], isLoading: isCoursesLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: getAllCourse,
  });

  const courseOptions = courses.map((c: any) => ({
    label: c.name,
    value: c.id,
  }));

  const { data: sessionData, isLoading: isSessionLoading } = useQuery({
    queryKey: ["session-detail", sessionId],
    queryFn: () => getSessionDetail(sessionId),
    enabled: !!sessionId,
  });

  useEffect(() => {
    if (!sessionData) return;

    // دیتای واقعی: courses.id برای شناسه دوره
    const courseId = sessionData.courses?.id || sessionData.course_id || "";
    setCurrentVideoUrl(sessionData.video || "");

    reset({
      title: sessionData.title,
      time: sessionData.time,
      free: sessionData.free,
      course: courseId,
      video: sessionData.video, // string URL موقتاً
    });
  }, [sessionData, reset]);

  const videoField = watch("video");

  const mutation = useMutation({
    mutationFn: async (data: EditSessionForm) => {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("time", data.time);
      formData.append("free", data.free ? "1" : "0");
      formData.append("course", data.course);

      // فقط اگه ویدیو جدید آپلود شده (نه URL قدیمی) بفرست
      if (data.video && typeof data.video !== "string") {
        formData.append("video", data.video?.originFileObj || data.video);
      }

      return updateSessionApi({ id: sessionId, data: formData });
    },

    onSuccess: (res) => {
      toast.success(res?.message || "جلسه با موفقیت ویرایش شد");
      router.push("/admin/sessions");
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "خطا در ویرایش جلسه");
    },
  });

  if (isSessionLoading) {
    return (
      <div className="w-[70%] mx-auto mt-10 bg-white rounded-xl p-8 animate-pulse space-y-4">
        <div className="h-6 w-32 bg-gray-100 rounded" />
        <div className="h-10 bg-gray-100 rounded" />
        <div className="h-10 bg-gray-100 rounded" />
      </div>
    );
  }

  return (
    <div className="w-[70%] bg-white p-8 rounded-xl shadow-sm border border-gray-100 mx-auto my-10">
      <div className="flex items-center justify-between mb-8">
        <Button onClick={() => router.back()}>بازگشت</Button>
        <h2 className="text-xl font-bold text-[#1C2B27]">ویرایش جلسه</h2>
      </div>

      <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="flex flex-col gap-5">

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600 font-medium">مدت زمان</label>
            <Controller
              name="time"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="مثلاً ۲۰:۰۰" />
              )}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600 font-medium">عنوان جلسه</label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="عنوان جلسه" />
              )}
            />
          </div>
        </div>

        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg">
          <span className="text-sm text-gray-600 font-medium">رایگان باشد؟</span>
          <Controller
            name="free"
            control={control}
            render={({ field }) => (
              <Switch
                checked={field.value === true || (field.value as any) === 1}
                onChange={(checked) => field.onChange(checked)}
                checkedChildren="بله"
                unCheckedChildren="خیر"
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600 font-medium">انتخاب دوره</label>
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
                loading={isCoursesLoading}
              />
            )}
          />
        </div>

        {/* ویدیو فعلی */}
        {currentVideoUrl && (
          <div className="flex items-center justify-between bg-[#fafafa] border border-gray-100 rounded-lg px-4 py-3">
            <button
              type="button"
              onClick={() => setPreviewOpen(true)}
              className="flex items-center gap-2 text-xs text-[#1EB35B] hover:text-[#17914a] font-medium transition-colors"
            >
              <PlayCircle className="size-4" />
              پیش‌نمایش ویدیو فعلی
            </button>
            <span className="text-xs text-gray-400">ویدیو جلسه</span>
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600 font-medium">
            {currentVideoUrl ? "جایگزینی ویدیو (اختیاری)" : "ویدیو جلسه"}
          </label>
          <Controller
            name="video"
            control={control}
            render={({ field }) => (
              <FileUploader
                value={typeof field.value !== "string" ? field.value : undefined}
                onChange={field.onChange}
                type="video"
                buttonText="آپلود ویدیو جدید"
              />
            )}
          />
        </div>

        <Button
          type="primary"
          htmlType="submit"
          loading={mutation.isPending}
          size="large"
          className="!bg-[#1EB35B] !border-[#1EB35B] hover:!bg-[#17914a] w-full"
        >
          ذخیره تغییرات
        </Button>
      </form>

      <Modal
        open={previewOpen}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
        centered
        width={800}
        title="پیش‌نمایش ویدیو"
      >
        {currentVideoUrl && (
          <video
            src={currentVideoUrl}
            controls
            autoPlay
            className="w-full rounded-lg"
            controlsList="nodownload"
          />
        )}
      </Modal>
    </div>
  );
}