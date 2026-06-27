import { ApiResponse } from "../types/globalType";
import http from "./interseptor/http";

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
  const response = await http.get<ApiResponse<Article[]>>("/article", { params: { status } });
  return response.data.data;
};

export const getArticleById = async (id: string): Promise<Article> => {
  const response = await http.get<ApiResponse<Article>>(`/article/${id}`);
  return response.data.data;
};

export const createArticleApi = async (data: FormData): Promise<Article> => {
  const response = await http.post<ApiResponse<Article>>("/article", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.data;
};

export const updateArticleApi = async ({ id, data }: UpdateArticlePayload): Promise<Article> => {
  const response = await http.put<ApiResponse<Article>>(`/article/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.data;
};

export const removeArticle = async (id: string): Promise<void> => {
  await http.delete(`/article/${id}`);
};