import { getUserProfile } from "@/services/user";
import { profileSchema } from "@/validation/profile.schema";
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
  //   birthDate?: string;
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
  console.log("DATA FROM API:", data);
  useEffect(() => {
    if (open && data) {
      reset({
        ...data,
      });
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
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 border-t border-gray-200 "
      >
        <span className=" text-gray-500 text-1xl py-4 ">
          لطفا اطلاعات شناسایی خود را وارد کنید. نام و نام خانوادگی شما باید با
          اطلاعاتی که وارد می‌کنید همخوانی داشته باشند.
        </span>
        <div className="w-full flex  gap-2">
          <div className="w-full flex flex-col gap-1">
            <span>نام :</span>
            <Input {...register("name")} />
            {errors.name && (
              <span className="text-red-500 text-xs">
                {errors.name.message}
              </span>
            )}
          </div>
        </div>
        <div className="w-full flex  gap-2 items-center py-3">
          <div className="w-full flex flex-col gap-1 mt-2">
            <span className="mb-0.5">کدملی :</span>
            <Input {...register("nationalId")} />
            {errors.nationalId && (
              <span className="text-red-500 text-xs">
                {errors.nationalId.message}
              </span>
            )}
          </div>
          <div className="w-full flex flex-col gap-1">
            <div className="w-full flex items-center gap-1">
              <span>شماره موبایل :</span>
              <Button
                className="!border-none !p-0 !text-xs !text-blue-500"
                onClick={() => setIsOtpOpen(true)}
              >
                تایید شماره
              </Button>
            </div>
            <Input {...register("phone")} />
            {errors.phone && (
              <span className="text-red-500 text-xs">
                {errors.phone.message}
              </span>
            )}
          </div>
        </div>
        <div className="w-full flex gap-2 items-center py-3">
          <div className="w-full flex flex-col gap-1">
            <span>روز :</span>
            <Controller
              name="day"
              control={control}
              render={({ field }) => (
                // <Select {...field} options={days} />
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
            <span>ماه :</span>
            <Controller
              name="month"
              control={control}
              render={({ field }) => (
                // <Select {...field} options={months}/>

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
            <span>سال :</span>
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
        <div className="w-full flex flex-col gap-1 py-3">
          <div className="w-full flex flex-col gap-1 mt-2">
            <span className="mb-0.5">ایمیل :</span>
            <Input {...register("email")} />
            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>
        </div>
        <Button htmlType="submit" type="primary" className="mt-3">
          ذخیره
        </Button>
      </form>
      <ConfirmOtp
        open={isOtpOpen}
        onClose={() => setIsOtpOpen(false)}
        onSubmit={(otp) => {
          setIsOtpOpen(false);
        }}
      />
    </Modal>
  );
}
