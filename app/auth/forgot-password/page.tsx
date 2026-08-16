"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Mail, Phone, Lock, KeyRound } from "lucide-react";
import AuthLayout from "@/src/components/admin/layout/AuthLayout";
import { OtpChannel } from "@/src/types/auth";
import { resetPasswordAction, sendOtpAction } from "@/src/services/auth/auth.services";

type Step = "request" | "verify";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>("request");
  const [channel, setChannel] = useState<OtpChannel>("sms");
  const [identifier, setIdentifier] = useState("");
  const router = useRouter();

  const requestForm = useForm<{ identifier: string }>();
  const verifyForm = useForm<{ code: string; newPassword: string; confirmPassword: string }>();

  const onRequestSubmit = async (data: { identifier: string }) => {
    try {
      await sendOtpAction({ identifier: data.identifier, channel, purpose: "reset_password" });
      setIdentifier(data.identifier);
      setStep("verify");
      toast.success("کد تایید ارسال شد");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "خطا در ارسال کد");
    }
  };

  const onVerifySubmit = async (data: { code: string; newPassword: string; confirmPassword: string }) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("رمز عبور و تایید آن مطابقت ندارند");
      return;
    }
    try {
      await resetPasswordAction({ identifier, code: data.code, newPassword: data.newPassword });
      toast.success("رمز عبور با موفقیت تغییر کرد");
      router.push("/auth/login");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "خطا در بازنشانی رمز عبور");
    }
  };

  return (
    <AuthLayout>
      {step === "request" ? (
        <form onSubmit={requestForm.handleSubmit(onRequestSubmit)}>
          <h1 className="text-xl font-bold mb-1 text-center text-foreground">
            فراموشی رمز عبور
          </h1>
          <p className="text-sm text-muted text-center mb-6">
            روش دریافت کد رو انتخاب کن
          </p>

          <div className="flex gap-2 mb-4">
            <button
              type="button"
              onClick={() => setChannel("sms")}
              className={`flex-1 py-2 rounded-xl border transition-colors ${
                channel === "sms" ? "bg-brand text-white border-brand" : "border-border text-muted"
              }`}
            >
              پیامک
            </button>
            <button
              type="button"
              onClick={() => setChannel("email")}
              className={`flex-1 py-2 rounded-xl border transition-colors ${
                channel === "email" ? "bg-brand text-white border-brand" : "border-border text-muted"
              }`}
            >
              ایمیل
            </button>
          </div>

          <div className="mb-6">
            <label className="text-sm text-muted">
              {channel === "sms" ? "شماره تلفن" : "ایمیل"}
            </label>
            <div className="relative mt-1">
              <input
                {...requestForm.register("identifier", { required: "این فیلد الزامی است" })}
                className="w-full border border-border bg-background text-foreground rounded-xl px-10 py-3 outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors"
                placeholder={channel === "sms" ? "09123456789" : "example@domain.com"}
              />
              {channel === "sms" ? (
                <Phone className="absolute right-3 top-3.5 w-4 h-4 text-muted" />
              ) : (
                <Mail className="absolute right-3 top-3.5 w-4 h-4 text-muted" />
              )}
            </div>
            {requestForm.formState.errors.identifier && (
              <p className="text-danger text-xs mt-1">{requestForm.formState.errors.identifier.message}</p>
            )}
          </div>

          <button
            disabled={requestForm.formState.isSubmitting}
            className="w-full bg-brand text-white py-3 rounded-xl hover:bg-brand-dark active:scale-[0.98] transition-all disabled:opacity-50"
          >
            ارسال کد تایید
          </button>
        </form>
      ) : (
        <form onSubmit={verifyForm.handleSubmit(onVerifySubmit)}>
          <h1 className="text-xl font-bold mb-1 text-center text-foreground">
            تایید کد و رمز جدید
          </h1>
          <p className="text-sm text-muted text-center mb-6">
            کد ارسال‌شده به {identifier} رو وارد کن
          </p>

          <div className="mb-4">
            <label className="text-sm text-muted">کد تایید</label>
            <div className="relative mt-1">
              <input
                {...verifyForm.register("code", { required: "کد الزامی است" })}
                className="w-full border border-border bg-background text-foreground rounded-xl px-10 py-3 outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors"
                placeholder="------"
                maxLength={6}
              />
              <KeyRound className="absolute right-3 top-3.5 w-4 h-4 text-muted" />
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm text-muted">رمز عبور جدید</label>
            <div className="relative mt-1">
              <input
                type="password"
                {...verifyForm.register("newPassword", {
                  required: "رمز عبور الزامی است",
                  minLength: { value: 8, message: "رمز عبور باید حداقل ۸ کاراکتر باشد" },
                })}
                className="w-full border border-border bg-background text-foreground rounded-xl px-10 py-3 outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors"
              />
              <Lock className="absolute right-3 top-3.5 w-4 h-4 text-muted" />
            </div>
          </div>

          <div className="mb-6">
            <label className="text-sm text-muted">تایید رمز عبور</label>
            <div className="relative mt-1">
              <input
                type="password"
                {...verifyForm.register("confirmPassword", { required: "تایید رمز عبور الزامی است" })}
                className="w-full border border-border bg-background text-foreground rounded-xl px-10 py-3 outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors"
              />
              <Lock className="absolute right-3 top-3.5 w-4 h-4 text-muted" />
            </div>
          </div>

          <button
            disabled={verifyForm.formState.isSubmitting}
            className="w-full bg-brand text-white py-3 rounded-xl hover:bg-brand-dark active:scale-[0.98] transition-all disabled:opacity-50"
          >
            تغییر رمز عبور
          </button>
        </form>
      )}
    </AuthLayout>
  );
}