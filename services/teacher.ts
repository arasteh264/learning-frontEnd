
import http from "./interseptor/http";

export const getTeacherList = async () => {
  const response = await http.get("/teacher");

  return response;
};


export const requestForTeacher = async (payload: any) => {
  const response = await http.post("/teacher/request", payload);
  return response.data;
};

export const verifyTeacher = async (id: string) => {
  const res = await http.post(`/teacher/verify/${id}`);
  return res.data;
};