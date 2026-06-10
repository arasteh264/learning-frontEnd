
import http from "./interseptor/http";
export const getAll = () => http.get("/slider").then((res) => res.data);
export const getById = (id: string) => http.get(`/slider/${id}`).then((res) => res.data);
export const create = (data: FormData) => http.post("/slider", data).then((res) => res.data);
export const update = (id: string, data: FormData) => http.put(`/slider/${id}`, data).then((res) => res.data);
export const remove = (id: string) => http.delete(`/slider/${id}`).then((res) => res.data);