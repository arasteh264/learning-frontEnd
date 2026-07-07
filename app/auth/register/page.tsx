// app/auth/register/page.tsx
"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { Eye, EyeOff, User, Lock, Mail, Phone } from "lucide-react";
import type { AxiosError } from "axios";
import { Register } from "@/src/services/auth/auth.services";
import { RegisterType } from "@/src/types/auth";
import AuthLayout from "@/src/components/admin/layout/AuthLayout";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterType>();
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const password = watch("password");
  const router = useRouter();

  const onSubmit = async (data: RegisterType) => {
    try {
      const res = await Register({ ...data, confirmPassword: data.confirmPassword ?? "" });
      if (res.status === 201) {
        toast.success("ثبت نام با موفقیت انجام شد.");
        router.push("/auth/login");
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || "خطا در ثبت نام. لطفا دوباره تلاش کنید.");
    }
  };

  return (
    <AuthLayout message="یاد بگیر، یادداشت کن، و پیشرفتت رو دنبال کن.">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-xl font-bold mb-1 text-center text-foreground">
          ثبت‌نام حساب کاربری
        </h1>
        <p className="text-sm text-muted text-center mb-6">
          چند قدم تا شروع یادگیری فاصله داری
        </p>

        <div className="mb-4">
          <label className="text-sm text-muted">نام کاربری</label>
          <div className="relative mt-1">
            <input
              {...register("userName", { required: "نام کاربری الزامی است." })}
              className="w-full border border-border bg-background text-foreground rounded-xl px-10 py-3 outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors"
              placeholder="username"
            />
            <User className="absolute right-3 top-3.5 w-4 h-4 text-muted" />
          </div>
          {errors.userName && <p className="text-danger text-xs mt-1">{errors.userName.message}</p>}
        </div>

        <div className="mb-4">
          <label className="text-sm text-muted">نام و نام خانوادگی</label>
          <div className="relative mt-1">
            <input
              {...register("name", { required: "نام و نام خانوادگی الزامی است." })}
              className="w-full border border-border bg-background text-foreground rounded-xl px-10 py-3 outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors"
              placeholder="نام و نام خانوادگی"
            />
            <User className="absolute right-3 top-3.5 w-4 h-4 text-muted" />
          </div>
          {errors.name && <p className="text-danger text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div className="mb-4">
          <label className="text-sm text-muted">ایمیل</label>
          <div className="relative mt-1">
            <input
              {...register("email", {
                required: "ایمیل الزامی است.",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "فرمت ایمیل نامعتبر است." },
              })}
              className="w-full border border-border bg-background text-foreground rounded-xl px-10 py-3 outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors"
              placeholder="example@domain.com"
            />
            <Mail className="absolute right-3 top-3.5 w-4 h-4 text-muted" />
          </div>
          {errors.email && <p className="text-danger text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label className="text-sm text-muted">شماره تلفن</label>
          <div className="relative mt-1">
            <input
              {...register("phone", {
                required: "شماره تلفن الزامی است.",
                pattern: { value: /^09\d{9}$/, message: "فرمت شماره تلفن نامعتبر است." },
              })}
              className="w-full border border-border bg-background text-foreground rounded-xl px-10 py-3 outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors"
              placeholder="09123456789"
            />
            <Phone className="absolute right-3 top-3.5 w-4 h-4 text-muted" />
          </div>
          {errors.phone && <p className="text-danger text-xs mt-1">{errors.phone.message}</p>}
        </div>

        <div className="mb-4">
          <label className="text-sm text-muted">رمز عبور</label>
          <div className="relative mt-1">
            <input
              type={showPass ? "text" : "password"}
              {...register("password", {
                required: "رمز عبور الزامی است.",
                minLength: { value: 8, message: "رمز عبور باید حداقل ۸ کاراکتر باشد." },
              })}
              className="w-full border border-border bg-background text-foreground rounded-xl px-10 py-3 outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors"
            />
            <Lock className="absolute right-3 top-3.5 w-4 h-4 text-muted" />
            <button
              type="button"
              onClick={() => setShowPass((s) => !s)}
              className="absolute left-3 top-3.5 text-muted hover:text-brand transition-colors"
            >
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && <p className="text-danger text-xs mt-1">{errors.password.message}</p>}
        </div>

        <div className="mb-6">
          <label className="text-sm text-muted">تایید رمز عبور</label>
          <div className="relative mt-1">
            <input
              type={showConfirm ? "text" : "password"}
              {...register("confirmPassword", {
                required: "تایید رمز عبور الزامی است.",
                validate: (v) => v === password || "رمز عبور و تایید آن مطابقت ندارند.",
              })}
              className="w-full border border-border bg-background text-foreground rounded-xl px-10 py-3 outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors"
            />
            <Lock className="absolute right-3 top-3.5 w-4 h-4 text-muted" />
            <button
              type="button"
              onClick={() => setShowConfirm((s) => !s)}
              className="absolute left-3 top-3.5 text-muted hover:text-brand transition-colors"
            >
              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-danger text-xs mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          disabled={isSubmitting}
          className="w-full bg-brand text-white py-3 rounded-xl hover:bg-brand-dark active:scale-[0.98] transition-all disabled:opacity-50"
        >
          {isSubmitting ? "در حال ثبت‌نام..." : "ثبت‌نام"}
        </button>

        <p className="text-center text-sm mt-4 text-muted">
          حساب داری؟{" "}
          <Link href="/auth/login" className="text-brand font-semibold hover:text-brand-dark transition-colors">
            ورود
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}