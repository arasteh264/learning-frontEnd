import { useQuery } from "@tanstack/react-query";
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

export const getAllSession=async (data:any)=>{
  const response = await http.get("/course/session");
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



export const getCourseDetail=async (id:string)=>{
  const response = await http.get(`/course/${id}`);
  return response.data;
}


export const createSessionApi = async ({
  id,
  data,
}: {
  id: string;
  data: FormData;
}) => {
  const response = await http.post(`/course/${id}/session`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};


export const removeSession = async (id: string) => {
  const res = await http.delete(`/course/session/${id}`);
  return res.data;
};



export const getSessionDetail = async (
  id: string
) => {
  const response = await http.get(
    `/course/session/${id}`
  );

  return response.data;
};


export const updateSessionApi = async ({
  id,
  data,
}: {
  id: string;
  data: FormData;
}) => {
  const response = await http.put(
    `/course/session/${id}`,
    data,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};


export const searchCourseApi = async (query: string) => {
  const response = await http.get("/course/search", {
    params: { q: query },
  });
  return response.data;
};
export const useSearchCourse = (query: string) => {
  return useQuery({
    queryKey: ["course-search", query],
    queryFn: () => searchCourseApi(query),
    enabled: query.trim().length >= 3,
    staleTime: 1000 * 30,
  });
};



export const getLatestCourses = async (limit: number = 8) => {
  const response = await http.get("/course/latest", {
    params: { limit },
  });
  return response.data;
};
export const useGetLatestCourses = (limit: number = 8) => {
  return useQuery({
    queryKey: ["course-latest", limit],
    queryFn: () => getLatestCourses(limit),
  });
};
