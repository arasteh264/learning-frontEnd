import { ApiResponse } from "../types/globalType";
import apiClient from "./interseptor/http.client";

export type Slider = {
  id: string;
  title: string;
  image_url: string;
  link: string;
  isActive: boolean;
  order: number;
  created_at: string;
  image:string
};

export type CreateSliderPayload = Omit<Slider, "id" | "created_at">;

export const getAll = (): Promise<Slider[]> =>
  apiClient.get<ApiResponse<Slider[]>>("/slider").then((res) => res.data.data);

export const getById = (id: string): Promise<Slider> =>
  apiClient
    .get<ApiResponse<Slider>>(`/slider/${id}`)
    .then((res) => res.data.data);

export const create = (data: FormData): Promise<Slider> =>
  apiClient
    .post<ApiResponse<Slider>>("/slider", data)
    .then((res) => res.data.data);

export const update = (id: string, data: FormData): Promise<Slider> =>
  apiClient
    .put<ApiResponse<Slider>>(`/slider/${id}`, data)
    .then((res) => res.data.data);

export const remove = (id: string): Promise<void> =>
  apiClient.delete(`/slider/${id}`).then(() => undefined);
