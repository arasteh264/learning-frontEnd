import { useQuery } from "@tanstack/react-query";
import http from "./interseptor/http";
import { ApiResponse } from "../types/globalType";



export type Announcement = {
  id: string;
  title: string;
  content: string;
  isActive: boolean;
  created_at: string;
  updated_at: string;
};

export type CreateAnnouncementPayload = Omit<
  Announcement,
  "id" | "created_at" | "updated_at" | "isActive"
>;

export type UpdateAnnouncementPayload = Partial<CreateAnnouncementPayload>;



export const getAll = async (): Promise<Announcement[]> => {
  const res = await http.get<ApiResponse<Announcement[]>>("/announcement");
  return res.data.data;
};

export const getIsActive = async (): Promise<Announcement[]> => {
  const res = await http.get<ApiResponse<Announcement[]>>("/announcement/active");
  return res.data.data;
};

export const getById = async (id: string): Promise<Announcement> => {
  const res = await http.get<ApiResponse<Announcement>>(`/announcement/${id}`);
  return res.data.data;
};

export const create = async (
  data: CreateAnnouncementPayload
): Promise<Announcement> => {
  const res = await http.post<ApiResponse<Announcement>>("/announcement", data);
  return res.data.data;
};

export const update = async (
  id: string,
  data: UpdateAnnouncementPayload
): Promise<Announcement> => {
  const res = await http.put<ApiResponse<Announcement>>(
    `/announcement/${id}`,
    data
  );
  return res.data.data;
};

export const onChangeStatus = async (id: string): Promise<Announcement> => {
  const res = await http.patch<ApiResponse<Announcement>>(
    `/announcement/${id}/status`
  );
  return res.data.data;
};

export const remove = async (id: string): Promise<void> => {
  await http.delete(`/announcement/${id}`);
};



export const useGetAnnouncement = () => {
  return useQuery<Announcement[]>({
    queryKey: ["announcement"],
    queryFn: getIsActive,
  });
};