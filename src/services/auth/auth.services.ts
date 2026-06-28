"use server";

import {
  AuthResponse,
  LoginApiResponse,
  LoginType,
  RegisterResponse,
  RegisterType,
} from "@/src/types/auth";
import http from "../interseptor/http";
import { signIn } from "next-auth/react";

export async function loginAction(data: LoginType): Promise<AuthResponse> {
  const res = await fetch(`${process.env.API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      identifier: data.identifier,
      password: data.password,
    }),
  });

  const result: LoginApiResponse = await res.json();

  if (!result?.data?.accessToken) {
    return { ok: false, error: "توکن دریافت نشد" };
  }

  await signIn("credentials", {
    redirect: false,
    user: JSON.stringify({
      id: result.data.id,
      name: result.data.name,
      role: result.data.user.role,
      accessToken: result.data.accessToken,
    }),
  });

  return { ok: true };
}

export const Register = async (
  data: RegisterType,
): Promise<RegisterResponse> => {
  const response = await http.post<{ data: RegisterResponse }>(
    "/auth/register",
    data,
  );
  return response.data.data;
};
