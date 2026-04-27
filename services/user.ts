
import http from "./interseptor/http";

export const getUserProfile = async () => {
  const response = await http.get("/users/profile");

  return response;
};

export const getUsers = async () => {
  const res = await http.get("/users");
  return res.data;
};

export const deleteUser = async (id: string) => {
  const res = await http.delete(`/users/${id}`);
  return res.data;
};

export const BanUser = async (id: string) => {
    const res = await http.post(`users/ban/${id}`);
  return res.data;
};
export const RoleUser = async (id: string) => {
  const res = await http.put(`users/role/${id}`);
  return res.data;
};