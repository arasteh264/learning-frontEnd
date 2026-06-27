"use client";

import { Input, Button, Select, Switch } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createSessionApi, getAllCourse, Course, Session } from "@/src/services/course";
import { toast } from "react-toastify";
import FileUploader from "@/src/components/admin/FileUploader";
import { ApiError } from "@/src/types/globalType";




type CreateSessionForm = {
  title: string;
  time: string;
  free: boolean;
  video: File | null;
  course: string;
};


export default function CreateSessionPage() {
  const router = useRouter();

  const { data: courses = [], isLoading } = useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: getAllCourse,
  });

  const courseOptions = courses.map((c: Course) => ({
    label: c.name,
    value: c.id,
  }));

  const { control, handleSubmit } = useForm<CreateSessionForm>({
    defaultValues: { free: false },
  });

  const mutation = useMutation<Session, ApiError, CreateSessionForm>({
    mutationFn: async (data: CreateSessionForm) => {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("time", data.time);
      formData.append("free", data.free ? "1" : "0");
      if (data.video) formData.append("video", data.video);
      return createSessionApi({ id: data.course, data: formData });
    },
    onSuccess: () => {
      toast.success("جلسه با موفقیت ایجاد شد 🎉");
      router.push("/admin/sessions");
    },
    onError: (error: ApiError) => {
      toast.error(error?.response?.data?.message || "خطا در ایجاد جلسه");
    },
  });

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg my-10">
      <div className="flex items-center justify-between mb-8">
        <Button onClick={() => router.back()}>بازگشت</Button>
        <h2 className="text-2xl font-semibold text-gray-700">افزودن جلسه</h2>
      </div>

      <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="flex flex-col gap-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-gray-600 font-medium">مدت زمان</label>
            <Controller name="time" control={control}
              render={({ field }) => <Input {...field} placeholder="مثلاً ۲ ساعت" />} />
          </div>
          <div>
            <label className="block mb-2 text-gray-600 font-medium">عنوان جلسه</label>
            <Controller name="title" control={control}
              render={({ field }) => <Input {...field} placeholder="عنوان جلسه" />} />
          </div>
        </div>

        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg">
          <span className="text-gray-700 font-medium">رایگان باشد؟</span>
          <Controller name="free" control={control}
            render={({ field }) => (
              <Switch checked={field.value} onChange={field.onChange}
                checkedChildren="بله" unCheckedChildren="خیر" />
            )} />
        </div>

        <div>
          <label className="block mb-2 text-gray-600 font-medium">انتخاب دوره</label>
          <Controller name="course" control={control}
            render={({ field }) => (
              <Select value={field.value} onChange={field.onChange}
                placeholder="انتخاب دوره" options={courseOptions}
                loading={isLoading} className="w-full" />
            )} />
        </div>

        <div>
          <label className="block mb-2 text-gray-600 font-medium">ویدیو جلسه</label>
          <Controller name="video" control={control}
            render={({ field }) => (
              <FileUploader value={field.value} onChange={field.onChange}
                type="video" buttonText="آپلود ویدیو" />
            )} />
        </div>

        <button type="submit" disabled={mutation.isPending}
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition ${
            mutation.isPending ? "opacity-75 cursor-not-allowed" : ""}`}>
          {mutation.isPending ? "در حال ثبت..." : "ثبت جلسه"}
        </button>
      </form>
    </div>
  );
}