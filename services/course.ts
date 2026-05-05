import http from "./interseptor/http";
export type CreateCourseForm = {
  name: string;
  price: string;
  discount: number;
  description: string;
  support: string;
  href: string;
  status: boolean;
  category: string;
  creator: string;
  cover: any;
};
export const getAllCourse=async (data:any)=>{
  const response = await http.get("/course");
  return response;
}


export const createCourseApi = async (data: any) => {

  const response = await http.post("/course", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};