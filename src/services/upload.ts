import { ApiResponse } from "../types/globalType";
import apiClient from "./interseptor/http.client";



export type UploadedFile = {
  url: string;
  filename: string;
  size: number;
  mimetype: string;
};


export const uploadContentImage = async (file: File): Promise<UploadedFile> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient.post<ApiResponse<UploadedFile>>("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data.data;
};