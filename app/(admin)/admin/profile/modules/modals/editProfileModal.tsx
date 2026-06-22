import { getUserProfile } from "@/src/services/user";
import { profileSchema } from "@/src/validation/profile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal, Input, Button, Select } from "antd";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ConfirmOtp from "./confirmOtp";

const days = Array.from({ length: 31 }, (_, i) => ({
  label: i + 1,
  value: i + 1,
}));

const months = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
].map((m, i) => ({
  label: m,
  value: i + 1,
}));

const years = Array.from({ length: 1405 - 1300 + 1 }, (_, i) => ({
  label: 1300 + i,
  value: 1300 + i,
}));

type ProfileForm = {
  name: string;
  nationalId: string;
  phone: string;
  email: string;
  lastName: string;
  day: string;
  month: string;
  year: string;
};

type Props = {
  open: boolean;
  data: ProfileForm;
  onOk: (data: ProfileForm) => void;
  onCancel: () => void;
};

export default function EditProfileModal({
  open,
  data,
  onOk,
  onCancel,
}: Props) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ProfileForm>({
    defaultValues: {
      name: "",
      lastName: "",
      nationalId: "",
      phone: "",
      email: "",
      day: "",
      month: "",
      year: "",
    },
  });

  useEffect(() => {
    if (open && data) {
      reset({ ...data });
    }
  }, [open]);

  const [isOtpOpen, setIsOtpOpen] = useState(false);

  const onSubmit = (formData: ProfileForm) => {
    onOk(formData);
  };

  return (
    <Modal
      title="ثبت اطلاعات شناسایی"
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      width={520}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 border-t border-gray-100 pt-2"
      >
        <span className="text-gray-400 text-sm py-3 leading-6">
          لطفا اطلاعات شناسایی خود را وارد کنید. نام و نام خانوادگی شما باید با
          اطلاعاتی که وارد می‌کنید همخوانی داشته باشند.
        </span>

        <div className="w-full flex gap-2">
          <div className="w-full flex flex-col gap-1">
            <span className="text-sm text-[#1C2B27]">نام :</span>
            <Input {...register("name")} />
            {errors.name && (
              <span className="text-red-500 text-xs">
                {errors.name.message}
              </span>
            )}
          </div>
        </div>

        <div className="w-full flex gap-2 items-start py-1">
          <div className="w-full flex flex-col gap-1">
            <span className="text-sm text-[#1C2B27]">کدملی :</span>
            <Input {...register("nationalId")} />
            {errors.nationalId && (
              <span className="text-red-500 text-xs">
                {errors.nationalId.message}
              </span>
            )}
          </div>
          <div className="w-full flex flex-col gap-1">
            <div className="w-full flex items-center justify-between gap-1">
              <span className="text-sm text-[#1C2B27]">شماره موبایل :</span>
              <button
                type="button"
                className="text-xs text-[#1EB35B] hover:text-[#17914a] font-medium"
                onClick={() => setIsOtpOpen(true)}
              >
                تایید شماره
              </button>
            </div>
            <Input {...register("phone")} />
            {errors.phone && (
              <span className="text-red-500 text-xs">
                {errors.phone.message}
              </span>
            )}
          </div>
        </div>

        <div className="w-full flex gap-2 items-start py-1">
          <div className="w-full flex flex-col gap-1">
            <span className="text-sm text-[#1C2B27]">روز :</span>
            <Controller
              name="day"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onChange={field.onChange}
                  options={days}
                  placeholder="روز"
                />
              )}
            />
            {errors.day && (
              <span className="text-red-500 text-xs">{errors.day.message}</span>
            )}
          </div>
          <div className="w-full flex flex-col gap-1">
            <span className="text-sm text-[#1C2B27]">ماه :</span>
            <Controller
              name="month"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onChange={field.onChange}
                  options={months}
                  placeholder="ماه"
                />
              )}
            />
            {errors.month && (
              <span className="text-red-500 text-xs">
                {errors.month.message}
              </span>
            )}
          </div>
          <div className="w-full flex flex-col gap-1">
            <span className="text-sm text-[#1C2B27]">سال :</span>
            <Controller
              name="year"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onChange={field.onChange}
                  options={years}
                  placeholder="سال"
                />
              )}
            />
            {errors.year && (
              <span className="text-red-500 text-xs">
                {errors.year.message}
              </span>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col gap-1 py-1">
          <span className="text-sm text-[#1C2B27]">ایمیل :</span>
          <Input {...register("email")} />
          {errors.email && (
            <span className="text-red-500 text-xs">
              {errors.email.message}
            </span>
          )}
        </div>

        <Button
          htmlType="submit"
          type="primary"
          className="!mt-3 !bg-[#1EB35B] !border-[#1EB35B] hover:!bg-[#17914a] hover:!border-[#17914a]"
        >
          ذخیره
        </Button>
      </form>

      <ConfirmOtp
        open={isOtpOpen}
        onClose={() => setIsOtpOpen(false)}
        onSubmit={() => setIsOtpOpen(false)}
      />
    </Modal>
  );
}