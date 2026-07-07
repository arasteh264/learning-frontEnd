import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../types/globalType";
import { Category } from "./category";
import apiClient from "./interseptor/http.client";
import serverApiClient from "./interseptor/http.server";

export type ArticleStatus = "draft" | "published" | "archived";

export type Article = {
  id: string;
  title: string;
  content: string;
  cover: string;
  slug: string;
  summary?: string;
  category_id?: string;
  author_id: string;
  categories?: { id: string; title: string };
  teachers?: { id: string; bio: string };
  status: ArticleStatus;
  created_at: string;
  updated_at: string;
};

export type CreateArticlePayload = Omit<
  Article,
  "id" | "created_at" | "updated_at" | "cover" | "categories" | "teachers" | "category_id" | "author_id"
> & { cover: File | null };

export type UpdateArticlePayload = { id: string; data: FormData };

export const getAllArticles = async (status?: ArticleStatus): Promise<Article[]> => {
  const response = await serverApiClient.get<ApiResponse<Article[]>>("/article", { params: { status } });
  return response.data.data;
};
export const getLatestArticles = async (
  limit: number = 8,
): Promise<Article[]> => {
  const response = await serverApiClient.get<ApiResponse<Article[]>>("/article/latest", {
    params: { limit },
  });
  return response.data.data;
};
export const getArticleById = async (id: string): Promise<Article> => {
  const response = await apiClient.get<ApiResponse<Article>>(`/article/${id}`);
  return response.data.data;
};

export const createArticleApi = async (data: FormData): Promise<Article> => {
  const response = await apiClient.post<ApiResponse<Article>>("/article", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.data;
};

export const updateArticleApi = async ({ id, data }: UpdateArticlePayload): Promise<Article> => {
  const response = await apiClient.put<ApiResponse<Article>>(`/article/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.data;
};

export const removeArticle = async (id: string): Promise<void> => {
  await apiClient.delete(`/article/${id}`);
};

export const getAllCategories = async (): Promise<Category[]> => {
  const response = await apiClient.get<ApiResponse<Category[]>>("/category");
  return response.data.data;
};

export const getArticlesByCategory = async (
  categoryId: string,
  page: number,
  limit: number,
): Promise<Article[]> => {
  const response = await apiClient.get<ApiResponse<Article[]>>("/article", {
    params: { category: categoryId, page, limit },
  });
  return response.data.data;
};

export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });
};

const ARTICLES_PAGE_SIZE = 9;

export const useArticlesByCategory = (categoryId: string, limit = ARTICLES_PAGE_SIZE) => {
  return useInfiniteQuery<Article[]>({
    queryKey: ["articles", categoryId],
    queryFn: ({ pageParam }) =>
      getArticlesByCategory(categoryId, pageParam as number, limit),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === limit ? allPages.length + 1 : undefined,
    enabled: !!categoryId,
  });
};