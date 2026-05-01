import axios from "axios";
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

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    
    if (error.response && error.response.status === 401 || 403) {
      window.location.href = "/auth/login";
    }else{
    return Promise.reject(error);
    }

  },
);

export default apiClient;
