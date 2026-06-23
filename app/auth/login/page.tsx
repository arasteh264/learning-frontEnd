"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { Eye, EyeOff, User, Lock } from "lucide-react";

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
    <div className="min-h-screen flex items-center justify-center bg-[#f7f3ee]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg"
      >
        <h1 className="text-xl font-bold mb-6 text-center">
          ورود به حساب کاربری
        </h1>

        <div className="mb-4">
          <label className="text-sm text-gray-500">نام کاربری</label>
          <div className="relative mt-1">
            <input
              {...register("username", {
                required: "نام کاربری الزامی است",
              })}
              className="w-full border rounded-xl px-10 py-3 focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
              placeholder="username"
            />
            <User className="absolute right-3 top-3.5 w-4 h-4 text-gray-400" />
          </div>
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="text-sm text-gray-500">رمز عبور</label>
          <div className="relative mt-1">
            <input
              type={showPass ? "text" : "password"}
              {...register("password", {
                required: "رمز الزامی است",
              })}
              className="w-full border rounded-xl px-10 py-3"
            />
            <Lock className="absolute right-3 top-3.5 w-4 h-4 text-gray-400" />

            <button
              type="button"
              onClick={() => setShowPass((s) => !s)}
              className="absolute left-3 top-3.5 text-gray-500"
            >
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex justify-between items-center mb-6 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setValue("remember", !remember)}
            />
            مرا به خاطر بسپار
          </label>

          <Link href="/forgot-password" className="text-[#8B7355]">
            فراموشی رمز؟
          </Link>
        </div>

        <button
          disabled={isSubmitting}
          className="w-full bg-[#8B7355] text-white py-3 rounded-xl hover:bg-[#6B5640] disabled:opacity-50"
        >
          {isSubmitting ? "در حال ورود..." : "ورود"}
        </button>

        <p className="text-center text-sm mt-4">
          حساب نداری؟{" "}
          <Link href="/auth/register" className="text-[#8B7355] font-semibold">
            ثبت‌نام
          </Link>
        </p>
      </form>
    </div>
  );
}