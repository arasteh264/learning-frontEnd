import axios from "axios";
import { getSession, signOut } from "next-auth/react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const apiClient = axios.create({
  baseURL: apiUrl,
});

apiClient.interceptors.request.use(
  async (config) => {
    const session = await getSession();

    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

const UNAUTHORIZED_STATUS = [401, 403];

apiClient.interceptors.response.use(
  (response) => response,

  async (error) => {
    const status = error?.response?.status;

    if (UNAUTHORIZED_STATUS.includes(status)) {
      await signOut({
        callbackUrl: "/auth/login",
      });
    }

    return Promise.reject(error);
  }
);

export default apiClient;