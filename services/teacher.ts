
import http from "./interseptor/http";

export const getTeacherList = async () => {
  const response = await http.get("/teacher");

  return response;
};


export const requestForTeacher = async (id :number,paylod:any) => {
  const response = await http.post(`/teacher/request/${id}`);

  return response;
};
