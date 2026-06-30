import { ApiResponse } from "../types/globalType";
import apiClient from "./interseptor/http.client";



export type Teacher = {
  id: string;
  name: string;
  avatar?: string;
  bio: string;
  phone: string;
  email: string;
  isVerified: boolean;
  created_at: string;
};

export type TeacherRequestPayload = Pick<Teacher, "bio" | "phone" | "email">;



export const getTeacherList = async (): Promise<Teacher[]> => {
  const response = await apiClient.get<ApiResponse<Teacher[]>>("/teacher");
  return response.data.data;
};

export const requestForTeacher = async (
  payload: TeacherRequestPayload
): Promise<Teacher> => {
  const response = await apiClient.post<ApiResponse<Teacher>>(
    "/teacher/request",
    payload
  );
  return response.data.data;
};

export const verifyTeacher = async (id: string): Promise<Teacher> => {
  const res = await apiClient.post<ApiResponse<Teacher>>(`/teacher/verify/${id}`);
  return res.data.data;
};

export const removeTeacher = async (id: string): Promise<void> => {
  await apiClient.delete(`/teacher/${id}`);
};