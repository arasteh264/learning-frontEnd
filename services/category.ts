import http from "./interseptor/http";

export const getCategoryList = async () => {
  const response = await http.get("/category");
  return response;
};
