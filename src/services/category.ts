import { useQuery } from "@tanstack/react-query";
import http from "./interseptor/http";
import { ApiResponse } from "../types/globalType";


export type Category = {
  id: number;
  title: string;
  href: string;
  created_at: string;
};

export type CategoryPayload = Omit<Category, "created_at">;



export const getCategoryList = async (): Promise<Category[]> => {
  const response = await http.get<ApiResponse<Category[]>>("/category");
  return response.data.data;
};


export const addCategory = async (
  newCategory: CategoryPayload
): Promise<Category> => {
  const response = await http.post<ApiResponse<Category>>(
    "/category",
    newCategory
  );
  return response.data.data;
};

export const updateCategory = async (
  id: number,
  newCategory: CategoryPayload  
): Promise<Category> => {
  const response = await http.put<ApiResponse<Category>>(
    `/category/${id}`,
    newCategory
  );
  return response.data.data;
};

export const removeCategory = async (id: number): Promise<void> => {
  await http.delete(`/category/${id}`);
};



export const useCategoryList = () => {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategoryList,
    staleTime: 1000 * 60 * 5,
  });
};