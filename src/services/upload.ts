import http from "./interseptor/http";

export const uploadContentImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await http.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};