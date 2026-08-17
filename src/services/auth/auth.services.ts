"use server";

import {
  AuthResponse,
  LoginApiResponse,
  RegisterResponse,
  RegisterType,
  LoginType,
  SendOtpType,
  VerifyOtpType,
  ResetPasswordType,
  OtpApiResponse,
  VerifyOtpApiResponse,
} from "@/src/types/auth";
import { signIn } from "next-auth/react";
import serverApiClient from "../interseptor/http.server";
import { isAxiosError } from "axios";

export async function loginAction(data: LoginType): Promise<AuthResponse> {
  const res = await serverApiClient.post<LoginApiResponse>("/auth/login", {
    identifier: data.identifier,
    password: data.password,
  });

  const loginData = res.data?.data;

  if (!loginData?.accessToken) {
    return { ok: false, error: "توکن دریافت نشد" };
  }

  const signInResult = await signIn("credentials", {
    redirect: false,
    user: JSON.stringify({
      id: loginData.id,
      name: loginData.name,
      role: loginData.user.role,
      accessToken: loginData.accessToken,
    }),
  });

  if (signInResult?.error) {
    return { ok: false, error: "ورود ناموفق بود" };
  }

  return { ok: true };
}

export const Register = async (
  data: RegisterType,
): Promise<RegisterResponse> => {
  try {
    const { confirmPassword, ...payload } = data;
    const response = await serverApiClient.post<{ data: RegisterResponse }>(
      "/auth/register",
      payload,
    );
    return response.data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message ?? "ثبت‌نام ناموفق بود");
    }
    throw error;
  }
};

export async function sendOtpAction(data: SendOtpType): Promise<OtpApiResponse> {
  try {
    const res = await serverApiClient.post<{ data: OtpApiResponse }>("/auth/otp/send", data);
    return res.data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message ?? "ارسال کد با خطا مواجه شد");
    }
    throw error;
  }
}

export async function verifyOtpAction(data: VerifyOtpType): Promise<VerifyOtpApiResponse["data"]> {
  try {
    const res = await serverApiClient.post<VerifyOtpApiResponse>("/auth/otp/verify", data);
    return res.data.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message ?? "کد وارد شده نامعتبر است");
    }
    throw error;
  }
}

export async function resetPasswordAction(data: ResetPasswordType): Promise<void> {
  try {
    await serverApiClient.post("/auth/password/reset", data);
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data?.message ?? "بازنشانی رمز عبور ناموفق بود");
    }
    throw error;
  }
}

export async function loginWithOtpAction(
  identifier: string,
  code: string,
): Promise<AuthResponse> {
  try {
    const res = await serverApiClient.post<VerifyOtpApiResponse>("/auth/otp/verify", {
      identifier,
      code,
      purpose: "login",
    });
    const loginData = res.data.data;

    if (!loginData.verified || !loginData.accessToken) {
      return { ok: false, error: "کد نامعتبر است" };
    }

    const signInResult = await signIn("credentials", {
      redirect: false,
      user: JSON.stringify({
        id: loginData.id,
        name: loginData.name,
        role: loginData.user?.role,
        accessToken: loginData.accessToken,
      }),
    });

    if (signInResult?.error) {
      return { ok: false, error: "ورود ناموفق بود" };
    }

    return { ok: true };
  } catch (error) {
    if (isAxiosError(error)) {
      return { ok: false, error: error.response?.data?.message ?? "ورود ناموفق بود" };
    }
    return { ok: false, error: "خطای غیرمنتظره" };
  }
}