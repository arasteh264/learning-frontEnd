import { ApiResponse } from "../types/globalType";
import http from "./interseptor/http";



export type UserRole = "admin" | "user" | "teacher";

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
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