
import http from "./interseptor/http";

export const getTeacherList = async () => {
  const response = await http.get("/teacher");

  return response;
};