import { ApiResponse } from "../types/globalType";
import http from "./interseptor/http";


export type Slider = {
  id: string;
  title: string;
  image: string;
  link: string;
  isActive: boolean;
  order: number;
  created_at: string;
};

export type CreateSliderPayload = Omit<Slider, "id" | "created_at">;



export const getAll = (): Promise<Slider[]> =>
  http.get<ApiResponse<Slider[]>>("/slider").then((res) => res.data.data);

export const getById = (id: string): Promise<Slider> =>
  http.get<ApiResponse<Slider>>(`/slider/${id}`).then((res) => res.data.data);

export const create = (data: FormData): Promise<Slider> =>
  http.post<ApiResponse<Slider>>("/slider", data).then((res) => res.data.data);

export const update = (id: string, data: FormData): Promise<Slider> =>
  http.put<ApiResponse<Slider>>(`/slider/${id}`, data).then((res) => res.data.data);

export const remove = (id: string): Promise<void> =>
  http.delete(`/slider/${id}`).then(() => undefined);