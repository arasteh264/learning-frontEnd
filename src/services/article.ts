import http from "./interseptor/http";

export const getAllArticles = async (status?: string) => {
  const response = await http.get("/article", { params: { status } });
  return response.data;
};

export const getArticleById = async (id: string) => {
  const response = await http.get(`/article/${id}`);
  return response.data;
};

export const createArticleApi = async (data: FormData) => {
  const response = await http.post("/article", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateArticleApi = async ({ id, data }: { id: string; data: FormData }) => {
  debugger
  const response = await http.put(`/article/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const removeArticle = async (id: string) => {
  const res = await http.delete(`/article/${id}`);
  return res.data;
};