// app/auth/login/page.tsx
"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import AuthLayout from "@/src/components/admin/layout/AuthLayout";

type LoginInputs = {
  username: string;
  password: string;
  remember: boolean;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginInputs>();
  const [showPass, setShowPass] = useState(false);
  const remember = watch("remember");
  const router = useRouter();

  const onSubmit = async (data: LoginInputs) => {
    const res = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    });
    if (res?.ok) {
      router.push("/");
    } else {
      toast.error("نام کاربری یا رمز اشتباه است");
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-xl font-bold mb-1 text-center text-foreground">
          ورود به حساب کاربری
        </h1>
        <p className="text-sm text-muted text-center mb-6">
          خوش برگشتی، دوباره یاد بگیر و یادداشت کن
        </p>

        <div className="mb-4">
          <label className="text-sm text-muted">نام کاربری</label>
          <div className="relative mt-1">
            <input
              {...register("username", { required: "نام کاربری الزامی است" })}
              className="w-full border border-border bg-background text-foreground rounded-xl px-10 py-3 outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors"
              placeholder="username"
            />
            <User className="absolute right-3 top-3.5 w-4 h-4 text-muted" />
          </div>
          {errors.username && (
            <p className="text-danger text-xs mt-1">{errors.username.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="text-sm text-muted">رمز عبور</label>
          <div className="relative mt-1">
            <input
              type={showPass ? "text" : "password"}
              {...register("password", { required: "رمز الزامی است" })}
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
          {errors.password && (
            <p className="text-danger text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        <div className="flex justify-between items-center mb-6 text-sm">
          <label className="flex items-center gap-2 text-muted">
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setValue("remember", !remember)}
              className="accent-brand"
            />
            مرا به خاطر بسپار
          </label>
          <Link href="/forgot-password" className="text-brand hover:text-brand-dark transition-colors">
            فراموشی رمز؟
          </Link>
        </div>

        <button
          disabled={isSubmitting}
          className="w-full bg-brand text-white py-3 rounded-xl hover:bg-brand-dark active:scale-[0.98] transition-all disabled:opacity-50"
        >
          {isSubmitting ? "در حال ورود..." : "ورود"}
        </button>

        <p className="text-center text-sm mt-4 text-muted">
          حساب نداری؟{" "}
          <Link href="/auth/register" className="text-brand font-semibold hover:text-brand-dark transition-colors">
            ثبت‌نام
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}