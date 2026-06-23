"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import { Input, Button, Checkbox, Form } from "antd";
import { UserOutlined, LockOutlined, EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { AuthLayout } from "@/src/components/admin/layout/AuthLayout";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getSession, signIn } from "next-auth/react";

type Inputs = {
  username: string;
  password: string;
  remember: boolean;
};

/* ─── design tokens ────────────────────────────────── */
const TOKEN = {
  primary: "#8B7355",
  primaryHover: "#6B5640",
  primaryLight: "#F0EAE0",
  text: "#3D3029",
  textMuted: "#9C8877",
  border: "#E5DDD4",
  inputBg: "#FAF8F5",
  error: "#D95C3A",
  success: "#4A7C59",
  font: "Vazirmatn, -apple-system, sans-serif",
};

const inputStyle: React.CSSProperties = {
  background: TOKEN.inputBg,
  border: `1.5px solid ${TOKEN.border}`,
  borderRadius: "10px",
  padding: "10px 40px 10px 14px",
  fontSize: "14px",
  fontFamily: TOKEN.font,
  color: TOKEN.text,
  direction: "rtl",
  outline: "none",
  width: "100%",
  transition: "border-color .2s, box-shadow .2s",
};

const InputField: React.FC<{
  label: string;
  icon: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}> = ({ label, icon, error, children }) => (
  <div style={{ marginBottom: "1rem" }}>
    <label
      style={{
        display: "block",
        fontSize: "13px",
        fontWeight: 500,
        color: TOKEN.textMuted,
        marginBottom: "6px",
        fontFamily: TOKEN.font,
      }}
    >
      {label}
    </label>
    <div style={{ position: "relative" }}>
      {children}
      <span
        style={{
          position: "absolute",
          right: "12px",
          top: "50%",
          transform: "translateY(-50%)",
          color: TOKEN.textMuted,
          pointerEvents: "none",
          fontSize: "16px",
        }}
      >
        {icon}
      </span>
    </div>
    {error && (
      <p
        style={{
          color: TOKEN.error,
          fontSize: "12px",
          marginTop: "4px",
          fontFamily: TOKEN.font,
        }}
      >
        {error}
      </p>
    )}
  </div>
);

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: { username: "", password: "", remember: false },
  });

  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    });

    if (res?.ok) {
      const session = await getSession();
      toast.success("ورود موفقیت‌آمیز بود.");
      router.push(session?.user?.role === "ADMIN" ? "/admin" : "/");
    } else {
      toast.error("نام کاربری یا رمز عبور اشتباه است.");
    }
  };

  return (
    <AuthLayout
      title="خوش برگشتید"
      subtitle="وارد حساب کاربری‌تان شوید و از تمام امکانات استفاده کنید."
    >
      {/* header */}
      <div style={{ textAlign: "center", marginBottom: "1.8rem" }}>
        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "14px",
            background: TOKEN.primaryLight,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "12px",
          }}
        >
          <LockOutlined style={{ fontSize: "22px", color: TOKEN.primary }} />
        </div>
        <h2
          style={{
            fontSize: "20px",
            fontWeight: 700,
            color: TOKEN.text,
            fontFamily: TOKEN.font,
            margin: 0,
          }}
        >
          ورود به حساب کاربری
        </h2>
        <p
          style={{
            fontSize: "13px",
            color: TOKEN.textMuted,
            marginTop: "4px",
            fontFamily: TOKEN.font,
          }}
        >
          اطلاعات خود را وارد کنید
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* username */}
        <InputField
          label="نام کاربری"
          icon={<UserOutlined />}
          error={errors.username?.message}
        >
          <input
            {...register("username", {
              required: "نام کاربری الزامی است.",
              minLength: { value: 3, message: "حداقل ۳ کاراکتر وارد کنید." },
            })}
            style={{
              ...inputStyle,
              borderColor: errors.username ? TOKEN.error : TOKEN.border,
            }}
            placeholder="نام کاربری"
            autoComplete="username"
          />
        </InputField>

        {/* password */}
        <InputField
          label="رمز عبور"
          icon={
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: TOKEN.textMuted,
                padding: 0,
                fontSize: "16px",
                pointerEvents: "auto",
              }}
              aria-label={showPass ? "مخفی کردن رمز" : "نمایش رمز"}
            >
              {showPass ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            </button>
          }
          error={errors.password?.message}
        >
          <input
            {...register("password", {
              required: "رمز عبور الزامی است.",
              minLength: { value: 6, message: "حداقل ۶ کاراکتر وارد کنید." },
            })}
            type={showPass ? "text" : "password"}
            style={{
              ...inputStyle,
              borderColor: errors.password ? TOKEN.error : TOKEN.border,
              paddingLeft: "40px",
            }}
            placeholder="رمز عبور"
            autoComplete="current-password"
          />
        </InputField>

        {/* row: remember + forgot */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1.4rem",
            fontFamily: TOKEN.font,
          }}
        >
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              fontSize: "13px",
              color: TOKEN.textMuted,
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            <span
              onClick={() => setRemember((v) => !v)}
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "5px",
                border: `1.5px solid ${remember ? TOKEN.primary : TOKEN.border}`,
                background: remember ? TOKEN.primary : TOKEN.inputBg,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all .2s",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              {remember && (
                <svg
                  width="10"
                  height="8"
                  viewBox="0 0 10 8"
                  fill="none"
                >
                  <path
                    d="M1 4L3.5 6.5L9 1"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
            مرا به خاطر بسپار
          </label>

          <Link
            href="/forgot-password"
            style={{
              fontSize: "13px",
              color: TOKEN.primary,
              textDecoration: "none",
            }}
          >
            فراموشی رمز عبور؟
          </Link>
        </div>

        {/* submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: "100%",
            padding: "13px",
            background: isSubmitting ? "#C4B49E" : TOKEN.primary,
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            fontSize: "15px",
            fontWeight: 600,
            fontFamily: TOKEN.font,
            cursor: isSubmitting ? "not-allowed" : "pointer",
            transition: "background .2s, transform .1s",
            marginBottom: "1.2rem",
            letterSpacing: "0.02em",
          }}
          onMouseEnter={(e) => {
            if (!isSubmitting)
              (e.target as HTMLButtonElement).style.background = TOKEN.primaryHover;
          }}
          onMouseLeave={(e) => {
            if (!isSubmitting)
              (e.target as HTMLButtonElement).style.background = TOKEN.primary;
          }}
        >
          {isSubmitting ? "در حال ورود..." : "ورود به حساب"}
        </button>

        {/* divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "1rem",
          }}
        >
          <div
            style={{ flex: 1, height: "1px", background: TOKEN.border }}
          />
          <span
            style={{
              fontSize: "12px",
              color: TOKEN.textMuted,
              fontFamily: TOKEN.font,
              whiteSpace: "nowrap",
            }}
          >
            یا ورود با
          </span>
          <div
            style={{ flex: 1, height: "1px", background: TOKEN.border }}
          />
        </div>

        {/* google only (no github per client request) */}
        <button
          type="button"
          style={{
            width: "100%",
            padding: "11px",
            background: TOKEN.inputBg,
            border: `1.5px solid ${TOKEN.border}`,
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            fontSize: "14px",
            fontFamily: TOKEN.font,
            color: TOKEN.text,
            cursor: "pointer",
            transition: "border-color .2s, background .2s",
            marginBottom: "1.4rem",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = TOKEN.primary;
            (e.currentTarget as HTMLButtonElement).style.background = "#FFF";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = TOKEN.border;
            (e.currentTarget as HTMLButtonElement).style.background = TOKEN.inputBg;
          }}
        >
          {/* google icon */}
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.6 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.6 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.1-4z" />
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.2 19 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.6 29.3 4 24 4 16.3 4 9.7 8.5 6.3 14.7z" />
            <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.5 35.5 26.9 36 24 36c-5.2 0-9.6-2.9-11.3-7.1L6 33.9C9.3 39.5 16.1 44 24 44z" />
            <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.9 2.3-2.5 4.3-4.6 5.7l6.2 5.2C40.8 35.5 44 30.1 44 24c0-1.3-.1-2.7-.4-4z" />
          </svg>
          ادامه با گوگل
        </button>

        {/* signup link */}
        <p
          style={{
            textAlign: "center",
            fontSize: "13px",
            color: TOKEN.textMuted,
            fontFamily: TOKEN.font,
            margin: 0,
          }}
        >
          حساب کاربری ندارید؟{" "}
          <Link
            href="/auth/register"
            style={{
              color: TOKEN.primary,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            ثبت‌نام کنید
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;