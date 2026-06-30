import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../types/globalType";
import apiClient from "./interseptor/http.client";


export type Category = {
  id: number;
  title: string;
  href: string;
  image?: string | null; 
  count?: number;          
  created_at: string;
  updated_at?: string;     
};


export type CategoryPayload = Omit<Category, "id" | "created_at">



export const getCategoryList = async (): Promise<Category[]> => {
  const response = await apiClient.get<ApiResponse<Category[]>>("/category");
  return response.data.data;
};


export const addCategory = async (
  newCategory: CategoryPayload
): Promise<Category> => {
  const response = await apiClient.post<ApiResponse<Category>>(
    "/category",
    newCategory
  );
  return response.data.data;
};

export const updateCategory = async (
  id: number,
  newCategory: CategoryPayload  
): Promise<Category> => {
  const response = await apiClient.put<ApiResponse<Category>>(
    `/category/${id}`,
    newCategory
  );
  return response.data.data;
};

export const removeCategory = async (id: number): Promise<void> => {
  await apiClient.delete(`/category/${id}`);
};



export const useCategoryList = () => {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategoryList,
    staleTime: 1000 * 60 * 5,
  });
};