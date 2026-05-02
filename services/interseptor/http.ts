import axios from "axios";
import Router from "next/router";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const apiClient = axios.create({
  baseURL: apiUrl,
});

apiClient.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const UNAUTHORIZED_STATUS = [401, 403];

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (UNAUTHORIZED_STATUS.includes(status)) {
      localStorage.removeItem("accessToken");
      Router.push("/auth/login");
      return;
    }

    return Promise.reject(error);
  }
);

export default apiClient;
