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
  return response.data;
}


export const getCourseDetail=async (id:string)=>{
  const response = await http.get(`/course/${id}`);
  return response.data;
}

export const createCourseApi = async (data: any) => {

  const response = await http.post("/course", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const updateCourseApi = async ({
  id,
  data,
}: {
  id: string;
  data: FormData;
}) => {
  const response = await http.patch(`/course/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};


export const removeCourse = async (id: string) => {
  const res = await http.delete(`/course/${id}`);
  return res.data;
};

