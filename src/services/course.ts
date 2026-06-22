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
export const getAllCourse = async (data: any) => {
  const response = await http.get("/course");
  return response.data;
};

export const getAllSession = async (data: any) => {
  const response = await http.get("/session");
  return response.data;
};

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

export const getCourseDetail = async (id: string) => {
  const response = await http.get(`/course/${id}`);
  return response.data;
};

export const createSessionApi = async ({
  id,
  data,
}: {
  id: string;
  data: FormData;
}) => {
  const response = await http.post(`/session/${id}`, data, {
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

export const getSessionDetail = async (id: string) => {
  const response = await http.get(`/course/session/${id}`);

  return response.data;
};

export const updateSessionApi = async ({
  id,
  data,
}: {
  id: string;
  data: FormData;
}) => {
  const response = await http.put(`/course/session/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

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

export const getPopularFreeCourses = async (limit: number = 8) => {
  const response = await http.get("/course/free/popular", {
    params: { limit },
  });
  return response.data;
};

export const usePopularFreeCourses = (limit: number = 8) => {
  return useQuery({
    queryKey: ["popular-free-courses", limit],
    queryFn: () => getPopularFreeCourses(limit),
    staleTime: 1000 * 60 * 5,
  });
};



export type Course = {
  id: string;
  category_id: string;
  cover: string;
  created_at: string;
  creator_id: string;
  description: string;
  discount: number;
  enrolled_count: number;
  href: string;
  name: string;
  price: number;
  rating: number;
  status: string;
  support: string;
  updated_at: string;
  views: number;
};
 
export type SessionChild = {
  id: string;
  title: string;
  duration: string;
  videoUrl?: string;
};
 
export type Session = {
  id: string;
  course_id: string;
  title: string;
  duration: string;
  isFree: boolean;
  children: SessionChild[];
};
 
export type CourseUser = {
  name: string;
  role: string;
  avatar: string;
};
 
export type CourseCommentReply = {
  user: CourseUser;
  date: string;
  content: string;
};
 
export type CourseComment = {
  id: string;
  user: CourseUser;
  date: string;
  content: string;
  reply?: CourseCommentReply | null;
};
 
export type CourseBreadcrumbItem = {
  label: string;
  href?: string;
};

export async function getCourseById(courseId: string) {
  const { data } = await http.get<{ data: Course }>(
    `/course/${courseId}`
  );
  return data;
}
 
export async function getCourseSessions(courseId: string) {
  const { data } = await http.get<{ data: Session[] }>(
    `/session/courses/${courseId}`
  );
  return data;
}


export async function getCourseComments(courseId: string) {
  return { data: [] as CourseComment[] };
}
 
export async function postCourseComment(payload: {
  courseId: string;
  content: string;
}) {
  const { data } = await http.post(
    `/courses/${payload.courseId}/comments`,
    { content: payload.content }
  );
  return data;
}
 
export async function postCommentReply(payload: {
  commentId: string;
  content: string;
}) {
  const { data } = await http.post(
    `/comments/${payload.commentId}/reply`,
    { content: payload.content }
  );
  return data;
}