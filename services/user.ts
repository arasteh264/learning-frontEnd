import http from "./interseptor/http";

export const getUserProfile = async () => {
  const response = await http.get("/users/profile");

  return response;
};
