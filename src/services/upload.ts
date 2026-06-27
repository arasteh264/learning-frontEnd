import { ApiResponse } from "../types/globalType";
import http from "./interseptor/http";



export type UploadedFile = {
  url: string;
  filename: string;
  size: number;
  mimetype: string;
};


export const uploadContentImage = async (file: File): Promise<UploadedFile> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await http.post<ApiResponse<UploadedFile>>("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data.data;
};