"use server";
import { LoginType, RegisterType } from '@/src/types/auth';
import http from '../interseptor/http';
import { signIn } from 'next-auth/react';





export async function loginAction(data: LoginType) {
  const res = await fetch(`${process.env.API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      identifier: data.identifier,
      password: data.password,
    }),
  });

console.log("LOGIN RESPONSE:", await res);
  const result = await res.json();
console.log("LOGIN RESPONSE:", await res.json());
  if (!result?.data?.accessToken) {
    return { ok: false };
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

  return {
    ok: true,
  };
}

export const Register = async ({ userName, password, name, phone,email,confirmPassword }: RegisterType) => {
  const response = await http.post('/auth/register', {
    userName,
    password,
    name,
    phone,
    email,
    confirmPassword
  });
  return response;
};