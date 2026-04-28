import http from "./interseptor/http";

export const getCategoryList = async () => {
  const response = await http.get("/category");
  return response;
};


export const addCategory = async (newCategory: { title: string; href: string }) => {
  const response = await http.post("/category",newCategory);
  return response;
};
