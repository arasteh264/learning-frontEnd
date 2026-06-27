import http from "./interseptor/http";
import { ApiResponse } from "../types/globalType";



export type UserRole = "ADMIN" | "USER" | "TEACHER" | "STUDENT";

export type User = {
  id: string;
  name: string;
  lastName: string;       
  email: string;
  phone: string;
  nationalId: string;     
  avatar: string;
  role: UserRole;
  isBanned: boolean;
  created_at: string;
};

export type UserProfile = Omit<User, "isBanned">;

export type UpdateRolePayload = Pick<User, "role">;

 

export const getUserProfile = async (): Promise<UserProfile> => {
  const response = await http.get<ApiResponse<UserProfile>>("/users/profile");
  return response.data.data;
};

export const getUsers = async (): Promise<User[]> => {
  const res = await http.get<ApiResponse<User[]>>("/users");
  return res.data.data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await http.delete(`/users/${id}`);
};

export const banUser = async (id: string): Promise<User> => {
  const res = await http.post<ApiResponse<User>>(`/users/ban/${id}`);
  return res.data.data;
};

export const updateUserRole = async (
  id: string,
  payload: UpdateRolePayload
): Promise<User> => {
  const res = await http.put<ApiResponse<User>>(`/users/role/${id}`, payload);
  return res.data.data;
};