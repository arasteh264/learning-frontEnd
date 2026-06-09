import { useQuery } from "@tanstack/react-query";
import http from "./interseptor/http";

export const getAll = async () => {
  const res = await http.get("/announcement");
  return res.data;
};

export const getIsActive = async () => {
  const res = await http.get(`/announcement/active`);
  return res.data;
};

export const create = async (data: any) => {
  const res = await http.post("/announcement", data);
  return res.data;
};

export const update = async (id: string, data: any) => {
  const res = await http.put(`/announcement/${id}`, data);
  return res.data;
};

export const onChangeStatus = async (id: string) => {
  const res = await http.patch(`/announcement/${id}/status`);
  return res.data;
};

export const remove = async (id: string) => {
  const res = await http.delete(`/announcement/${id}`);
  return res.data;
};



export const useGetAnnouncement = () => {
  return useQuery({
    queryKey: ["announcement"],
    queryFn: () => getIsActive(),
  });
};
