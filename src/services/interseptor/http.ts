import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { getSession, signOut } from "next-auth/react";

const UNAUTHORIZED_STATUS: Record<number, boolean> = {
  401: true,
  403: true,
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

if (!apiUrl) {
  throw new Error("NEXT_PUBLIC_API_URL is missing");
}

const apiClient = axios.create({
  baseURL: apiUrl,
});

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const session = await getSession();

    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const status = error?.response?.status;

    if (status && UNAUTHORIZED_STATUS[status]) {
      await signOut({ callbackUrl: "/auth/login" });
    }

    return Promise.reject(error);
  },
);

export default apiClient;
