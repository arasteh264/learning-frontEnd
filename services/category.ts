import http from "./interseptor/http";

export const getCategoryList = async () => {
  const response = await http.get("/category");
  return response;
};


export const addCategory = async (newCategory: { title: string; href: string }) => {
  const response = await http.post("/category",newCategory);
  return response;
};

export const updateCategory = async (
  newCategory: { title: string; href: string },
  id: number
) => {
  const response = await http.put(`/category/${id}`, newCategory);
  return response;
};

export const removeCategory = async (
  id: number
) => {
  const response = await http.delete(`/category/${id}`);
  return response;
};