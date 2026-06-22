"use client";

import { Input, Button, Select, Switch } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createSessionApi, getAllCourse } from "@/src/services/course";
import { toast } from "react-toastify";
import FileUploader from "@/src/components/admin/FileUploader";

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
  const { control, handleSubmit } = useForm<CreateSessionForm>({
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
      router.push("/admin/sessions");
    },

    onError: (error: any) => {
      const message = error?.response?.data?.message || "خطا در ایجاد جلسه";
      toast.error(message);
    },
  });

  const onSubmit = (data: CreateSessionForm) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg my-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button onClick={() => router.back()} className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition">
          بازگشت
        </Button>
        <h2 className="text-2xl font-semibold text-gray-700">افزودن جلسه</h2>
      </div>

      {/* فرم */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* بخش زمان و عنوان */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* مدت زمان */}
          <div>
            <label className="block mb-2 text-gray-600 font-medium">مدت زمان</label>
            <Controller
              name="time"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="مثلاً ۲ ساعت"
                  className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent px-4 py-2 transition"
                />
              )}
            />
          </div>
          {/* عنوان جلسه */}
          <div>
            <label className="block mb-2 text-gray-600 font-medium">عنوان جلسه</label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="عنوان جلسه"
                  className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent px-4 py-2 transition"
                />
              )}
            />
          </div>
        </div>

        {/* رایگان بودن */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg shadow-inner">
          <span className="text-gray-700 font-medium">رایگان باشد؟</span>
          <Controller
            name="free"
            control={control}
            render={({ field }) => (
              <Switch
                checked={field.value === 0}
                onChange={(checked) => {
                  field.onChange(checked ? 0 : 1);
                }}
                checkedChildren="بله"
                unCheckedChildren="خیر"
              />
            )}
          />
        </div>

        <div>
          <label className="block mb-2 text-gray-600 font-medium">انتخاب دوره</label>
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
                className="border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
            )}
          />
        </div>

        {/* آپلود ویدیو */}
        <div>
          <label className="block mb-2 text-gray-600 font-medium">ویدیو جلسه</label>
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

        <button
          type="submit"
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition ${
            mutation.isLoading ? "opacity-75 cursor-not-allowed" : ""
          }`}
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "در حال ثبت..." : "ثبت جلسه"}
        </button>
      </form>
    </div>
  );
}