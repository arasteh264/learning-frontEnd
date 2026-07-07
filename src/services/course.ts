import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../types/globalType";
import apiClient from "./interseptor/http.client";
import serverApiClient from "./interseptor/http.server";

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
  price: number | string;
  rating: number;
  status: boolean;
  support: string;
  updated_at: string;
  views: number;
  creator?: string;
  category?: string;
};
export type EditCourseForm = Omit<
  Course,
  | "id"
  | "created_at"
  | "updated_at"
  | "enrolled_count"
  | "rating"
  | "views"
  | "cover"
  | "price"
  | "status"
  | "category_id"
  | "creator_id"
> & {
  cover: File | string | null;
  price: string | number;
  status: boolean;
  category: string;
  creator: string;
};
export type SessionChild = {
  id: string;
  title: string;
  duration: string;
  videoUrl?: string;
};

export type Session = {
  id: string;
  title: string;
  course_id: string;
  time: string;       
  free: boolean;       
  video?: string;    
  created_at: string; 
  updated_at: string;    
  courses?: {             
    id: string;
    name: string;
  };
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

export type CreateCourseForm = Omit<
  Course,
  | "id"
  | "created_at"
  | "updated_at"
  | "enrolled_count"
  | "rating"
  | "views"
  | "cover"
> & {
  cover: File | null;
  price: string;
  creator: string;
  category: string;
};

export type UpdateCoursePayload = {
  id: string;
  data: FormData;
};

export type UpdateSessionPayload = {
  id: string;
  data: FormData;
};

export type CreateSessionPayload = {
  id: string;
  data: FormData;
};

export type CommentPayload = {
  courseId: string;
  content: string;
};

export type CommentReplyPayload = {
  commentId: string;
  content: string;
};

export const getAllCourse = async (): Promise<Course[]> => {
  const response = await serverApiClient.get<ApiResponse<Course[]>>("/course");
  return response.data.data;
};

export const getCourseDetail = async (id: string): Promise<Course> => {
  const response = await apiClient.get<ApiResponse<Course>>(`/course/${id}`);
  return response.data.data;
};

export const getCourseById = async (courseId: string): Promise<Course> => {
  const { data } = await apiClient.get<ApiResponse<Course>>(`/course/${courseId}`);
  return data.data;
};

export const createCourseApi = async (data: FormData): Promise<Course> => {
  const response = await apiClient.post<ApiResponse<Course>>("/course", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.data;
};

export const updateCourseApi = async ({
  id,
  data,
}: UpdateCoursePayload): Promise<Course> => {
  const response = await apiClient.patch<ApiResponse<Course>>(
    `/course/${id}`,
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );
  return response.data.data;
};

export const removeCourse = async (id: string): Promise<void> => {
  await apiClient.delete(`/course/${id}`);
};

export const searchCourseApi = async (query: string): Promise<Course[]> => {
  const response = await apiClient.get<ApiResponse<Course[]>>("/course/search", {
    params: { q: query },
  });
  return response.data.data;
};

export const getLatestCourses = async (
  limit: number = 8,
): Promise<Course[]> => {
  const response = await apiClient.get<ApiResponse<Course[]>>("/course/latest", {
    params: { limit },
  });
  return response.data.data;
};

export const getPopularFreeCourses = async (
  limit: number = 8,
): Promise<Course[]> => {
  const response = await apiClient.get<ApiResponse<Course[]>>(
    "/course/free/popular",
    {
      params: { limit },
    },
  );
  return response.data.data;
};

export const getAllSession = async (): Promise<Session[]> => {
  const response = await apiClient.get<ApiResponse<Session[]>>("/session");
  return response.data.data;
};

export const getCourseSessions = async (
  courseId: string,
): Promise<Session[]> => {
  const { data } = await apiClient.get<ApiResponse<Session[]>>(
    `/session/courses/${courseId}`,
  );
  return data.data;
};

export const getSessionDetail = async (id: string): Promise<Session> => {
  const response = await apiClient.get<ApiResponse<Session>>(`/session/${id}`);
  return response.data.data;
};

export const createSessionApi = async ({
  id,
  data,
}: CreateSessionPayload): Promise<Session> => {
  const response = await apiClient.post<ApiResponse<Session>>(
    `/session/${id}`,
    data,
  );
  return response.data.data;
};

export const updateSessionApi = async ({
  id,
  data,
}: UpdateSessionPayload): Promise<Session> => {
  const response = await apiClient.put<ApiResponse<Session>>(
    `/course/session/${id}`,
    data,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return response.data.data;
};

export const removeSession = async (id: string): Promise<void> => {
  await apiClient.delete(`/course/session/${id}`);
};

export const getCourseComments = async (
  _courseId: string,
): Promise<CourseComment[]> => {
  return [];
};

export const postCourseComment = async (
  payload: CommentPayload,
): Promise<CourseComment> => {
  const { data } = await apiClient.post<ApiResponse<CourseComment>>(
    `/courses/${payload.courseId}/comments`,
    { content: payload.content },
  );
  return data.data;
};

export const postCommentReply = async (
  payload: CommentReplyPayload,
): Promise<CourseCommentReply> => {
  const { data } = await apiClient.post<ApiResponse<CourseCommentReply>>(
    `/comments/${payload.commentId}/reply`,
    { content: payload.content },
  );
  return data.data;
};

export const useSearchCourse = (query: string) => {
  return useQuery<Course[]>({
    queryKey: ["course-search", query],
    queryFn: () => searchCourseApi(query),
    enabled: query.trim().length >= 3,
    staleTime: 1000 * 30,
  });
};

export const useGetLatestCourses = (limit: number = 8) => {
  return useQuery<Course[]>({
    queryKey: ["course-latest", limit],
    queryFn: () => getLatestCourses(limit),
  });
};

export const usePopularFreeCourses = (limit: number = 8) => {
  return useQuery<Course[]>({
    queryKey: ["popular-free-courses", limit],
    queryFn: () => getPopularFreeCourses(limit),
    staleTime: 1000 * 60 * 5,
  });
};
