"use server";

import {
  AuthResponse,
  LoginApiResponse,
  RegisterResponse,
  RegisterType,
  LoginType,
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