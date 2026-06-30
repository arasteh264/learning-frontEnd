import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../types/globalType";
import apiClient from "./interseptor/http.client";

export type Announcement = {
  id: string;
  text: string;       
  end_date?: string;
  isActive: boolean;
  created_at: string;
  updated_at: string;
};
export type CreateAnnouncementPayload = Omit<
  Announcement,
  "id" | "created_at" | "updated_at" | "isActive"
>;
export type AnnouncementForm = {
  text: string;     
  end_date: string;
};
export type UpdateAnnouncementPayload = Partial<CreateAnnouncementPayload>;

export const getAll = async (): Promise<Announcement[]> => {
  const res = await apiClient.get<ApiResponse<Announcement[]>>("/announcement");
  return res.data.data;
};

export const getIsActive = async (): Promise<Announcement[]> => {
  const res = await apiClient.get<ApiResponse<Announcement[]>>(
    "/announcement/active",
  );
  return res.data.data;
};

export const getById = async (id: string): Promise<Announcement> => {
  const res = await apiClient.get<ApiResponse<Announcement>>(`/announcement/${id}`);
  return res.data.data;
};

export const create = async (
  data: CreateAnnouncementPayload,
): Promise<Announcement> => {
  const res = await apiClient.post<ApiResponse<Announcement>>("/announcement", data);
  return res.data.data;
};

export const update = async (
  id: string,
  data: UpdateAnnouncementPayload,
): Promise<Announcement> => {
  const res = await apiClient.put<ApiResponse<Announcement>>(
    `/announcement/${id}`,
    data,
  );
  return res.data.data;
};

export const onChangeStatus = async (id: string): Promise<Announcement> => {
  const res = await apiClient.patch<ApiResponse<Announcement>>(
    `/announcement/${id}/status`,
  );
  return res.data.data;
};

export const remove = async (id: string): Promise<void> => {
  await apiClient.delete(`/announcement/${id}`);
};

export const useGetAnnouncement = () => {
  return useQuery<Announcement | null>({
    queryKey: ["announcement"],
    queryFn: async () => {
      const list = await getIsActive();
      return list[0] ?? null;
    },
  });
};
